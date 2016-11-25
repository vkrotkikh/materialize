(function($) {
    $(document).ready(function() {
        $(".dropdown-button").dropdown({
            belowOrigin: true
        });
        $('select').material_select();
        $('.modal').modal({
            opacity: '0.8',
            ending_top: '25%'
        });
        $('.close-modal').click(function() {
            $('.modal').modal('close');
        });
    })
})(jQuery);