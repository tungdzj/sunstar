var client = {
    //host: 'http://sunstar.neonstudio.us/',
    host: 'http://sunstar.vn/',
    request: function (func, data) {
        var r = this.host + "restapi/restapi.php/" + func;
        for (var p in data) {
            r += '&' + p + '=' + data[p];
        }
        return r;
    },

    sendRequest: function (func, params, callback, fail) {
        console.log(encodeURI(this.request(func, params)));
        $.ajax({
            url: encodeURI(this.request(func, params)),
            dataType: 'jsonp',
            crossDomain: true,
            //async: false,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                utils.ShowMessage('Lỗi kết nối.')
                fail();
                //
            }
        });
    },

    login: function (callback) {
        this.sendRequest('login',
            {
                'username': store.user.data.username,
                'password': store.user.data.password
            }, callback);
    },

    getCategory:function(callback){
        this.sendRequest('getCategory', {}, callback);
    },
    getItem: function (type, callback) {
        var func = '';
        switch (type) {
            case 'order': func = 'getOrder'; break;
            case 'news': func = 'getNews'; break;
            case 'promotion': func = 'getKM'; break;
            case 'document': func = 'getDocument'; break;
            case 'color': func = 'getColorZoom'; break;
        }
        this.sendRequest(func, {}, callback);
    },
    getNews: function (id, callback) {
        this.sendRequest('getNewsById', { 'id': id }, callback);
    },

    getPromotion: function(callback){
        this.sendRequest('getPromotion',
            {
                'username': store.user.data.username,
                'password': store.user.data.password
            }, callback);
    },

    sendOrder: function (json, callback) {
        this.sendRequest('order',
            {
                'username': store.user.data.username,
                'password': store.user.data.password,
                'json': json
            }, callback);
    },

    orderPromotion: function (id, quantity, callback) {
        this.sendRequest('orderPromotion',
            {
                'username': store.user.data.username,
                'password': store.user.data.password,
                'promotionId': id,
                'quantity': quantity
            }, callback);
    },

    changePassword: function(json, callback){
        this.sendRequest('changePassword', json, callback);
    },

    comment: function (data, callback) {
        this.sendRequest('addComment', {
            'username': store.user.data.username,
            'password': store.user.data.password,
            'typeID': data.typeID,
            'content': data.content
        }, callback);
    },

    orderTung: function (content, callback) {
        this.sendRequest('orderTung', {
            'username': store.user.data.username,
            'password': store.user.data.password,
            'content': content
        }, callback);
    },

    rate: function (content, callback) {
        this.sendRequest('addRate', {
            'username': store.user.data.username,
            'password': store.user.data.password,
            'rate1': content.rate1,
            'rate2': content.rate2,
            'rate3': content.rate3,
            'rate4': content.rate4,
            'rate5': content.rate5,
        }, callback);
    },

    register: function (type, regid, callback) {
		if (device.platform == 'android' || device.platform == 'Android'){
			type = 'AND'
		}else{
			type = 'IOS';
		}
        this.sendRequest('RegisterDevice', {
            'deviceType': type,
            'regId': regid,
            'username': store.user.data.username,
            'password': store.user.data.password,
            'uuid': app.uuid
        })
    }
}