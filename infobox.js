function InfoBox(){

	var onWriteText = function(distance, infoBox, text){};
	var actionOnNext = function(){};
	var element = $(".infoBox");
	var animate = new Animate();
	
	element.find("button").click(function(){
		actionOnNext();	
		hideBox();
	});
	
	function showBox(x){
		var xPer = ((x - element.width() / 2) / $(window).width()) * 100;
		element.css({'left': xPer + '%'});
		element.fadeIn(100);
	}	
	
	function hideBox(){
		element.hide().css({'left': 0});
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
		}
	}
}
