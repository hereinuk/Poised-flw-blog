$(function() {	
	// placeholder
	FE.placeholder(document.getElementById('query-txt'));

	// $('div.item').hover(function() {
	// 	$('div.item-corner', $(this)).stop().show().animate({
	// 		"border-left-width": 55,
	// 		"border-bottom-width": 35
	// 	});
	// }, function() {
	// 	$('div.item-corner', $(this)).stop().animate({
	// 		"border-left-width": 1,
	// 		"border-bottom-width": 1
	// 	}).hide();
	// });

	// var _timer = setTimeout(function() {
	// 	$('div.go-n-btn').animate({
	// 		'margin-top': 60
	// 	}).animate({
	// 		'margin-top': 25
	// 	});

	// 	setTimeout(arguments.callee, 1500);
	// }, 100);


	$('div.go-next').on('click', function() {
		// $('div.main-doc').slideUp('slow');
		// $('#o-doc').slideDown('slow');
		// window.location.href = "#o-doc";
		// $(window).scrollTop($('.main-doc').height() + 40);
		console.log('click!!!');
		$('#o-doc').parent().removeClass().addClass('doc-skin').css('display', 'block');
		$("body, html").stop().animate({
			scrollTop: $('#o-doc').parent().offset().top
		}, 1000, function() {
			$('.header, .main-doc').hide();
			pp();
		});	
	});

	// $(window).on('scroll', function() {
	// 	// console.log('scroll!!!');
	// 	var _d = $('body').scrollTop() || $('html').scrollTop();

	// 	if (_d >= 623 && _t.css('display') == "none") {
	// 		_t.show();
	// 	} else if (_d < 623 && _t.css('display') == "block") {
	// 		_t.hide();
	// 	}
	// });
	$('div.go-back').on('click', function() {
		// $('.header, .main-doc').show(10, function() {
		// 	console.log($('body').scrollTop());

		// 	$('body, html').stop().animate({
		// 		scrollTop: 0
		// 	}, 1000, function() {
		// 		$('#o-doc').parent().removeClass().addClass('doc-hide');
		// 	});
		// });
		$('#o-doc').parent().slideUp(1000);
		$('.header, .main-doc').slideDown(1000);
	});

	reDraw();
	$(window).on('resize', reDraw);

	function reDraw() {
		var _h = $(window),
			_c = $('div.main-doc');

		if (_h.height() > 673) {
			_c.height(_h.height() - 40);
		} else {
			_c.height(633);
		}

		reDrawOther();
	}

	function reDrawOther() {
		var _o = $('div.doc-skin'),
			_child = $('#o-doc'),
			_p = {
				h: $(window).height(),
				w: $(window).width()
			};

		_o.width(_p.w);
		_o.height(_p.h);
		_child.width(_p.w - 40);
		_child.height(_p.h - 100);
	}
});

$(window).on('resize', /*function() {
	var margin = 20,
		section = $('#o-doc section'),
		s_w = 256,
		h = [],
		n = (document.documentElement.offsetWidth - 40) / s_w | 0;

	for (var i = 0; i < section.length; i++) {
		var s_h = section[i].offsetHeight;
		if (i < n) {
			h[i] = s_h;
			section.eq(i).css('top', 0);
			section.eq(i).css('left', i + s_w);
		} else {
			var min_h = Math.min.apply(null, h);
			var minKey = getArrayKey(h, min_h);
			h[minKey] += s_h + margin;
			section.eq(i).css({
				'top': min_h + margin,
				'left': minKey * s_w
			});
		}
	}

	function getArrayKey(s, v) {
		for (k in s) {
			if (s[k] == v)
				return k;
		}
	}
}*/pp);
// 第二屏瀑布流布局
function pp(e) {
	var _pp = $('#o-doc'),
		_p = $('article', _pp),
		_ss = $('section', _pp), // 所有的section
		_e = 0, // 每行4列
		len,
		_idx = 0, // 当前索引
		_hArr = [];//[{l: 0, t: 0}, {l: 256, t: 0}, {l: 512, t: 0}, {l: 768, t: 0}]; // 记录四列中当前的尺寸

	for (var i = 0; len = Math.floor(($('body').width() - 40) / 256), i < len; i++) {
		_hArr.push({
			l: i * 256,
			t: 0
		});
	}

	// if (!FE.first && !e)
	// 	return;

	FE.first = false;
	// 首先隐藏掉section
	// _ss.hide();
	// _pp.removeClass().addClass('r-container');

	function _init(_idx) {
		var i = _g(_hArr),
			_top = _hArr[i],
			_this = $(_ss[_idx]);

		$(_this).css({
			'position': 'absolute',
			'left': _top.l + 'px',
			'top': _top.t + 'px'
		});

		if (e) {
			 _hArr[i].t += $(_this).height() + 20;
				_idx += 1;
				if (_idx < _ss.length)
					_init(_idx);
		} else {
			$(_this).show(100, function() {
				var _nh = $(this).height(),
					_ph = _p.height();

				if (_nh + $(this).offset().top > _ph)
					_p.height(_nh + $(this).offset().top);

				 _hArr[i].t += _nh + 20;
				_idx += 1;
				if (_idx < _ss.length)
					_init(_idx);
			});
		}
	}

	_init(_idx);

	// 取得当前的最小高度
	function _g(_hArr) {
		var i = 1, _t, _m = _hArr[0], idx = 0, len = _hArr.length;

		for (; i < len; i++) {
			_t = _hArr[i];
			if (_t.t < _m.t) {
				_m = _t;
				idx = i;
			}	
		}

		return idx;
	}
}

var FE = {
	/*
	 * @method placeholder 兼容不具备css3中placeholder属性的浏览器, 如ie < 9
	 * @param {object} element html元素
	 * */
	placeholder: function(element) {
	    var placeholder = element.getAttribute('placeholder') ||
	                    // 兼容ie6/7
	                      element.getAttributeNode('placeholder').nodeValue;

	    if (element && !("placeholder" in document.createElement("input")) && placeholder) {

	        var idLabel = element.id ;

	        if (!idLabel) {
	            idLabel = "placeholder_" + new Date().getTime();
	            element.id = idLabel;
	        }

	        var eleLabel = document.createElement("label");
	        eleLabel.htmlFor = idLabel;
	        eleLabel.style.position = "absolute";
	        eleLabel.style.marginLeft = "6px";
	        eleLabel.style.top = "0";
	        eleLabel.style.height = '14px';
	        eleLabel.style.color = "gray";
	        eleLabel.style.cursor = "text";
	        eleLabel.style.fontSize = "13px";
	        element.parentNode.insertBefore(eleLabel, element);
	        element.onfocus = function() {
	            eleLabel.innerHTML = "";
	        };
	        element.onblur = function() {
	            if (this.value === "") {
	                eleLabel.innerHTML = placeholder;  
	            }
	        };

	        if (element.value === "") {
	            eleLabel.innerHTML = placeholder;   
	        }
	    }        
	},
	first: true
}