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

function rateEventHandle() {
    $(".rate-slider").each(function () {
        $(this).on('input', function () {
            var id = $(this).attr('id');
            var label = '#label-for-' + id;
            $(label).html($(this).val());
        });
    });
}

var mainControl = {
    orderPromotion: function(id){

    },
    onBackClick: function () {
        switch (store.root) {
            case 'news':
            case 'order':
            case 'color':
            case 'promotion':
            case 'document':
            case 'salon':
                if (store.parent.parent != null) {
                    store.parent = store.parent.parent;
                    $('.navbar p').html(store.category[store.root][store.parent.id].name);
                }
                break;
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
                this.updateData('order');
                break;
                
            case 2:
                this.updateData('color');
                break;
            case 3:
                this.updateData('document');
                break;
                
            case 4:
                this.updateData('promotion');
                break;
                
            case 5:
                this.updateData('salon');
                break;
            case 6:
                if (store.user.isLogin) {
                    store.user.logout();
                } else {
                    store.user.login();
                }
                break;
            case 7:
                if (!store.user.isLogin) {
                    store.user.login();
                } else {
                    this.updateData('cart');
                }
                break;
        }
        $('.navbar p').html(store.name[store.root]);
        //layout.navScroll.removeAllSlides();
        //layout.navScroll.appendSlide('<div onclick="mainControl.onNavClick(' + store.parent.id + ')">' + store.name[store.root] + '</div>')
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
        if (store.parent.child[id].type == 1 || store.parent.child[id].type == '1') {
            switch (store.root) {
                case 'salon':
                case 'color':
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
                        //utils.OpenLink(item.content)
                        store.parent = store.parent.child[id];
                        mainControl.generatePath();
                    }
                    break;
                case 'news':
                    store.parent = store.parent.child[id];
                    mainControl.generatePath();
                    $('#news_content').html('Đang tải dữ liệu');
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
                    utils.ShowPrompt('Nhập số lượng', 'Đặt hàng khuyến mại', function (result) {
                        if (result.btn == 'ok') {
                            var n = Number(result.content);
                            store.user.orderPromotion(store.parent.child[id].id, n);
                        }
                    })
                    break;
            }
            mainView.Refresh();
        } else {
            if (store.parent.child[id].child.length == 0) {
                
                //if (store.root == 'promotion') {
                //    utils.ShowMessage('Chương trình khuyến mại đã hết.\nChúc các Salon may mắn trong các chương trình sau.', 'Thông báo', function () { });
                //} else {
                //    utils.ShowMessage('Không có bài nào trong mục này!', 'Thông báo', function () { });
                //}
                if (store.root == 'promotion') {
                    store.parent = store.parent.child[id];
                    this.generatePath()
                    mainView.Refresh();
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
        //layout.navScroll.removeAllSlides();
        var i = store.parent;
        var str = '';
        var first = 1;
        if (store.parent.type == '0') {
            $('.navbar p').html(store.category[store.root][store.parent.id].name);
        } else {
            $('.navbar p').html(store.item[store.root][store.parent.id].name);
        }
        //if (store.root == 'document' || store.root == 'color') {
        //    while (i.parentId != -1) {
        //        if (first == 1) {
        //            first = 0;
        //            if (i.type == '0') {
        //                layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
        //            } else {
        //                layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.item[store.root][i.id].name + '</div>');
        //            }
        //        } else {
        //            layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
        //        }
        //        i = i.parent;
        //    }
        //} else {
        //    while (i.parentId != 0) {
        //        if (first == 1) {
        //            first = 0;
        //            if (i.type == '0') {
        //                layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
        //            } else {
        //                layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.item[store.root][i.id].name + '</div>');
        //            }
        //        } else {
        //            layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + i.id + ')">' + store.category[store.root][i.id].name + '</div>');
        //        }
        //        i = i.parent;
        //    }
        //}
        
        //layout.navScroll.prependSlide('<div onclick="mainControl.onNavClick(' + store.data[store.root].id + ')">' + store.name[store.root] + '</div>');
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