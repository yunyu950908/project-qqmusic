(function () {

    // 首页请求
    // fetch("/json/rec.json")
    fetch("http://localhost:4000/")
        .then(res => res.json())
        .then(render)

    // 排行榜请求
    // fetch("/json/rank.json")
    fetch("http://localhost:4000/rank")
        .then(res => res.json())
        .then(json => json.data.topList)
        .then(renderRankList)

    // 热门搜索
    fetch("../json/hot.json")
        .then(res => res.json())
        .then(json => json.data)
        .then(renderHotList)

    function render(json) {
        renderSlider(json.data.slider)
        renderRadios(json.data.radioList)
        renderPlaylists(json.data.songList)
        lazyload(document.querySelectorAll(".lazyload"))
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
                    <img class="lazyload" data-src="${radio.picUrl}" alt="">
                    <i class="icon-play icon"></i>
                </div>
                <div class="item-info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </li>`).join("");
    }

    // 热门歌单
    function renderPlaylists(playlists) {
        document.querySelector(".songlist .list").innerHTML = playlists.map(list =>
            `<li class="list-item">
                <div class="item-media">
                    <img class="lazyload" data-src="${list.picUrl}" alt="">
                    <i class="icon-play icon"></i>
                </div>
                <div class="item-info">
                    <h3>${list.songListDesc}</h3>
                </div>
            </li>`).join("");
    }

    // 排行榜
    function renderRankList(list) {
        // console.log(list)
        document.querySelector(".rank-view ul").innerHTML = list.map((item) =>
            `
            <li class="rank-item">
                <a href="javascript:;" class="rank-cover">
                    <img data-src="${item.picUrl}" class="lazyload">
                    <span class="listen-count">
                        <i class="listen-icon"></i>
                        ${listenCount(item.listenCount)}万
                    </span>
                </a>
                <div class="rank-info">
                    <div class="rank-content">
                        <h3 class="rank-title">${item.topTitle}</h3>
                        ${songlist(item.songList)}
                    </div>
                    <i class="arrow-icon"></i> 
                </div>
            </li>
            `).join("");

        lazyload(document.querySelectorAll(".rank-view .lazyload"))

        // 辅助函数 播放量
        function listenCount(listenCount) {
            listenCount = listenCount.toString().split("");
            listenCount.splice(-3);
            listenCount.splice(-1, 0, ".");
            listenCount = listenCount.join("");
            return listenCount;
        }

        // 辅助函数 循环歌单前三
        function songlist(songs) {
            return songs.map((song, i) =>
                `
                <p>
                    ${i + 1}
                    <span class="text-name">${song.songname}</span>
                    - ${song.singername}
                </p>
                `).join("");
        }
    }

    // 热门搜索
    function renderHotList(list) {
        let hotTags = [];
        let html = `<a href="${list.special_url}" class="hot-tag special">${list.special_key}</a>`;
        for(let i = 0; i < 6; i++){
            hotTags.push(list.hotkey[getRandom(30)])
        }
        html += hotTags.map(tag => `
            <a href="javascript:;" class="hot-tag">${tag.k}</a>
        `).join("");
        document.querySelector(".search-hot .hot-lists").innerHTML = html;

        function getRandom(num) {
            return Math.round(Math.random() * num)
        }
    }

})()