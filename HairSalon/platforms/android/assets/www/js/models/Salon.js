var salon = {
    personalInfo: '',
    
    init: function () {
        this.item[0].content = '<div class="content-title">THÔNG TIN CÁ NHÂN</div><table><tr><td>ID tài khoản</td><td><div class="info">' + store.user.data.id + '</div></td></tr><tr><td>Tên đăng nhập</td><td><div class="info">' + store.user.data.username + '</div></td></tr><tr><td>Email đăng ký</td><td><div class="info"></div></td></tr><tr><td>Tên Salon</td><td><div class="info">' + store.user.data.fullname + '</div></td></tr><tr><td>Ngày sinh</td><td><div class="info"></div></td></tr><tr><td>Điện thoại</td><td><div class="info">' + store.user.data.phone + '</div></td></tr><tr><td>Địa chỉ</td><td><div class="info">' + store.user.data.address + '</div></td></tr><tr><td>Hạng thẻ thành viên</td><td><div class="info">' + store.user.data.level + '</div></td></tr></table>';
        this.item[1].content = '<div class="content-title">HẠNG THẺ CỦA BẠN</div><table><tr><td>Kỳ xét hạng hiện tại</td><td><div class="info">' + '01/10/2014 - 30/09/2015' + '</div></td></tr><tr><td>Doanh số xét hạng</td><td><div class="info">' + '0' + '</div></td></tr><tr><td>Doanh số xét hạng tiếp theo</td><td><div class="info">0</div></td></tr><tr><td>Hạng thẻ hiện tại</td><td><div class="info">' + store.user.data.level + '</div></td></tr></table>';
        this.item[2].content = '<div class="content-title">ĐỔI MẬT KHẨU</div><table><tr><td>Mật khẩu cũ</td><td><input type="password"id="oldpass" placeholder="(6 - 15 ký tự)*"/></td></tr><tr><td>Mật khẩu mới</td><td><input type="password"id="newpass" placeholder="(6 - 15 ký tự)*"/></td></tr><tr><td>Xác nhận mật khẩu mới</td><td><input type="password"id="confirmpass" placeholder="(6 - 15 ký tự)*"/></td></tr></table><div class="btn" onclick="store.user.changePassword()">Cập nhật</div>';
        this.item[3].content = 'HẠNG BẠCH KIM<br><img src="http://sunstar.vn/upload_images/images/Phan%20hang%20salon-1.jpg"/><br>HẠNG VÀNG<br><img src="http://sunstar.vn/upload_images/images/Phan%20hang%20salon-2.jpg"/><br>HẠNG TITAN<br><img src="http://sunstar.vn/upload_images/images/3-ti%20tan.jpg"/><br>HẠNG BẠC<br><img src="http://sunstar.vn/upload_images/images/4-Bac.jpg"/><br>HẠNG ĐỒNG<br><img src="http://sunstar.vn/upload_images/images/5-Dong.jpg"/><br>'
        this.item[4].content = '<select name="type" id="type"><option value="">Chọn</option><option value="1">Kỹ thuật</option><option value="2">Nhân viên bán hàng</option><option value="3">Dịch vụ khách hàng</option><option value="4">Sản phẩm</option><option value="5">Chính sách</option><option value="6">Khác</option></select><textarea id="comment_input" placeholder="Viết nội dung phản hồi..."></textarea><div class="btn" onclick="store.user.comment()">Hoàn tất</div> ';
        store.data.salon = salon.data;
        store.item.salon = salon.item;
        store.category.salon = salon.category;
        store.data.salon.child[0].parent = store.data.salon;
        store.data.salon.child[1].parent = store.data.salon;
        store.data.salon.child[2].parent = store.data.salon;
        store.data.salon.child[0].child[0].parent = store.data.salon.child[0];
        store.data.salon.child[0].child[1].parent = store.data.salon.child[0];
        store.data.salon.child[0].child[2].parent = store.data.salon.child[0];
    },
    category: {
        1:new CategoryModel({
            'id': '1',
            'name': 'Salon',
            'child': [

            ],
            'parent':'0'
        }),
        2: new CategoryModel({
            'id': '2',
            'name': 'Hồ sơ',
            'child': [

            ],
            'parent': '1'
        })
    },

    item: {
        0: { 'id': '0', 'name': 'Thông tin cá nhân', 'content': '', 'parentId':'2' },
        1: { 'id': '1', 'name': 'Hạng thẻ của bạn', 'content': '', 'parentId': '2' },
        2: { 'id': '2', 'name': 'Đổi mật khẩu', 'content': '', 'parentId': '2' },
        3: { 'id': '3', 'name': 'Quy định hạng thẻ', 'content': '', 'parentId': '1' },
        4: { 'id': '4', 'name': 'Hãy nói với chúng tôi', 'content': '', 'parentId': '1' },
    },

    data:{
        'id': '1', //ho so
        'child': [
            {
                'id': '2',
                'type': '0',
                'child': [
                    { 'id': '0', 'type': '1', 'parentId': '2' },
                    { 'id': '1', 'type': '1', 'parentId': '2' },
                    { 'id': '2', 'type': '1', 'parentId': '2' },
                ],
                'parentId':'1' 
            },
            { 'id': '3', 'type': '1', 'parentId': '1' },
            { 'id': '4', 'type': '1', 'parentId': '1' },
        ],
        'parentId':'0',
        'type': '0'
    },
}
