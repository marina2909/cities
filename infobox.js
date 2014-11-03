function InfoBox(){

	var onWriteText = function(distance, infoBox, text){};
	var actionOnNext = function(){};
	var element = $(".infoBox");
	
	element.find("button").click(function(){
		actionOnNext();	
		element.hide().css({'left': 0});
		element.find(".city").empty();
		element.find(".distance").empty();
	});
	
	function showBox(x){
		var xPer = ((x - element.width() / 2) / $(window).width()) * 100;
		element.css({'left': xPer + '%'});
		element.fadeIn(100);
	}	
	
	function setDistanceAndAnimate(distance, city, duration){
		element.find(".city").html(city);
		var d = element.find(".distance");
		var startTime = new Date();
		var interval = setInterval(function(){ 
			var currentDistance = Math.round(distance * (new Date() - startTime) / duration);
			if (currentDistance > distance){
				currentDistance = distance;
				clearInterval(interval);
			}
			d.html(currentDistance);
		}, 50);
	}

	return {
		showBox: showBox,
		setDistanceAndAnimate: setDistanceAndAnimate,
		setActionOnNext: function(handler){
			actionOnNext = handler;
		}
	}
}
