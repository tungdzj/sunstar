
var app = {
    uuid: 'none',
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
    },

    onDeviceReady: function () {
        documentReady();
        app.uuid = device.uuid;
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

//tung do thanh