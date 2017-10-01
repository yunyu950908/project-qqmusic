document.addEventListener("click", function (evt) {

    // 目标 tag
    let target = evt.target;
    if (target.dataset.role !== "tab") return;

    // 控制样式
    [].forEach.call(target.parentElement.children,tab=>{
        tab.classList.remove("item-state-active")
    })
    target.classList.add("item-state-active")

    // 控制显示
    let content = document.querySelector(target.dataset.view)
    if (content) {
        [].forEach.call(content.parentElement.children, child => {
            child.style.display = "none";
        })
        content.style.display = "block";
    }
})