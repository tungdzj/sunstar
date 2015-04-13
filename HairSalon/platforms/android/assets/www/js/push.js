var pushNotification;
alert("push.js")
//document.addEventListener("deviceready", function () {
//    alert('device ready');
//    pushNotification = window.plugins.pushNotification;
//    var pushed = window.localStorage.getItem('push');
//    if (pushed == null) {
//        console.log("register");
//        push.register();
//    }
//});

//var push = {
//    register: function () {
//        alert("register");
//        console.log('start register' + window.navigator.platform)
//        if (window.navigator.platform == 'android' || window.navigator.platform == 'Android' || window.navigator.platform == "amazon-fireos") {
//            pushNotification.register(
//            successHandler,
//            errorHandler,
//            {
//                "senderID": "replace_with_sender_id",
//                "ecb": "onNotification"
//            });
//        } else if (window.navigator.platform == 'blackberry10') {
//            pushNotification.register(
//            successHandler,
//            errorHandler,
//            {
//                invokeTargetId: "replace_with_invoke_target_id",
//                appId: "replace_with_app_id",
//                ppgUrl: "replace_with_ppg_url", //remove for BES pushes
//                ecb: "pushNotificationHandler",
//                simChangeCallback: replace_with_simChange_callback,
//                pushTransportReadyCallback: replace_with_pushTransportReady_callback,
//                launchApplicationOnPush: true
//            });
//        } else if (window.navigator.platform == 'Win32') {
//            console.log('push notification not avaible for Win32 platform');
//        } else{
//            pushNotification.register(
//            tokenHandler,
//            errorHandler,
//            {
//                "badge": "true",
//                "sound": "true",
//                "alert": "true",
//                "ecb": "onNotificationAPN"
//            });
//        }
//    }
//}

////ios
//function onNotificationAPN(event) {
//    //if (event.alert) {
//    //    navigator.notification.alert(event.alert);
//    //}

//    //if (event.sound) {
//    //    var snd = new Media(event.sound);
//    //    snd.play();
//    //}
//    console("on notification");
//    if (event.badge) {
//        console.log("set badge");
//        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
//    }
//}
////iOS
//function tokenHandler(result) {
//    console.log(result);
//    client.register('IOS', result, function (data) {
//        console.log(JSON.stringify(data));
//        if (data.code == 0) {
//            window.localStorage.setItem('push', 'registered');
//            console.log("save")
//        }
        
//    })
//}

//function errorHandler(error) {
//    console.log('error = ' + error);
//}