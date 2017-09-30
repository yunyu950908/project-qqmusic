(function(){
    let slider = new Slider({
        el:document.querySelector("#slider"),
        slides:[
            { link: "s1", image: "img/slider1.jpg" },
            { link: "s2", image: "img/slider2.jpg" },
            { link: "s3", image: "img/slider3.jpg" },
            { link: "s4", image: "img/slider4.jpg" },
            { link: "s5", image: "img/slider5.jpg" },
        ]
    });
    
    window.slider = slider;



})()