$(function () {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pass: [
            /^[\S]{2,5}$/
            , '用户名必须2到5位，且不能出现空格'
        ],
    });

    getInfo();
    function getInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                form.val("formTest", res.data);
            }
        })


    }

    $('#reset').on('click', function (e) {
        e.preventDefault();
        getInfo();
    });

    $('#userform').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return '修改用户信息失败!'
                }
                layer.msg('修改用户信息成功!');
                window.parent.getUserInfo()
            }
        })
    })





})