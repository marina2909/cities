function TopBar(credits){
	
	var element = $(".topBar");
	var animate = Animate();

	function setQuestion(text){
		element.find(".question").html(text);	
	}
	
	function setPoints(creditTo, duration){
		animate.stop();
		if (!duration) {
			element.find(".creditsLabel").html("Points left: ");
			element.find(".credits").html(creditTo);
		} else {
			var p = element.find(".credits");
			animate.run(credits, creditTo, duration, function(val){
				p.html(Math.round(val < 0 ? 0 : val));
			})
		}
		credits = creditTo;
	}
	
	function clean(){
		element.find(".question").empty();
		element.find(".creditsLabel").empty();
		element.find(".credits").empty();
	}
	
	return {
		setQuestion: setQuestion,
		setPoints: setPoints,
		clean: clean
	};
}