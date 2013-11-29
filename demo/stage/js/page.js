$(function() {
	var _w = $('body').width();
	$('div.c-mask').animate({
		width: 300,
		height: 300,
		left: (_w - 300) / 2,
		top: 25,
		"border-radius": 150
	}).animate({
		'width': -10,
		'height': -10,
		'left': _w / 2,
		'top': '150',
		'border-radius': $(this).width() / 2
	}, function() {
		$(this).remove();
		// $('div.step-tips').slideDown('slow');
		showStep();
	});

	function showStep() {
		var step = $('div.stepNum');
		step.css({
			'position': 'absolute',
			'left': '475px',
			'top': '100px'
		}).show();
		$(step[0]).animate({
			'left': 0,
			'top': 0
		}, 300, function() {
			// console.log(this);
			$('div.step-tips', $(this)).slideDown('slow');
		});
		$(step[1]).animate({
			'left': 330,
			'top': 0,
		}, 400, function() {
			$('div.step-tips', $(this)).slideDown('slow');
		});
		$(step[2]).animate({
			'left': 660,
			'top': 0
		}, 500, function() {
			$('div.step-tips', $(this)).slideDown('slow');
		});
	}
});