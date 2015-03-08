var user = null;

var newsArray = [];

var store = {
    user: new UserModel(),
    root: null,
    parent: null,
    active: null,
    name: { 'order': 'Đặt hàng', 'news': 'Tin tức', 'promotion': 'Khuyến mại', 'cart': 'Giỏ hàng', 'document': 'Đào tạo', 'color': 'Color Zoom', 'salon': 'Salon' },
    data: { 'order': new NodeModel(), 'news': new NodeModel(), 'promotion': new NodeModel(), 'cart': new NodeModel(), 'document': new NodeModel(), 'color': new NodeModel(), 'salon': new NodeModel() },
    category: { 'order': [], 'news': [], 'promotion': [], 'cart': [], 'document': [], 'color': [], 'salon': [] },
    item: { 'order': [], 'news': [], 'promotion': [], 'cart':[], 'document': [], 'color': [], 'salon': [] },
    //category
    getCategory:function(callback){
        client.getCategory(function (data) {
            store.processCategoryData(data);
            callback();
            dateUtils.schedule();
        });
    },

    processCategoryData: function (data) {
        var tmp = [];
        //order category
        for (var i = 0; i < data.data.orderCategory.length; i++) {
            store.category.order[data.data.orderCategory[i].id] = new CategoryModel(data.data.orderCategory[i]);
            data.data.orderCategory[i].type = 0;
            tmp[data.data.orderCategory[i].id] = new NodeModel(data.data.orderCategory[i]);
        }
        store.findChild(0, tmp, store.data.order);

        //news category
        tmp = [];
        for (var i = 0; i < data.data.newsCategory.length; i++) {
            store.category.news[data.data.newsCategory[i].id] = new CategoryModel(data.data.newsCategory[i]);
            data.data.newsCategory[i].type = 0;
            tmp[data.data.newsCategory[i].id] = new NodeModel(data.data.newsCategory[i]);
        }
        store.findChild(0, tmp, store.data.news);

        //promotion category
        for (var i = 0; i < data.data.promotionCategory.length; i++) {
            store.category.promotion[data.data.promotionCategory[i].id] = new CategoryModel(data.data.promotionCategory[i]);
            data.data.promotionCategory[i].type = 0;
            tmp[data.data.promotionCategory[i].id] = new NodeModel(data.data.promotionCategory[i]);
            var node = new NodeModel({
                'id': data.data.promotionCategory[i].id,
                'parentId': 0,
                'type': 0
            })
            store.data.promotion.child.push(node);
        }
        store.getPromotion(data.data);

        //document
        tmp = [];
        for (var i = 0; i < data.data.documentCategory.length; i++) {
            store.category.document[data.data.documentCategory[i].id] = new CategoryModel(data.data.documentCategory[i]);
            data.data.documentCategory[i].type = 0;
            tmp[data.data.documentCategory[i].id] = new NodeModel(data.data.documentCategory[i]);
        }
        store.findChild(0, tmp, store.data.document);
        //color
        tmp = [];
        for (var i = 0; i < data.data.colorzoomCategory.length; i++) {
            store.category.color[data.data.colorzoomCategory[i].id] = new CategoryModel(data.data.colorzoomCategory[i]);
            data.data.colorzoomCategory[i].type = 0;
            tmp[data.data.colorzoomCategory[i].id] = new NodeModel(data.data.colorzoomCategory[i]);
        }
        store.findChild(0, tmp, store.data.color);
        
        //add root category node
        store.data.order = store.data.order.child[0];
        store.data.news = store.data.news.child[1];

        //store.category.order[0] = new CategoryModel({ 'id': '0', 'name': 'Đặt hàng', 'image': null, 'type': '0', 'parentId': '-1' });
        store.category.news[0] = new CategoryModel({ 'id': '0', 'name': 'Tin tức', 'image': null, 'type': '0', 'parentId': '-1' });
        store.category.news[2].name = 'Tin tức';
        store.category.order[1].name = 'Đặt hàng';
        store.data.order.parent = null;
        store.data.news.parent = null;
        //store.category.promotion[0] = new CategoryModel({ 'id': '0', 'name': 'Khuyến mại', 'image': null, 'type': '0', 'parentId': '-1' });
        store.category.document[0] = new CategoryModel({ 'id': '0', 'name': 'Đào tạo', 'image': null, 'type': '0', 'parentId': '-1' });
        store.category.color[0] = new CategoryModel({ 'id': '0', 'name': 'Color Zoom', 'image': null, 'type': '0', 'parentId': '-1' });
        store.category.promotion[0] = new CategoryModel({ 'id': '0', 'name': 'Khuyến mại', 'image': null, 'type': '0', 'parentId': '-1' });

        
    },
    //item
    getOrder: function (callback) {
        client.getItem('order', function (data) {
            store.processItemData('order', data.data);
            store.item.cart = store.item.order;
            callback();
        });
    },

    getNews: function (callback) {
        client.getItem('news', function (data) {
            store.processItemData('news', data.data);
            callback();
        });
    },

    getPromotion: function (data) {
        for (var i = 0; i < data.promotion.length; i++) {
            store.item.promotion[data.promotion[i].id] = new PromotionModel(data.promotion[i]);
            var node = new NodeModel({
                'id': data.promotion[i].id,
                'parentId': data.promotion[i].categoryId,
                'type': 1
            })
            node.type = 1;
            store.category.promotion[data.promotion[i].categoryId].child.push(node);
        }

        store.data.promotion.child[0].child = store.category.promotion[store.data.promotion.child[0].id].child;
        for (var n in store.data.promotion.child[0].child) {
            store.data.promotion.child[0].child[n].parent = store.data.promotion.child[0];
        }
        store.data.promotion.child[1].child = store.category.promotion[store.data.promotion.child[1].id].child;
        store.data.promotion.child[0].parent = store.data.promotion;
        store.data.promotion.child[1].parent = store.data.promotion;
        for (var n in store.data.promotion.child[1].child) {
            store.data.promotion.child[1].child[n].parent = store.data.promotion.child[0];
        }
        //promotion.kmcontent = store.correctLink(data.promotionCategory[0].content + '<img alt="" src="/' + data.promotionCategory[0].image + '"/>');
        //promotion.kmscontent = store.correctLink(data.promotionCategory[1].content + '<img alt="" src="/' + data.promotionCategory[1].image + '"/>');
        //promotion.init();
    },

    getDocument: function (callback) {
        client.getItem('document', function (data) {
            store.processItemData('document', data.data);
            callback();
        });
    },

    getColor: function (callback) {
        client.getItem('color', function (data) {
            var re = new RegExp('<img alt="" src="/', 'g');
            for (var i = 0; i < data.data.length; i++) {
                data.data[i].description = data.data[i].description.replace(re, '<img alt src="' + client.host + '/');
            }
            store.processItemData('color', data.data);
            callback();
        });
    },

    processItemData: function (type, data) {
        for (var i = 0; i < data.length; i++) {
            var t = new ItemModel(data[i]);
            store.item[type][data[i].id] = t;
            if (store.category[type][t.parentId] != null) {
                var node = new NodeModel(t);
                node.type = 1;
                store.category[type][t.parentId].child.push(node);
            }
        }
        store.appendItemChild(type, store.data[type]);
    },

    appendItemChild: function (type, ref) {
        for (var i = 0; i < store.category[type][ref.id].child.length; i++) {
            var node = store.category[type][ref.id].child[i];
            node.parent = ref;
            ref.appendChild(node);
        }
        for (var i = 0; i < ref.child.length; i++) {
            if (ref.child[i].type == 0) {
                store.appendItemChild(type, ref.child[i]);
            }
        }
    },

    findChild: function (id, source, des) {
        if (des == null) {
            des = new NodeModel();
        }
        for (var i in source) {
            if (source[i].parentId == id) {
                des.appendChild(source[i]);
                des.child[des.child.length - 1].parent = des;
                store.findChild(i, source, des.child[des.child.length - 1]);
            }
        }
    },

    updateNewsContent: function (data) {
        store.news[data.id].content = data.content;
    },

    readNews: function (id, callback) {
        client.getNews(id, function (data) {
            var re = new RegExp('<img alt="" src="/', 'g');
            var content = data.data.content.replace(re, '<img alt src="' + client.host + '/');
            store.item.news[data.data.id].content = content;
            callback();
        })
    },

    correctLink: function (data) {
        var re = new RegExp('<img alt="" src="/', 'g');
        return data.replace(re, '<img alt src="' + client.host + '/');;
    }
}