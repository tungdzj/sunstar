var pushNotification;
document.addEventListener("deviceready", function () {
});

var push = {
    check: function () {
        if (app.uuid == 'none' ||
            !store.user.isLogin) {
            return;
        }
        try{
            pushNotification = window.plugins.pushNotification;
            var pushed = window.localStorage.getItem('push');
			var reg = window.localStorage.getItem('reg');
            if (pushed == null) {
                push.register();
            }else{
				 client.register('AND', reg, function (data) {
				})
			}
        }catch(err){

        }
    },
    options: '',
    message: '',
    title: '',
    data: null,
    path: [],
    register: function () {
        if (device.platform == 'android' || device.platform == 'Android'|| window.navigator.platform == 'Android' || window.navigator.platform == "amazon-fireos") {
            pushNotification.register(
            successHandler,
            errorHandler,
            {
                "senderID": "56610498973",
                "ecb": "onNotification"
            });
        } else if (window.navigator.platform == 'blackberry10') {
            pushNotification.register(
            successHandler,
            errorHandler,
            {
                invokeTargetId: "replace_with_invoke_target_id",
                appId: "replace_with_app_id",
                ppgUrl: "replace_with_ppg_url", //remove for BES pushes
                ecb: "pushNotificationHandler",
                simChangeCallback: replace_with_simChange_callback,
                pushTransportReadyCallback: replace_with_pushTransportReady_callback,
                launchApplicationOnPush: true
            });
        } else if (window.navigator.platform == 'Win32') {
            console.error('push notification not available for Win32 platform');
        } else {
            pushNotification.register(
            tokenHandler,
            errorHandler,
            {
                "badge": "true",
                "sound": "true",
                "alert": "true",
                "ecb": "onNotificationAPN"
            });
        }
    },

    goto: function () {
        if (push.message == '') {
            return;
        }

        var t = push.options.split('-');
        var category = Number(t[0]);
        var id = Number(t[1]);
        switch (category) {
            case 0:
                mainControl.onMenuItemClick(0);
                for (var n in store.parent.child) {
                    if (Number(store.parent.child[n].id) == id) {
                        mainControl.onItemClick(n);
                    }
                }
                break;
            case 4:
                mainControl.onMenuItemClick(4);
                mainControl.onItemClick(Number(id) - 1);
                break;
        }
        push.message = ''
    },

    applyPush: function () {
        if (push.message == '' ||
            !store.user.isLogin) {
            return;
        }
        var t = push.options.split('-');
        var category = Number(t[0]);
        var id = Number(t[1]);
        switch (category) {
            case 0:
                store.getNews(function () {
                    utils.ShowConfirm(push.message, push.title, function (result) {
                        if (result.btn == 'ok') {
                            push.goto();
                        }
                    })
                });
                break;
            case 4:
                store.getPromotion(function (data) {
                    utils.ShowConfirm(push.message, push.title, function (result) {
                        if (result.btn == 'ok') {
                            push.goto();
                        }
                    })
                });
                break;
        }
        
    },
}

//ios
function onNotificationAPN(event) {
    push.options = event.options;
    push.message = event.alert;
    push.title = event.title;
    push.applyPush();

    //if (event.sound) {
    //    var snd = new Media(event.sound);
    //    snd.play();
    //}
    if (event.badge) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}
//iOS
function tokenHandler(result) {
    console.log("regid: " + result);
	window.localStorage.setItem('reg', result);
    client.register('IOS', result, function (data) {
        if (data.code == 0) {
            window.localStorage.setItem('push', 'registered');
            console.error("save")
        }
        
    })
}

function errorHandler(error) {
    console.error('error = ' + error);
}

//ANDROID
function successHandler(result) {
    console.log("success with result: " + result);
    
}
function onNotification(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
				window.localStorage.setItem('reg', e.regid);
                client.register('AND', e.regid, function (data) {
                    if (data.code == 0) {
                        window.localStorage.setItem('push', 'registered');
                    }
                })
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a diaerror, etc.
            if (e.foreground) {
                push.options = e.payload.options;
                push.message = e.payload.message;
                push.title = e.payload.title;
                push.applyPush();
            }
            else {  // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart) {
                    push.options = e.payload.options;
                    push.message = e.payload.message;
                    push.title = e.payload.title;
                    push.applyPush();
                }
                else {
                }
            }
            break;

        case 'error':
            break;

        default:
            break;
    }
}
