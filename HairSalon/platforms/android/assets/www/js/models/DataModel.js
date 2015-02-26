//User model
function UserModel() {
    this.isLogin = false;
    this.data = {
        'username': '',
        'password': '',
        'id': '',
        'fullname': '',
        'level': '',
        'phone': '',
        'address':''
    };
    this.Validate = function () {
        if (this.userName == "" || this.password.length < 6) {
            return false;
        }
        return true;
    }
    this.cart = new Cart();
    this.order = function(id){
        if (!this.isLogin) {
            this.login();
        } else {
            utils.ShowPrompt('Nhập số lượng mua', 'Đặt hàng', function (result) {
                if (result.btn == 'ok') {
                    var n = Number(result.content);
                    store.user.cart.addProduct(id, n)
                }
            },
            function () {
            })
        }
    }
    this.updateOrder = function (id, quantity) {
        store.user.cart.product[id].quantity = quantity;
        store.data.cart.child[id].quantity = quantity;
        store.user.cart.save();
    }
    this.removeOrder = function (index) {
        this.cart.removeProduct(index);
        mainView.Refresh();
    }
    this.checkLogin = function (name, pass) {
        store.user.data.username = name;
        store.user.data.password = pass;
        client.login(function (data) {
            if (data.code == 0) {
                store.user.data.phone = data.data.phone;
                store.user.data.fullname = data.data.fullname;
                store.user.data.id = data.data.id;
                store.user.data.level = data.data.level;
                store.user.data.address = data.data.address;
                salon.init();
                d = new Date();
                $(".login_menu img").attr('src', 'img/menu/logout.png' + "?" + d.getTime());
                $(".login_menu div").html('ĐĂNG XUẤT');
                page.changePage('ok_page');
                page.changeContent('home_content')
                utils.Hide('.navbar');
                store.user.isLogin = true;
                store.user.cart.user = this.userName;
                store.user.cart.load();
                store.category.cart.push(new CategoryModel({ 'id': '0', 'name': 'Giỏ hàng' }));
                config.update();
            } else {
                utils.ShowMessage('Sai tên người dùng hoặc password', 'Thông báo', function () { });
            }
        })
    }

    this.changePassword = function () {
        var oldpass = $('#oldpass').val();
        var newpass = $('#newpass').val();
        var confirmpass = $('#confirmpass').val();
        var checkpass = function () {
            if (oldpass.length < 6 || newpass.length < 6 || confirmpass.length < 6 || newpass != confirmpass) {
                return false;
            }
            return true;

        }

        if (checkpass()) {
            client.changePassword({
                'username': store.user.data.username,
                'password': store.user.data.password,
                'newpassword': newpass
            }, function (data) {
                if (data.code == 0) {
                    utils.ShowMessage('Đổi mật khẩu thành công');
                } else {
                    utils.ShowMessage(data.msg);
                }
            })
        } else {
            utils.ShowMessage('Các thông tin chưa chính xác.')
        }
    }
    this.login = function () {
        utils.ShowLogin(this.checkLogin)
    }

    this.logout = function () {
        utils.ShowConfirm('Đăng xuất?', 'Xác nhận', function (result) {
            if (result.btn == 'ok') {
                $(".login_menu img").attr('src', 'img/menu/login.png' + "?" + d.getTime());
                $(".login_menu div").html('ĐĂNG NHẬP');
                store.user.isLogin = false;
                store.data.cart = new NodeModel();
                page.changePage('login_page')
            }
        });
    }

    this.comment = function () {
        var content = $('#comment_input').val();
        var type = $('#type').val();
        if (type == 0 || content == ''){
            utils.ShowMessage('Hãy chọn chức danh và nhập nội dung phản hồi.')
        } else {
            client.comment({
                'content': content,
                'typeID': type
            }, function (data) {
                utils.ShowMessage(data.msg)
            });
        }
    }
    
    this.sendOrder = function () {
        var product = store.user.cart.product;
        var arr = [];
        for (var i = 0; i < product.length; i++) {
            if (product[i].quantity > 0) {
                arr.push({ 'id': Number(product[i].id), 'count': Number(product[i].quantity) });
            }
        }
        if (arr.length == 0) {
            utils.ShowMessage('Chưa có mặt hàng nào trong giỏ hàng', 'Thông báo', function () { });
            return;
        }
        client.sendOrder(JSON.stringify(arr), function (data) {
            console.log(data);
            utils.ShowMessage(data.msg);
            if (data.code == 0) {
                store.user.cart.removeAllProduct();
                mainView.Refresh();
            }
        })
        
    }

    this.removeAllOrder = function () {
        this.cart.removeAllProduct();
        mainView.Refresh();
    }

    this.orderPromotion = function (id, quantity) {
        utils.ShowPrompt("Nhập số lượng sản phẩm khuyến mại", 'Đặt hàng khuyến mại', function (data) {
            if (data.btn == 'ok') {
                client.orderPromotion(1, data.content, function (data) {
                    setTimeout(function () {
                        utils.ShowMessage(data.msg, 'Thông báo', function () { });
                    }, 500)
                },
            function () {
                utils.ShowMessage('Xảy ra lỗi, hãy kiểm tra lại kết nối Internet của bạn.');
            });
            }
            
        })
        
    }

    this.orderTung = function () {
        var content = $('#order_promotion_input').val();
        client.orderTung(content, function (data) {
            utils.ShowMessage(data.msg);
        })
    }
}

//Category Model
function CategoryModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.parentId = data.parentId;
    this.image = data.image != null ? data.image : 'images/default.png';
    this.child = [];
}


function ItemModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.content = data.description;
    this.price = data.price;
    this.parentId = data.categoryId;
    this.discount = data.discount;
    this.child = [];
}
//News Model

function NodeModel(data) {
    //default value
    this.id = 0;
    this.parentId = -1;
    this.child = [];
    this.type = 0;
    this.parent = null;
    this.appendChild = function (item) {
        this.child.push(item);
    }
    if (data == null) {
        return;
    }

    this.parentId = data.parentId;
    this.id = data.id;
    this.quantity = data.quantity;
}

function Cart(user) {
    this.user = user;
    this.product = [];
    this.addProduct = function (productId, quantity) {
        this.product.push({ 'id': productId, 'quantity': quantity });
        var node = new NodeModel({
            'id': productId,
            'parentId': '0',
            'quantity':quantity
        });
        node.type = 1;
        store.data.cart.child.push(node);
        this.save();
        layout.setCartIcon(this.product.length);
    }
    this.removeAllProduct = function () {
        this.product = [];
        store.data.cart.child = [];
        this.save();
        layout.setCartIcon(0);
    }
    this.removeProduct = function (index) {
        this.product.splice(index, 1);
        store.data.cart.child.splice(index, 1);
        this.save();
        layout.setCartIcon(this.product.length);
    }
    this.load = function () {
        var data = JSON.parse(window.localStorage.getItem(user));
        console.log(data)
        if (data != null) {
            this.product = data;
            layout.setCartIcon(this.product.length);
            if (this.product.length > 0) {
                $('.btn-cart').css('background-image', 'url("img/menu/cart.png")');
            } else {
                
            }
            for (var i in data) {
                var node = new NodeModel();
                data[i].parent = store.data.cart;
                node.id = data[i].id;
                node.parentId = 0;
                node.type = 1;
                node.quantity = data[i].quantity;
                store.data.cart.appendChild(node);
            }
        } else {
            layout.setCartIcon(0);
        }
    }

    this.save = function () {
        var data = JSON.stringify(this.product);
        for (var i in this.product) {
            this.product[i].parent = null;
        }
        window.localStorage.setItem(user, data);
    }
}