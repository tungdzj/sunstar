var layout = {
    menu:null,
    docHeight: 0,
    docWidth: 0,
    scrolls: [],
    size: [],
    navScroll: null,
    InitParams: function () {
        this.docHeight = $(window).height();
        this.docWidth = $(window).width();
        this.size['header'] = Math.round($(".header").height());
        this.size['navbar'] = Math.round($('.navbar').height());
        this.size['footer'] = Math.round($(".header").height() * 3 / 2);
    },

    InitElements: function () {
        page.init();
        checkbox.init();
        $('.navbar').css('width', this.docWidth)
        $('.main').height(this.docHeight - this.size.header)
        $("#main_page").css('height', this.docHeight);
        $("#main_page").css('width', this.docWidth);
        $(".footer").css('height', this.size['footer']);
        $("#category_content").css('margin-top', this.size['navbar']);
        $("#category_content").css('height', (this.docHeight - this.size['header'] - this.size['navbar']))
        $("#news_content").css('margin-top', this.size['navbar']);
        $("#news_content").css('height', (this.docHeight - this.size['header'] - this.size['navbar']))
        $("#info_content").css('margin-top', this.size['navbar']);
        $("#info_content").css('height', (this.docHeight - this.size['header'] - this.size['navbar']))
        $("#home_content").css('height', (this.docHeight - this.size['header']))
        $(".cart_scroll").css('margin-top', this.size['navbar']);
        $(".cart_scroll").css('height', (this.docHeight - this.size['header'] * 5 / 2) - this.size['navbar'])
        
        this.scrolls.push($('#category_content').swiper({
            mode: 'vertical',
            slidesPerView: 'auto',
            scrollContainer: true,
        }));
        this.scrolls.push($('.cart_scroll').swiper({
            mode: 'vertical',
            slidesPerView: 'auto',
            scrollContainer: true,
        }));
        this.navScroll = $('.navbar').swiper({
            mode: 'horizontal',
            slidesPerView: 'auto',
            slideClass: 'nav_slide',
            //slideActiveClass: 'nav_active'
        });
        this.scrolls.push(this.navScroll);
        
    },

    InitLayout: function () {
        $("#category_content .listview").empty();
        $(".cart_scroll .listview").empty();
        switch (store.root) {
            case 'news':
            case 'order':
            case 'document':
            case 'color':
                utils.Show('.navbar');
                if (store.parent.type == 0) {
                    page.changeContent('category_content');
                } else {
                    page.changeContent('news_content');
                    $('#news_content').scrollTop(0);
                }
                break;
            case 'home':
                utils.Hide('.navbar');
                page.changeContent('home_content');
                break;
            
            case 'cart':
                utils.Show('.navbar');
                page.changeContent('cart_content');
                break;
            case 'salon':
            case 'promotion':

                utils.Show('.navbar');
                if (store.parent.type == 0) {
                    page.changeContent('category_content');
                } else {
                    page.changeContent('info_content');
                    $('#info_content').scrollTop(0);
                }
                break;
        }
        
    },

    RefreshLayout: function () {
        
        for (var s in this.scrolls) {
            this.scrolls[s].reInit();
            this.scrolls[s].swipeTo(0);
        }
        for (var s in layout.navScroll.slides) {
            $(layout.navScroll.slides[s]).removeClass('nav_active');
        }
        $(layout.navScroll.slides[layout.navScroll.slides.length - 1]).addClass('nav_active');
        layout.navScroll.swipeTo(layout.navScroll.slides.length - 1);
    },

    setCartIcon: function (n) {
        if (n == 0) {
            $('.cart_quantity').addClass('hidden');
        } else {
            $('.cart_quantity').removeClass('hidden');
            $('.cart_quantity').html(n);
        }
    }
}
