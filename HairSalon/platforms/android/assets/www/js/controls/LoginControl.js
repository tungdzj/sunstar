$('.login_panel .btn-login').on('click', function () {
    var username = $('.login_panel #username').val();
    var password = $('.login_panel #password').val();
    if (username != '' && password != ''){
        store.user.checkLogin(username, password);
    }else{
        utils.ShowMessage('Tên đăng nhập và mật khẩu không hợp lệ!')
    }
})