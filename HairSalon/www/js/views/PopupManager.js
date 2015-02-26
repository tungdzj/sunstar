var popup = {
    currentPopup:'none',
    list: [],
    open: function (name) {
        if (this.currentPopup != 'none') {
            this.list[this.currentPopup].addClass('hidden');
        }
        this.list[name].removeClass('hidden');
        $(".background").removeClass('hidden');
        $(".popup-container").removeClass('hidden');
        this.currentPopup = name;

        $(".popup-container").animate(
        {
            opacity: 1
        },
        0,
        "linear",
        function () {//complete
            $(".popup-container").removeClass('invisible');
            //$(".popup-container").css('invisible');
        })
    },

    close: function (name) {
        if (this.currentPopup != 'none') {
            this.list[this.currentPopup].addClass('hidden');
            $(".background").addClass('hidden')
            $(".popup-container").animate(
            {
                opacity: 0
            },
            0,
            "linear",
            function () {//complete
                $(".popup-container").addClass('invisible');
                $(".popup-container").addClass('hidden');
            });
        }
        this.currentPopup = 'none';

        
    }
}

$(".popup").each(function () {
    var name = $(this).attr('data-name');
    $(this).addClass('hidden');
    popup.list[name] = $(this);
})

