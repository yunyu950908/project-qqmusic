function lazyload(images) {
    let imgs = Array.from(images);

    // 优先让浏览器尝试新的 IntersectionObserver 
    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver(function (entries) {
            // console.log(entries)
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    loadImage(entry.target, () => {
                        observer.unobserve(entry.target)
                    })
                }
            })
        }, { threshold: 0.01 });
        imgs.forEach(img => observer.observe(img))
    } else {
        let onscroll = throttle(function () {
            // console.log(new Date())
            if (imgs.length === 0) {
                return window.removeEventListener("scroll", onscroll)
            }
            imgs = imgs.filter(img => img.classList.contains("lazyload"))
            imgs.forEach(img => {
                if (inViewport(img)) {
                    loadImage(img)
                }
            });
        }, 500)

        window.addEventListener("scroll", onscroll);
        window.dispatchEvent(new Event("scroll"))

    }

    // 简易版的节流函数
    function throttle(func, wait) {
        let prev, timer;
        return function fn() {
            let curr = Date.now();
            let diff = curr - prev;
            if (!prev || diff >= wait) {
                func();
                prev = curr;
            } else if (diff < wait) {
                clearTimeout(timer);
                timer = setTimeout(fn, wait - diff);
            }
        }
    }

    // 判断是否出现在视口
    function inViewport(img) {
        // getBoundingClientRect() // 获取元素相对视口距离
        let { top, right, bottom, left } = img.getBoundingClientRect();
        let vpWidth = document.documentElement.clientWidth;
        let vpHeight = document.documentElement.clientHeight;
        return (
            (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) && (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }

    // 加载图片
    function loadImage(img, callback) {
        let image = new Image();
        image.src = img.dataset.src;
        image.onload = function () {
            img.src = image.src;
            img.classList.remove("lazyload");
            if (typeof callback === "function") callback();
        }
    }
}