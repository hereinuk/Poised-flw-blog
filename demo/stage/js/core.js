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

	$('div.item').hover(function() {
		$('div.pin-logo', $(this)).stop().show().animate({
			'right': 10,
			'top': 0
		});
		$('div.item-corner', $(this)).stop().show().animate({
			"border-left-width": 55,
			"border-bottom-width": 35
		});
	}, function() {
		$('div.pin-logo', $(this)).stop().animate({
			'right': -10,
			'top': -20
		}).hide();
		$('div.item-corner', $(this)).stop().animate({
			"border-left-width": 1,
			"border-bottom-width": 1
		}).hide();
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