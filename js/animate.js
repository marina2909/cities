function Animate(){
	var interval;
	
	function run(val0, val1, duration, f){
		var t0 = new Date();
		interval = setInterval(function(){ 
			var dT = new Date() - t0;
			var val = val0 + (val1 - val0) * dT / duration;
			if (dT > duration){
				val = val1;
				clearInterval(interval);
			}
			f(val);
		}, 50);
	}
	
	function stop(){
		clearInterval(interval);
	}
	
	return {
		run: run,
		stop: stop
	}
}