function Finish(){

	var element = $(".finishBox");
	var actionOnStart = function(){};
	
	element.find("button").click(function(){
		element.hide();
		actionOnStart();
	});

	function finishGame(totalCities){
		element.find(".totalCities").html(--totalCities);
		element.show();
	}
	
	function isFinished(points){
		if (points < 0){
			return true;
		}	
	}

	return {
		finishGame: finishGame,
		isFinished: isFinished,
		actionOnStart: function(handler){
			actionOnStart = handler;
		}
	}
}