class Search {
    constructor() {
        this.$el = el;
        this.$input = this.$el.querySelector("#search");
        this.$input.addEventListener("keyup", this.onKeyUp.bind(this));
        this.$songs = this.$el.querySelector(".song-list");
        this.keyword = "";
        this.page = 1;
        this.songs = [];
        this.perpage = 20;
        this.nomore = false; // 加载完毕
        this.fetching = false; // 请求标记
        this.onscroll = this.onscroll.bind(this);
        window.addEventListener("scroll", this.onscroll);
    }

    onscroll() {
        if (this.nomore) return;
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1);
        }

    }

    onKeyUp(event) {
        let keyword = event.target.value.trim();
        if (!keyword) return this.reset();
        if (event.key !== "Enter") return;
        this.search(keyword);
    }

    reset() {
        this.page = 1;
        this.keyword = "";
        this.songs = [];
        this.$songs.innerHTML = "";
    }

    search(keyword, page) {
        if (this.fetching) return;
        this.keyword = keyword;
        this.fetching = true;
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page || this.page}`)
            .then(res => res.json)
            .then(json => {
                this.page = json.data.song.curpage;
                this.nomore = (json.message === "no results");
                this.songs.push(...json.data.song.list);
                return json.data.song.list;
            })
            .then(songs => this.append(songs))
            .then(() => this.fetching = false)
            .catch(() => this.fetching = false)
    }

    append(songs) {
        let html = songs.map(song => `
        <li class="song-item">
            <i class="icon icon-music"></i>
            <div class="song-name">${song.songname}</div>
            <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(" ")}</div>
        </li>
        `).join("");
        this.$songs.insertAdjacentHTML("beforeend", html)
    }
}