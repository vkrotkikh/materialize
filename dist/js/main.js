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
		$('#tabSearch').tabs();
		$(".dropup-button").dropdown({
			constrain_width: false
		});
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15     // Creates a dropdown of 15 years to control year
		});
		$(".button-collapse").sideNav();

		$('#tabSearch a').click(function() {
			if ($(this).attr('href') === '#searchJobs') {
				$('#searchSchoolsContent').addClass('hide');
				$('#searchJobContent').removeClass('hide');
			}
			if ($(this).attr('href') === '#searchSchools') {
				$('#searchJobContent').addClass('hide');
				$('#searchSchoolsContent').removeClass('hide');
			}
			
		})
	})
})(jQuery);