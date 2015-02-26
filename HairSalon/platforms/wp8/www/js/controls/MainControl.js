$(document).ready(function () {
    //$(".menu li").each(function () {
    //    $(this).bind('click', function () {
    //        layout.menu.close();
    //        var index = $(this).attr('data-menu-index');
    //        mainControl.onMenuItemClick(Number(index));
    //    });
    //})

    //$("#home_content li").each(function () {
    //    $(this).bind('click', function () {
    //        layout.menu.close();
    //        var index = $(this).attr('data-menu-index');
    //        mainControl.onMenuItemClick(Number(index));
    //    });
    //})
});


var mainControl = {
    onBackClick: function () {
        if (store.parent.parentId != '-1') {
            store.parent = store.parent.parent;
        }
        mainView.Refresh()
    },
    onMenuItemClick: function (index) {
        layout.menu.close();
        switch (index) {
            case -1:
                store.root = 'home';
                $('.page_title').html("GOLDWELL");
                layout.InitLayout();
                mainView.Refresh();
                break;
            case 0:
                this.updateData('news');
                break;
            case 1:
                this.updateData('document');
                break;
            case 2:
                this.updateData('order');
                break;
            case 3:
                this.updateData('promotion');
                break;
            case 4:
                if (!store.user.isLogin) {
                    store.user.login();
                } else {
                    this.updateData('cart');
                }
                break;
            case 5:
                if (store.user.isLogin) {
                    store.user.logout();
                } else {
                    store.user.login();
                }
                break;
            case 6:
                this.updateData('color');
                break;
            case 7:
                this.updateData('salon');
                break;
        }
        layout.navScroll.removeAllSlides();
        layout.navScroll.appendSlide('<div onclick="mainControl.onNavClick(' + store.parent.id + ')">' + store.name[store.root] + '</div>')
        //$('.page_title').html();
    },
    updateData: function (root) {
        store.root = root;
        if (store.category[root].length == 0) {
            utils.ShowLoading();
            $('.event').bind('onCategoryLoad', function () {
                utils.HideLoading();
                mainControl.updateData(root)
            })
        }
        
        store.parent = store.data[root];
        mainView.Refresh()
    },
    onItemClick: function (id) {
        if (store.parent.child[id].type == 1) {
            switch (store.root) {
                case 'salon':
                case 'color':
                case 'promotion':
                    store.parent = store.parent.child[id];
                    mainControl.generatePath();
                    break;
                case 'order':
                    if (store.user.isLogin) {
                        store.user.order(store.parent.child[id].id);
                    } else {
                        store.user.login();
                    }
                    break;
                case 'cart':
                    utils.ShowPrompt('Sửa số lượng mua', 'Sửa số lượng', function (result) {
                        if (result.btn == 'ok') {
                            var n = Number(result.content);
                            if (n > 0) {
                                store.user.updateOrder(id, n);
                            } else {
                                store.user.removeOrder(id);
                            }
                            mainView.Refresh();
                        }
                    })
                    break;
                case 'document':
                    var item = store.item.document[store.parent.child[id].id];
                    if (item.content == null) {
                        utils.ShowMessage('Chưa có tài liệu', 'Thông báo', function () { })
                    } else {
                        utils.OpenLink(item.content)
                    }
                    break;
                case 'news':
                    store.parent = store.parent.child[id];
                    mainControl.generatePath();
                    mainView.Refresh();
                    if (store.item.news[store.parent.id].content == null) {
                        utils.ShowLoading();
                        store.readNews(store.parent.id, function () {
                            utils.HideLoading();
                            mainView.Refresh();
                        });
                    }
                    break;
                case 'promotion':
                    /*
                    if (store.user.isLogin) {
                        utils.ShowPrompt('Nhập số lượng', 'Đặt hàng', function (result) {
                            if (result.btn == 'ok') {
                                var n = Number(result.content);
                                store.user.orderPromotion(store.parent.child[id].id, n);
                            }
                        })
                    } else {
                        store.user.login();
                    }*/
                    break;
            }
            mainView.Refresh();
        } else {
            if (store.parent.child[id].child.length == 0) {
                if (store.root == 'promotion') {
                    utils.ShowMessage('Chương trình khuyến mại đã hết.\nChúc các Salon may mắn trong các chương trình sau.', 'Thông báo', function () { });
                } else {
                    utils.ShowMessage('Không có bài nào trong mục này!', 'Thông báo', function () { });
                }
            } else {
                store.parent = store.parent.child[id];
                this.generatePath()
                mainView.Refresh();
            }
        }
    },
    onNavClick: function (id) {
        var i = store.parent.parent;
        while (i.id != id) {
            i = i.parent;
        }
        store.parent = i;
        this.generatePath();
        mainView.Refresh();
    },

    generatePath: function () {
        layout.navScroll.removeAllSlides();
        var i = store.parent;
        var str = '';
        var first = 1;
        if (store.root == 'document' || store.root == 'color') {
            while (i.parentId != -1) {
                if (first == 1) {
                    first = 0;
                    if (i.type == '0') {
                        layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
                    } else {
                        layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.item[store.root][i.id].name + '</div>');
                    }
                } else {
                    layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
                }
                i = i.parent;
            }
        } else {
            while (i.parentId != 0) {
                if (first == 1) {
                    first = 0;
                    if (i.type == '0') {
                        layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
                    } else {
                        layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.item[store.root][i.id].name + '</div>');
                    }
                } else {
                    layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
                }
                i = i.parent;
            }
        }
        
        layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + store.data[store.root].id + ')">' + store.name[store.root] + '</div>');
        return str;
    },

    onCheckoutClick: function () {
        utils.ShowConfirm('Đặt mua tất cả hàng trong giỏ?', 'Xác nhận', function (result) {
            if (result.btn == 'ok') {
                store.user.sendOrder();
                mainView.Refresh();
            }
        })
        
    },
    onDeleteAllClick: function () {
        utils.ShowConfirm('Xóa tất cả hàng trong giỏ?', 'Xác nhận', function (result) {
            if (result.btn == 'ok') {
                store.user.removeAllOrder();
                mainView.Refresh();
            }
        })
        
    }
}