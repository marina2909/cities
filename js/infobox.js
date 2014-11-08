function InfoBox(){

	var element = $(".infoBox");
	var actionOnNext = function(){};
	var animate = Animate();
	
	element.find("button").click(function(){
		actionOnNext();	
		hideBox();
	});
	
	function showBox(xMid){
		var xPer = xMid / $(window).width() * 100;
		element.css({'left': 'calc('+ xPer + '% - '+ (element.width() / 2)+'px)'});
		element.fadeIn(500);
	}	
	
	function hideBox(){
		element.hide();
		element.find(".city").empty();
		element.find(".distance").empty();
	}
	
	function setDistanceAndAnimate(distance, city, country, duration){
		element.find(".city").html(city);
		element.find(".country").html("Country: "+country);
		var d = element.find(".distance");
		
		animate.run(0, distance, duration, function(val){
			d.html(Math.round(val));
		});
	}

	return {
		showBox: showBox,
		hideBox: hideBox,
		setDistanceAndAnimate: setDistanceAndAnimate,
		setActionOnNext: function(handler){
			actionOnNext = handler;
		},
		isVisible: function(){
			return element.is(":visible");
		}
	};
}
