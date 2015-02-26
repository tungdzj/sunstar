
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
        config.load();
        app.receivedEvent('deviceready');
        
        //mainControl.initEventListener();
		if (device.platform == "iOS") {
            StatusBar.hide();
        }
    },

    receivedEvent: function (id) {

    }
};
app.initialize();