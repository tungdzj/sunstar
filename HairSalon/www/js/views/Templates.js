var templates = {
    data: {
        'listitem': '<li data-id="{id}" data-type="{type}" onclick="mainControl.onItemClick({id})"><p>{content}</p><img src="img/icon/{icon}.png"/></li>',

        //'cartitem': '<li data-id="{id}" data-type="{type}" class="cart_item"onclick="mainControl.onItemClick({id})"><p>{content}</p><img src="img/icon/{icon}.png"/><div>{quantity}</div></li>',
        'cartitem': '<li data-id="{id}" data-type="{type}" class="cart_item" onclick="mainControl.onItemClick({id})"><p>{content}</p><img src="img/icon/{icon}.png"/><div>{quantity}</div></li>',

        'messageBox':'<div data-role="header" data-theme="a"><h1>{title}</h1></div><div data-role="main" class="ui-content"><h2>{content}</h2><a href="#" class="ui-btn" data-rel="back">Ok</a></div>'
    },
    gen: function (type, params) {
        var r = this.data[type];
        for (var i in params) {
            var re = new RegExp('{' + i + '}', 'g');
            r = r.replace(re, params[i]);
        }
        return r;
    }
}