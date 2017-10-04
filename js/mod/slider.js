class Slider {
    constructor(options = {}) {
        this.$el = options.el;
        this.slides = options.slides;
        this.originLen = this.slides.length;
        this.interval = options.interval || 5000;
        this.index = 1;
        this.dotIndex = 0;
        this.init();
    }

    init() {
        this.bindSwap = this.swap.bind(this)
        this.clone();
        this.render();
        this.setDots();
        this.start();
    }

    // 渲染轮播结构
    render() {
        this.$wrap = document.createElement("div");
        this.$wrap.classList.add("qq-slider-wrapper");
        this.$wrap.style.transitionDuration = ".5s";
        this.$wrap.style.width = `${this.slides.length * 100}%`;
        this.$wrap.style.left = "-100%";
        this.$wrap.innerHTML = this.slides.map(slide =>
            `<div class = "qq-slider-item">
                <a href=${slide.link}>
                    <img src=${slide.image} />
                </a>
            </div>`
        ).join("");

        this.$dots = document.createElement("p")
        this.$dots.classList.add("qq-slider-dots")
        for (let i = 0; i < this.originLen; i++) {
            this.$dots.innerHTML += `<b></b>`
        }

        const frag = document.createDocumentFragment();

        frag.appendChild(this.$wrap);
        frag.appendChild(this.$dots);
        this.$el.appendChild(frag);
    }

    // 开始自动轮播
    start() {
        setInterval(() => {
            this.next();
            this.setDots();
        }, this.interval)
    }

    // 克隆首尾备份
    clone() {
        let firstPrev = Utils.jsonClone(this.slides[0]);
        let lastNext = Utils.jsonClone(this.slides[this.slides.length - 1]);
        this.slides.unshift(lastNext);
        this.slides.push(firstPrev);
    }

    // 切换轮播边界
     swap(){
        clearTimeout(this.swapTimer)
        this.$wrap.style.transitionDuration = "0s";
        this.$wrap.style.transform = "translate(0%)";
        this.swapTimer = setTimeout(() => {
            this.rmEvt()
            this.$wrap.style.transitionDuration = ".5s";
        }, this.interval / 2)
    }

    // 绑定动画完成事件
    addEvt() {
        this.$wrap.addEventListener("transitionend", this.bindSwap)
        this.$wrap.addEventListener("webkitTransitionEnd", this.bindSwap)
    }

    // 清除动画完成事件
    rmEvt() {
        this.$wrap.removeEventListener("transitionend", this.bindSwap)
        this.$wrap.removeEventListener("webkitTransitionEnd", this.bindSwap)
    }

    // 轮播下一张
    next() {
        // next
        this.$wrap.style.transform = `translate(-${this.index * 100 / (this.originLen + 2)}%)`;
        this.index += 1;

        // 判断轮播边界
        if (this.index === (this.originLen + 1)) {
            this.addEvt();
            this.index = 1;
        }
    }

    // 设置小圆点
    setDots() {
        if (!this.$dots.children) return;
        const dots = this.$dots.children;
        Array.prototype.slice.call(dots).forEach(e => {
            e.classList.remove("dot-state-active");
            dots[this.dotIndex % this.originLen].classList.add("dot-state-active");
        });
        this.dotIndex++;
    }
    
}