function TopBar(){
	var element = $(".topBar");
	var animate = new Animate();
	
	function setQuestion(text){
		element.find(".question").html(text);	
	}
	
	function setPointsMsg(val){
		element.find(".pointsLeft").html("Points left: ");
		element.find(".points").html(val);
	}
	
	function setPointsAndAnimate(val0, val1, duration){
		var p = element.find(".points");
		animate.run(val0, val1, duration, function(val){
			p.html(Math.round(val < 0 ? 0 : val));
		})
	}
	
	function stopPointsAnimate(val){
		animate.stop();
		setPointsMsg(val);
	}
	
	function clean(){
		element.find(".question").empty();
		element.find(".pointsLeft").empty();
		element.find(".points").empty();
	}
	
	return {
		setQuestion: setQuestion,
		setPointsAndAnimate: setPointsAndAnimate,
		stopPointsAnimate: stopPointsAnimate,
		setPointsMsg: setPointsMsg,
		clean: clean
	};
}