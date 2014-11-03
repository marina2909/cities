function TopBar(){
	var element = $(".questionLine");
	
	function setText(text){
		element.find(".question").html(text);	
	}
	
	function setPoints(val){
		var p = element.find(".points").html(val);
	}
	
	function setPointsAndAnimate(val0, val1, duration, f){
		var p = element.find(".points");
		var t0 = new Date();
		var interval = setInterval(function(){ 
			var dT = new Date() - t0;
			var val = val0 + (val1 - val0) * dT / duration;
			if (dT > duration){
				val = val1;
				clearInterval(interval);
			}
			f();
			p.html(Math.round(val));
		}, 50);
	}
	
	return {
		setText: setText,
		setPointsAndAnimate: setPointsAndAnimate,
		setPoints: setPoints
	};
}