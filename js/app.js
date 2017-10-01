(function(){
    let slider = new Slider({
        el:document.querySelector("#slider"),
        slides:[
            { link: "#", image: "img/slider1.jpg" },
            { link: "#", image: "img/slider2.jpg" },
            { link: "#", image: "img/slider3.jpg" },
            { link: "#", image: "img/slider4.jpg" },
            { link: "#", image: "img/slider5.jpg" },
        ]
    });
    
    window.slider = slider;



})()