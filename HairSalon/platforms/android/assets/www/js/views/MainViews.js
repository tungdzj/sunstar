var mainView = {
    currentPage: 'category',
    pageTitle: 'Tin tức',
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
            case 'promotion':
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
                                'icon': 'doc'
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