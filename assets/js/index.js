$(function () {
    getUserInfo()
    $('#logout').on('click', function () {

        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    });



});

function getUserInfo() {
    //发起ajax请求,获取用户信息
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log('信息已发送');

            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            //获取用户信息成功
            //渲染用户的头像和欢迎文本的内容
            renderAvatar(res.data);
        }
    })
};

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        var font = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(font).show();
    }
}


//错误总结: 1 如果在base里面已经定义了url,那么发送ajax的时候的url只能写后面的接口
//2. 转大写是toUpperCase 注意C是大写
//3 记得带获取用户信息的函数