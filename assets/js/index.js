$(function() {
        getUserInfo();
        // 绑定退出按钮的事件
        $("#btnlogout").on("click", function() {
            var layer = layui.layer;
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //清空本地存储的token
                localStorage.removeItem('token');
                location.href = "/login.html";
                layer.close(index);
            });

        })
    })
    // 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户图像失败");
            }
            // 渲染用户图像
            renderAvatar(res.data);
        },
    })
}
// 渲染用户图像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //  按需渲染用户图像
    if (user.user_pic !== null) {
        // 渲染图片图像
        $(".layui-nav-img").atrr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本图像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first);
    }
}