var mainView = {
    currentPage: 'category',
    pageTitle: 'Tin tức',
    promotions: 0,
    Refresh: function () {
        layout.InitLayout();
        switch (store.root) {
            case 'news':
            case 'document':
            case 'color':
                if (store.parent.type == '0') {
                    var child = store.parent.child;
                    for (var c in child) {
                        
                        if (child[c].type == 0) {
                            if (store.category[store.root][child[c].id] == null ||
                            store.category[store.root][child[c].id].name == '') {
                                continue;
                            }
                            $("#category_content .listview").append(
                            templates.gen('listitem', {
                                'type': 0,
                                'url': '',
                                'content': store.category[store.root][child[c].id].name,
                                'id': c,
                                'icon': 'carat-r'
                            }));
                        } else {
                            if (store.item[store.root][child[c].id] != null ||
                                store.item[store.root][child[c].id].name == '') {
                                $("#category_content .listview").append(
                            templates.gen('listitem', {
                                'type': 1,
                                'url': '',
                                'content': store.item[store.root][child[c].id].name,
                                'id': c,
                                'icon': 'doc'
                            }));
                            }
                        }
                    }
                } else {
                    switch (store.root) {
                        case 'news':
                        case 'color':
                        
                            $('#news_content').html(store.item[store.root][store.parent.id].content);
                            break;
                        case 'document':
                            $('#news_content').html(store.item[store.root][store.parent.id].document);
                            break;
                    }
                }
                break;
            case 'order':
                var child = store.parent.child;
                for (var c in child) {
                    if (child[c].type == '0') {
                        $("#category_content .listview").append(
                        templates.gen('listitem', {
                            'type': 0,
                            'url': '',
                            'content': store.category[store.root][child[c].id].name,
                            'id': c,
                            'icon': 'carat-r'
                        }));
                    } else {
                        if (store.item[store.root][child[c].id] == null) continue;
                        if (store.item[store.root][child[c].id] != null) {
                            $("#category_content .listview").append(
                        templates.gen('listitem', {
                            'type': 1,
                            'url': '',
                            'content': store.item[store.root][child[c].id].name,
                            'id': c,
                            'icon': 'plus'
                        }));
                        }
                    }
                }
                break;
            case 'cart':
                var child = store.parent.child;
                for (var c in child) {
                    if (store.item[store.root][child[c].id] != null) {
                        $(".cart_scroll .listview").append(
                        templates.gen('cartitem', {
                            'type': 0,
                            'url': '',
                            'content': store.item[store.root][child[c].id].name,
                            'id': c,
                            'icon': 'delete',
                            'quantity': store.data.cart.child[c].quantity
                        }));
                    }
                }
                break;
            case 'salon':
                if (store.parent.type == '0') {
                    var child = store.parent.child;
                    for (var c in child) {
                        if (store.item[store.root][child[c].id] == null) {
                            continue;
                        }
                        if (child[c].type == 0) {
                            $("#category_content .listview").append(
                            templates.gen('listitem', {
                                'type': 0,
                                'url': '',
                                'content': store.category[store.root][child[c].id].name,
                                'id': c,
                                'icon': 'carat-r'
                            }));
                        } else {
                            if (store.item[store.root][child[c].id] != null) {
                                $("#category_content .listview").append(
                            templates.gen('listitem', {
                                'type': 1,
                                'url': '',
                                'content': store.item[store.root][child[c].id].name,
                                'id': c,
                                'icon': store.root == 'salon' ? 'salon' : 'promotion'
                            }));
                            }
                        }
                    }
                } else {
                    $('#info_content').html(store.item[store.root][store.parent.id].content);
                    rateEventHandle();
                }
                break;
            case 'promotion':
                var child = store.parent.child;
                switch (store.parent.id) {
                    case 0:
                        for (var c in child) {
                            $("#category_content .listview").append(
                                templates.gen('listitem', {
                                    'type': 0,
                                    'url': '',
                                    'content': store.category[store.root][child[c].id].name,
                                    'id': c,
                                    'icon': 'carat-r'
                                }));
                        }
                        break;
                    case '1':
                        if (store.category.promotion[store.parent.id].show == '0') {
                            $('#info_content').html('<div class="message">Chương trình khuyến mại đã hết.<br>Chúc các Salon may mắn trong các chương trình sau.</div>');
                        } else {
                            if (child.length == 0) {
                                $('#info_content').html('<div class="message">Chương trình khuyến mại đã hết.<br>Chúc các Salon may mắn trong các chương trình sau.</div>');
                            }
                            for (var c in child) {
                                if (Number(store.user.data.levelId) == Number(store.item[store.root][child[c].id].level)) {
                                    $('#info_content').html(
                                        templates.gen('promotions', {
                                            'content': store.item[store.root][child[c].id].content
                                        }));
                                    break;
                                }
                            }
                        }
                        break;
                    case '2':
                        if (store.category.promotion[store.parent.id].show == '0') {
                            $('#info_content').html('<div class="message">Chương trình khuyến mại đã hết.<br>Chúc các Salon may mắn trong các chương trình sau.</div>');
                        } else {
                            var check = 0;
                            for (var c in child) {
                                if (Number(store.user.data.levelId) == Number(store.item[store.root][child[c].id].level) &&
                                    (store.user.data.localId == store.item[store.root][child[c].id].localId ||
                                    store.item[store.root][child[c].id].localId == 0)) {
                                    if (store.item[store.root][child[c].id] != null) {
                                        check = 1;
                                        $("#category_content .listview").append(
                                            templates.gen('promotion', {
                                                'image': store.item[store.root][child[c].id].image,
                                                'id': c,
                                                'timerid': child[c].id
                                            }));
                                    }
                                }
                            }
                            if (check == 0) {
                                $('#info_content').html('<div class="message">Chương trình khuyến mại đã hết.<br>Chúc các Salon may mắn trong các chương trình sau.</div>');
                            }
                        }
                        break;
                }
                break;
        }
        layout.RefreshLayout();
    },
    ListView: function (parent) {
        $('.main_content .listview').empty();
        for (var c in parent) {
            if (parent[c].type == 0) {//category type
                if (store.category[store.root][parent[c].id] == null) {
                    return;
                }
                $(".main_content .listview").append(
                    templates.gen('listitem', {
                        'type': 0,
                        'url': client.host + store.category[store.root][parent[c].id].image,
                        'content': store.category[store.root][parent[c].id].name,
                        'id': c,
                        'icon': 'carat-r'
                    }));
            }
            else if (parent[c].type == 1) {//category type
                if (store.item[store.root][parent[c].id] == null) {
                    continue;
                }
                switch (store.root) {
                    case 'cart':
                        $(".main_content .listview").append(
                   templates.gen('cartitem', {
                       'type': 1,
                       'url': client.host + store.item[store.root][parent[c].id].image,
                       'content': store.item[store.root][parent[c].id].name,
                       'id': c,
                       'icon': 'delete',
                       'quantity': parent[c].quantity
                   }));
                        break;
                    case 'news':
                        
                        break;
                    default:
                        $(".main_content .listview").append(
                    templates.gen('listitem', {
                        'type': 1,
                        'url': client.host + store.item[store.root][parent[c].id].image,
                        'content': store.item[store.root][parent[c].id].name,
                        'id': c,
                        'icon': 'plus'
                    }));
                        break;
                }
            }
        }
        layout.RefreshLayout();
        return 'ok';
    },

    ContentView: function (data) {
        layout.InitLayout();
        $('.main_content .contentview').html(data);
        layout.RefreshLayout();
    }
}