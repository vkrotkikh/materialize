(function($) {
    $(document).ready(function() {
        $(".dropdown-button").dropdown({
            belowOrigin: true
        });
        $('select').material_select();
        $('.modal').modal({
            opacity: '0.8'
        });
        $('.close-modal').click(function() {
            $('.modal').modal('close');
        });
        $('#tabSearch').tabs({
            onShow: function() {
                
            }
        });
        $(".dropup-button").dropdown({
            constrain_width: false,
            // belowOrigin: true
        });
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
    })
})(jQuery);