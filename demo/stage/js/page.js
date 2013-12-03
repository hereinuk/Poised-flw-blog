$(function() {
	var _w = $('body').width();
	$('div.c-mask').animate({
		width: 300,
		height: 300,
		left: (_w - 300) / 2,
		top: 25,
		"border-radius": 150
	}, 1000).css({
		"border-radius": '150px'
	}).animate({
		'width': -10,
		'height': -10,
		'left': _w / 2,
		'top': '150',
		'border-radius': $(this).width() / 2
	}, 1000, function() {
		$(this).remove();
		// $('div.step-tips').slideDown('slow');
		showStep(0, 0, 3);
	});

	var _ha = [];
	function showStep(top, idx, num) {
		var step = $('div.stepNum'),
			_h = 0, i, len, j = 0,// 记录高度最高的板块
			_c = $('div.step-container'),
			_config = [
				{
					top: top,
					left: 0,
					time: 600
				},
				{
					top: top,
					left: 330,
					time: 900
				}, 
				{
					top: top,
					left: 660,
					time: 1000
				}
			],
			_sure = []; // 确认栈、确认所有动画效果执行完毕

		if (idx === 0) {
			step.css({
				'position': 'absolute',
				'left': '455px',
				'top': '50px'
			}).show();
		}

		for (i = idx; i < num; i++) {
			;(function(i) {
				$(step[i]).animate({
					'left': _config[j].left,
					'top': _config[j].top
				}, _config[j].time, function() {
					// console.log(this);
					console.log(i, step.length);
					if (i < step.length - 1) {
						$('div.step-to', $(this)).show().animate({
							'width': 280
						}, 1000);
					}
					
					$('div.step-tips', $(this)).slideDown('slow', function() {
						_sure.push('OK');
						var __h = $('div.step-content', $(this))/*.eq(Math.ceil(idx / 3))*/.height(),
							_cH = _c.height(), _l,
							_sum = count(_ha);

						if (__h + _sum + 59 >= _cH) {
							_h = __h + _sum + 59;
							_c.height(_h);
						} else {
							_h = _cH;
						}

						// 说明该动画执行完毕
						if (_sure.length === 3) {
							_ha.push(_h + 10);
							_sure.length = 0;
							_l = (step.length - 3 > 3) ? 3 : step.length - 3;
							if (_l > 0)
								showStep(_h + 10, idx + 3, _l + idx + 3);
						}
					});
				});
			})(i);

			j += 1;
		}
	}

	function count(arr) {
		var i = 0, len = arr.length,
			sum = 0;

		for (; i < len; i++) {
			sum += arr[i];
		}

		return sum;
	}
});