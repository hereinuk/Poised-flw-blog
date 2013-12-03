$(function() {
	var oA = $('div.sub-header ul li a');
	
	// placeholder
	FE.placeholder(document.getElementById('query-txt'));

	oA.click(function() {
		oA.each(function(i) {
			$(this).removeClass('active');
			$('div.item-' + (i + 1)).hide();
		});
		$(this).addClass('active');
		$('div.item-' + (this.innerHTML)).show();

		return false;
	});

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
		$("body, html").animate({
			scrollTop: $('#o-doc').offset().top
		}, 1000);
	});

	$(window).on('scroll', function() {
		// console.log('scroll!!!');
		var _d = $('body').scrollTop() || $('html').scrollTop(),
			_t = $('#totop').parent();

		if (_d >= 623 && _t.css('display') == "none") {
			_t.show();
		} else if (_d < 623 && _t.css('display') == "block") {
			_t.hide();
		}
	});

	$('#totop').on('click', function() {
		$('body').animate({
			scrollTop: 0
		}, 1000);

		return false;
	});
});

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
	}
}