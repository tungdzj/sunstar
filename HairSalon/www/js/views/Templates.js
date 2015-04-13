var templates = {
    data: {
        'listitem': '<li data-id="{id}" data-type="{type}" onclick="mainControl.onItemClick({id})"><p>{content}</p><img src="img/icon/{icon}.png"/></li>',

        //'cartitem': '<li data-id="{id}" data-type="{type}" class="cart_item"onclick="mainControl.onItemClick({id})"><p>{content}</p><img src="img/icon/{icon}.png"/><div>{quantity}</div></li>',
        'cartitem': '<li data-id="{id}" data-type="{type}" class="cart_item" onclick="mainControl.onItemClick({id})"><p>{content}</p><img src="img/icon/{icon}.png"/><div>{quantity}</div></li>',

        'messageBox': '<div data-role="header" data-theme="a"><h1>{title}</h1></div><div data-role="main" class="ui-content"><h2>{content}</h2><a href="#" class="ui-btn" data-rel="back">Ok</a></div>',
        'promotions': /*'<img src="' + client.host +*/ '{content}"/><div>Nội dung đơn hàng</div><textarea id="order_promotion_input"></textarea><div class="btn" onclick="store.user.orderTung()">Đặt mua</div>',
        'promotion': '<li class="promotion-li"><img class="promotion-image" src="' + client.host + '{image}"/><div class="grid-a"><div class="block-a promotion-timer" id="promotion-timer-{timerid}"></div><div class="block-b"><div class="btn hidden" id="promotion-btn-{timerid}" onclick="mainControl.onItemClick({id})">Đặt mua</div></div></div></li>'
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