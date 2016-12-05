(function($) {
	$(document).ready(function() {
		// Дефолтный дропдаун появляется под кнопкой, а не накладывает на кнопку.
		$(".dropdown-button").dropdown({
			belowOrigin: true
		});
		// Инициализация селектов
		$('select').material_select();
		// Меняем прозрачность оверлея модального окна
		$('.modal').modal({
			opacity: '0.8'
		});
		// Закрываем модалку по клику на определенную кнопку
		$('.close-modal').click(function() {
			$('.modal').modal('close');
		});
		// Инициализация табов (/teacher/search.html). Если не нужно, просто поудалять айдишники с блоков табов.
		$('#tabSearch').tabs();
		// $(".dropup-button").dropdown({
		// 	constrain_width: false
		// });
		// Инициализация дефолтного дейтпикера
		$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 15     // Creates a dropdown of 15 years to control year
		});
		// Инициализация кнопки, которая появляется и открывает навигацию сайта на разрешениях ниже 992 пикселей.
		$(".button-collapse").sideNav();

		// Сделал скрытие/отображение блоков к кнопкам табов
		$('#tabSearch a').click(function() {
			if ($(this).attr('href') === '#searchJobs') {
				$('#searchSchoolsContent').addClass('hide');
				$('#searchJobContent').removeClass('hide');
			}
			if ($(this).attr('href') === '#searchSchools') {
				$('#searchJobContent').addClass('hide');
				$('#searchSchoolsContent').removeClass('hide');
			}
		});
	});

	// Simple pie chart example with four series
	if ($('.overall-performance-chart').length > 0) {
		var chartMain = new Chartist.Pie('.overall-performance-chart', {
			series: [{
				value: 56,
				className: 'green',
				meta: 'Meta One'
			}, {
				value: 278,
				className: 'black',
				meta: 'Meta Two'
			}, {
				value: 11,
				className: 'red',
				meta: 'Meta Three'
			}]
		});
	}
	if ($('.provided-feedback-chart').length > 0) {
		var chartMain = new Chartist.Pie('.provided-feedback-chart', {
			series: [{
				value: 40,
				className: 'green',
				meta: 'Meta One'
			}, {
				value: 50,
				className: 'blue',
				meta: 'Meta Two'
			}, {
				value: 10,
				className: 'red',
				meta: 'Meta Three'
			}]
		});
	}
	/*Функция открытия/закрытия дополнительного фильтра. Шаблон /school/fpt-received.html*/
	showPanelFilter();
	function showPanelFilter() {
		var btn = $('#showPanelFilter'),
			icon = $('#showPanelFilter i'),
			blockFilter = $('#additionalFilter');
		blockFilter.slideUp();
		btn.click(function() {
			if (btn.hasClass('open')) {
				icon.text('keyboard_arrow_up');
				btn.removeClass('open');
				blockFilter.slideUp();
			} else {
				btn.addClass('open');
				icon.text('keyboard_arrow_down');
				blockFilter.slideDown();
			}
		});
	}
})(jQuery);