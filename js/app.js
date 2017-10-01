(function () {

    fetch("/json/rec.json")
        .then(res => res.json())
        .then(render)


    function render(json) {
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
    }


    // 渲染 slider
    function renderSlider(slides) {
        slides = slides.map(slide => ({ link: slide.linkUrl, image: slide.picUrl }));
        new Slider({
            el: document.querySelector("#slider"),
            slides
        })
    }

    // 渲染电台
    function renderRadios(radios) {
        document.querySelector(".radios .list").innerHTML = radios.map(radio =>
           `<li class="list-item">
                <div class="item-media">
                    <img src="${radio.picUrl}" alt="">
                    <i class="icon-play icon"></i>
                </div>
                <div class="item-info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </li>`).join("");
    }


})()