$(document).ready(function(){
	
	var POINTS = 20000;
	var state = {
		clicked: 1,
		questionNumber: 0,
		questionIndex: 0, 
		pointsLeft: POINTS
	};
	
	var animationDuration = 2000;
	var worldmap = WorldMap();
	var infoBox = InfoBox();
	var topbar = TopBar();
	var finish = Finish();
	
	$(".startBox button").click(function(ev){
		topbar.setQuestion(getCityQuestion());
		topbar.setPointsMsg(state.pointsLeft);	
		state.clicked = 0;	
		$(".startBox").hide();
	});
	
	worldmap.setOnClick(function(lat, lon){
		onMapClick(lat, lon);
	});
	
	infoBox.setActionOnNext(function(){
		if (finish.isFinished(state.pointsLeft)){
			topbar.clean();
			infoBox.hideBox();
			finish.finishGame(state.questionNumber);
		} else {
			worldmap.clean();
			topbar.setQuestion(getCityQuestion());
			topbar.stopPointsAnimate(state.pointsLeft);
			state.clicked = 0;
		}
	});
	
	finish.actionOnStart(function(){	
		state.questionNumber = 0;
		state.pointsLeft = POINTS;
		state.clicked = 0;
		
		worldmap.clean();
		topbar.clean();
		topbar.setQuestion(getCityQuestion());
		topbar.setPointsMsg(state.pointsLeft);		
	});


	function getCityQuestion(){
		state.randomQ = Math.floor(Math.random() * cities.length);
		state.questionNumber = ++state.questionNumber;
		var cityName = cities[state.randomQ].name;
		return state.questionNumber + ". Mark " + cityName;
	}
	
	function onMapClick(lat, lon){
		if (state.clicked == 1) return;
		
		var guessGeoCoord = {
			lat: lat, 
			lon: lon
		};
		
		var city = cities[state.randomQ];
		var cityGeoCoord = {
			lat: city.latitude * Math.PI / 180, 
			lon: city.longitude * Math.PI / 180
		};
		
		worldmap.showMarker(guessGeoCoord.lat, guessGeoCoord.lon, "Red");
		worldmap.showMarker(cityGeoCoord.lat, cityGeoCoord.lon, "Green");
		
		worldmap.calculateCurveAndDraw(guessGeoCoord, cityGeoCoord, animationDuration);
		var distance = worldmap.calculateCurveLength(guessGeoCoord, cityGeoCoord);
		
		var resultBoxPosition = getResultBoxPosition(guessGeoCoord.lon, cityGeoCoord.lon);
		infoBox.showBox(resultBoxPosition);
		infoBox.setDistanceAndAnimate(distance, city.name, city.country, animationDuration);
		
		var pointsBefore = state.pointsLeft;
		state.pointsLeft = state.pointsLeft - distance;
		topbar.setPointsAndAnimate(pointsBefore, state.pointsLeft, animationDuration);
		state.clicked = 1;	
		
	}	
	
	function getResultBoxPosition(lon1, lon2){
		var map = $(".worldMap");
		var mapWidth = map.width();
		var x1 = worldmap.getXFromLon(lon1);
		var x2 = worldmap.getXFromLon(lon2);
		var x = 0;
		if (Math.abs(x1-x2) > mapWidth/2){
			x = (x1+x2) / 2;
		} else {
			x = x1<x2 ? getMid(x1, x2, mapWidth) : getMid(x2, x1, mapWidth);
		}
		return (x + map.offset().left);
	}
	
	function getMid(xa, xb, width){
		return xa>width-xb ? xa/2 : (xb+width)/2;
	}
		
});







