function FinishBox(){

	var element = $(".finishBox");
	var actionOnStart = function(){};
	
	element.find("button").click(function(){
		element.hide();
		actionOnStart();
	});

	function show(totalCities){
		element.find(".totalCities").html(totalCities);
		element.show();
	}

	return {
		show: show,
		actionOnStart: function(handler){
			actionOnStart = handler;
		},
		isVisible: function(){
			return element.is(":visible");
		}
	}
}