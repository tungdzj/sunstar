
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },

    onDeviceReady: function () {
        documentReady();
        //mainControl.initEventListener();
        if (device.platform == "iOS") {
            StatusBar.hide();
        }
        config.load();
        app.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {

    }
};
app.initialize();