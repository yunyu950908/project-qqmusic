class Slider{
    constructor(options = {}){
        this.$el = options.el;
        this.slides = options.slides;
        this.render();
    }
    render(){
        this.$el.innerHTML = `<div class="qq-slider-wrapper">`;
        this.$wrap = this.$el.firstElementChild;
        this.$wrap.style.width = `${this.slides.length}*100%`;
        this.$wrap.innerHTML = this.slides.map(slide=>
            `<div class = "qq-slider-item">
                <a href=${slide.link}>
                    <img src=${slide.image} />
                </a>
            </div>`
        ).join("");
    }




}