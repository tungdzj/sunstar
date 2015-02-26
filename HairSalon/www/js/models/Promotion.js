var promotion = {
    url: '',
    kmcontent: '',
    kmscontent: '',
    init: function () {
        if (this.kmscontent == '') {
            this.item[0].content = '<div class="message">Chương trình khuyến mại đã hết. Chúc các salon may mắn trong lần sau.</div>';
        } else {
            this.item[0].content = this.kmscontent + '<div class="btn" onclick="store.user.orderPromotion()">Đặt mua</div>';
        }
        
        this.item[1].content = this.kmcontent + '<div>Nội dung đơn hàng</div><textarea id="order_promotion_input"></textarea><div class="btn" onclick="store.user.orderTung()">Đặt mua</div>';
        
        store.data.promotion = promotion.data;
        store.item.promotion = promotion.item;
        store.category.promotion = promotion.category;
        store.data.promotion.child[0].parent = store.data.promotion;
        store.data.promotion.child[1].parent = store.data.promotion;
    },
    category: {
        1: new CategoryModel({
            'id': '1',
            'name': 'Khuyến mại',
            'child': [

            ],
            'parent': '0'
        })
    },

    item: {
        0: { 'id': '0', 'name': 'Chương trình ưu đãi đặc biệt', 'content': '', 'parentId': '1' },
        1: { 'id': '1', 'name': 'Chương trình ưu đãi', 'content': '', 'parentId': '1' },
    },

    data: {
        'id': '1', //ho so
        'child': [
            { 'id': '0', 'type': '1', 'parentId': '1' },
            { 'id': '1', 'type': '1', 'parentId': '1' },
        ],
        'parentId': '0',
        'type': '0'
    },
}