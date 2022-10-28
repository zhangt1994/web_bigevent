// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 统一为有权限的接口设置headers请求
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // responseJSON时服务器返回的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message == "身份认证失败！") {
            // 清空本地存储
            localStorage.removeItem("token");
            // 强制跳转登录页面
            location.href = "/login.html";
        }
    }


})