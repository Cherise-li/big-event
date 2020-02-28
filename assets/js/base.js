$.ajaxPrefilter(function (option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url;

    //在这里统一为那些有权限的接口,添加headers请求头
    //有权限的接口,url路径中会包含/my/这样的字符串
    if (option.url.indexOf('/my/') !== -1) {
        //统一为有权限的接口设置authorization请求头
        option.headers = {
            Authorization: localStorage.getItem('token')
        };

        //统一为有权限的接口,设置complete回调函数
        option.complete = function (res) {
            //使用res.responseJSON获取到服务器的响应内容
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
                //用户没有登录,就来访问页面
                //1 清空token
                localStorage.removeItem('token');
                //2 强制用户跳转到登录界面
                location.href = '/login.html'
            }
        }
    }
})