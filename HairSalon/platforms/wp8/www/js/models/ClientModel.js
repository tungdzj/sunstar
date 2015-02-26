var client = {
    //host: 'http://sunstar.local.vn/',
    host: 'http://sunstar.neonstudio.us/',
    request: function (func, data) {
        var r = this.host + "restapi/restapi.php/" + func;
        for (var p in data) {
            r += '&' + p + '=' + data[p];
        }
        return r;
    },

    sendRequest: function (func, params, callback, fail) {
        $.ajax({
            url: encodeURI(this.request(func, params)),
            dataType: 'jsonp',
            crossDomain: true,
            //async: false,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log(responseData);
                fail();
                //
            }
        });
        console.log(encodeURI(this.request(func, params)))
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
    }
}