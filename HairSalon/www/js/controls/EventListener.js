var scroll = [];
var responsive = [];
$(document).ready(function () {
    //load app config
    if (navigator.platform == 'Win32') {
        documentReady();
        config.load();
    }
});

function documentReady() {
    layout.menu = $.jPanelMenu({
        closeOnContentClick: true,
        openPosition: ($(window).width() / 5 * 4) + 'px',
    });
    layout.menu.on();
    //init iscroll
    layout.InitParams();
    layout.InitElements();
    
    utils.ChangePage('category_page');
    store.getCategory(function () {
        //mainView.Refresh();
        //utils.HideLoading();
        $('.event').trigger('onCategoryLoad');
        store.getOrder(function () { })
        store.getNews(function () { })
        //store.getPromotion(function () { });
        store.getColor(function () { });
        store.getDocument(function () { });
    })
}