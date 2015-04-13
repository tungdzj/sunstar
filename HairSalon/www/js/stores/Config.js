var config = {
    data:
        {
            'remember_password': '0',
            'username': '',
            'password':''
        },
    update: function () {
        this.data.remember_password = checkbox.getValue('remember_password');
        if (this.data.remember_password == '1') {
            this.data.username = $('#login_page #username').val();
            this.data.password = $('#login_page #password').val();
        }
        
        window.localStorage.setItem('config', JSON.stringify(this.data));
    },

    load: function () {
        config.data = JSON.parse(window.localStorage.getItem('config'));
        checkbox.bind('remember_password', function (check) {
            config.update();
        })
        if (config.data == null) {
            config.data = {
                'remember_password': '0',
                'username': '',
                'password': ''
            };
        }
        if (config.data.remember_password == '1') {
            $('#login_page #username').val(this.data.username);
            $('#login_page #password').val(this.data.password);
            store.user.checkLogin(this.data.username, this.data.password);
        }
        checkbox.setValue('remember_password', config.data.remember_password);
        config.registerPush();
    },

    logout: function () {
        checkbox.setValue('remember_password', 0);
        $('#login_page #username').val('');
        $('#login_page #password').val('');
        this.update();
    },

    registerPush: function () {
        
    }
}