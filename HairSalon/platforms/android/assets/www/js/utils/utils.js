var utils = {
    pages: [],
    InitPage:function(){
    },
    ShowLoading: function () {
        $('.loading').removeClass('hidden');
    },

    HideLoading: function () {
        $('.loading').addClass('hidden');
    },
    ChangePage: function (page) {
        this.HideLoading();
        //$.mobile.changePage('#' + page);
    },
    ShowMessage: function (message, title, callback) {
        $('.popup_msg .content').html(message);
        if (title != null) {
            $('.popup_msg .title').html(title);
        } else {
            $('.popup_msg .title').html('Thông báo');
        }
        if (callback) {
            $(".popup_msg .ui-btn").on('click', function () {
                $(".popup_msg .ui-btn").unbind();
                callback();
            });
        }
        popup.open('message');
    },

    ShowConfirm: function (message, title, callback) {
        $('.popup_confirm .title').html(title);
        $('.popup_confirm .content').html(message);
        //ok
        if (callback) {
            $(".popup_confirm .btn-ok").bind('click', function () {
                $(".popup_confirm .btn-ok").unbind();
                $(".popup_confirm .btn-cancel").unbind();
                callback({'btn':'ok'});
            });

            $(".popup_confirm .btn-cancel").bind('click', function () {
                $(".popup_confirm .btn-cancel").unbind();
                $(".popup_confirm .btn-ok").unbind();
                callback({ 'btn': 'cancel' });
            });
        }
        popup.open('confirm');
    },

    ShowPrompt: function (message, title, callback) {
        $('.popup_prompt .txt_input').val('');
        $('.popup_prompt .title').html(title);
        $('.popup_prompt .content').html(message);
        //ok
        $(".popup_prompt .btn-ok").bind('click', function () {
            callback({'btn':'ok', 'content': $('.popup_prompt .txt_input').val()});
            $(".popup_prompt .btn-ok").unbind();
            $(".popup_prompt .btn-cancel").unbind();
            popup.close('prompt');
            
        });
        //cancel
        $(".popup_prompt .btn-cancel").bind('click', function () {
            $(".popup_prompt .btn-ok").unbind();
            $(".popup_prompt .btn-cancel").unbind();
            popup.close('prompt');
            callback({'btn':'cancel'});
        });
        popup.open('prompt');
    },

    ShowLogin: function (callback_ok) {
        $(".popup_login .btn-ok").bind('click', function () {
            callback_ok($(".txt-username").val(), $(".txt-password").val());
            $(".popup_login .btn-ok").unbind();
            
        });
        popup.open('login');
    },

    Show:function(selector){
        $(selector).removeClass('hidden');
    },
    Hide: function (selector) {
        $(selector).addClass('hidden');
    },

    OpenLink: function (link) {
        window.open(link, '_blank', 'location=yes');
    },
}


var page = {
    currentPage: 'none',
    currentContent: 'none',
    data: [],
    content:[],
    init: function () {
        var first = 1;
        $('.page').each(function () {
            page.data[$(this).attr('id')] = $(this);
            $(this).addClass('hidden');
            if (first == 1) {
                first = 0;
                $(this).removeClass('hidden');
                page.currentPage = $(this).attr('id');
            }
        })
        first = 1;
        $('.page-content').each(function () {
            page.content[$(this).attr('id')] = $(this);
            $(this).addClass('hidden');
            if (first == 1) {
                first = 0;
                $(this).removeClass('hidden');
                page.currentContent = $(this).attr('id');
            }
        })
    },

    changePage: function (pagename) {
        this.data[this.currentPage].addClass('hidden');
        this.currentPage = pagename;
        this.data[this.currentPage].removeClass('hidden');
    },

    changeContent: function (contentname) {
        this.content[this.currentContent].addClass('hidden');
        this.currentContent = contentname;
        this.content[this.currentContent].removeClass('hidden');
    }
}

/***************controls*****************/
var checkbox = {
    data: [],
    init: function () {
        $('.checkbox').each(function () {
            $(this).prepend('<img src="img/control/checkbox0.png"/>');
            checkbox.data[$(this).attr('data-name')] = {'object': $(this), 'callback': null}
            $(this).on('click', function () {
                if ($(this).attr('data-value') == '0') {
                    $(this).children('img').attr('src', 'img/control/checkbox1.png');
                    $(this).attr('data-value', '1')
                    if (checkbox.data[$(this).attr('data-name')].callback) {
                        checkbox.data[$(this).attr('data-name')].callback('1');
                    }
                } else {
                    $(this).children('img').attr('src', 'img/control/checkbox0.png');
                    $(this).attr('data-value', '0')
                    if (checkbox.data[$(this).attr('data-name')].callback) {
                        checkbox.data[$(this).attr('data-name')].callback('0');
                    }
                }
            })
        })
    },

    getValue: function (name) {
        return this.data[name].object.attr('data-value');
    },

    setValue: function (name, check) {
        this.data[name].object.children('img').attr('src', 'img/control/checkbox' + check + '.png');
        this.data[name].object.attr('data-value', check + '');
    },

    bind: function (name, callback) {
        this.data[name].callback = callback;
    }
}
 
var counttimer = [];

var dateUtils = {
    schedule: function () {
        for (var t in store.data.promotion.child[1].child) {
            var p = store.data.promotion.child[1].child[t];
            if (store.item.promotion[p.id].timeToStart > 0){
                store.item.promotion[p.id].timeToStart--;
            } else if (store.item.promotion[p.id].timeToEnd > 0) {
                store.item.promotion[p.id].timeToEnd--;
            }
            if (store.item.promotion[p.id].timeToStart > 0) {
                    $("#promotion-btn-" + p.id).addClass("hidden");
                    $('#promotion-timer-' + p.id).html(dateUtils.toDateTime(store.item.promotion[p.id].timeToStart));
                } else if (store.item.promotion[p.id].timeToEnd > 0) {
                    $('#promotion-timer-' + p.id).html(dateUtils.toDateTime(store.item.promotion[p.id].timeToEnd));
                    $("#promotion-btn-" + p.id).removeClass("hidden");
                } else {
                    $('#promotion-timer-' + p.id).html('Hết thời gian khuyến mại');
                    $("#promotion-btn-" + p.id).addClass("hidden");
                }
        }
        setTimeout(dateUtils.schedule, 1000);

    },
    toDateTime: function(sec)
    {
        
        var t = sec;
        var d = Math.floor(t / 86400);
        t -= d * 86400;
        var h = Math.floor(t / 3600);
        t -= h * 3600;
        var m = Math.floor(t / 60);
        t -= m * 60;
        var s = t;
        return d + ' ngày ' + h + ':' + m + ':' + s;
    },
    getDaysBetweenDates: function (date1, date2) {
        date1.setHours(0);
        date1.setMinutes(0, 0, 0);
        date2.setHours(0);
        date2.setMinutes(0, 0, 0);
        var datediff = Math.abs(date1.getTime() - date2.getTime()); // difference 
        return parseInt(datediff / (24 * 60 * 60 * 1000), 10);
    },
    replaceAll: function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
}
