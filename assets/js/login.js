$(function () {
    $('#log').on('click', function () {
        $('.regform').hide();
        $('.logform').show();
    });

    $('#reg').on('click', function () {

        $('.regform').show();
        $('.logform').hide();
    });

    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        psd: function (value) {
            var val = $('.regform [name = password]').val();
            if (value !== val) {
                return '两次密码输入有误'
            }
        }
    });

    $('.regform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $('.regform').serialize(),
            success: function (res) {
                console.log('请求发送成功');

                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功,去登录');
                $('#log').click();

            }

        })

    })
    $('.logform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败!')
                }
                layui.layer.msg(res.message)
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

})