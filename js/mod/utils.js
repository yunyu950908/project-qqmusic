const Utils = (function () {
    function jsonClone(options) {
        if (!window.JSON) {
            console.log("当前环境不存在 JSON 对象");
            return;
        }
        return JSON.parse(JSON.stringify(options))
    }


    return {
        jsonClone:jsonClone,
    }
})()