$(document).ready(function(){
	
	var initialCredits = 20000;
	var animationDuration = 2000;
	
	var gameState = {
		questionNumber: 0,
		credits: initialCredits
	};
	
	var worldmap = WorldMap();
	var infobox = InfoBox();
	var topbar = TopBar(initialCredits);
	var finishbox = FinishBox();
	var cities = c.slice(0);
	
	
	var startbox = $(".startBox");
	startbox.find("button").click(function(ev){
		randomPermutate();
		topbar.setQuestion(getCityQuestion());
		topbar.setPoints(gameState.credits);	
		startbox.hide();
	});
	
	worldmap.setOnClick(onMapClick);
	
	infobox.setActionOnNext(function(){
		if (gameState.credits < 0){
			topbar.clean();
			infobox.hideBox();
			finishbox.show(gameState.questionNumber - 1);
		} else {
			worldmap.clean();
			topbar.setQuestion(getCityQuestion());
			topbar.setPoints(gameState.credits);
		}
	});
	
	finishbox.actionOnStart(function(){	
		randomPermutate();
		gameState.questionNumber = 0;
		gameState.credits = initialCredits;
		
		worldmap.clean();
		topbar.clean();
		topbar.setQuestion(getCityQuestion());
		topbar.setPoints(gameState.credits);		
	});


	function getCityQuestion(){
		return (gameState.questionNumber + 1) + ". "+ cities[gameState.questionNumber].name;
	}
	
	function onMapClick(guessGeoCoord){
		if (startbox.is(":visible") || infobox.isVisible() || finishbox.isVisible()) return;
		
		var city = cities[gameState.questionNumber];
		var cityGeoCoord = {
			lat: city.latitude * Math.PI / 180, 
			lon: city.longitude * Math.PI / 180
		};
		
		var onTop = guessGeoCoord.lat < cityGeoCoord.lat;
		worldmap.showMarker(guessGeoCoord.lat, guessGeoCoord.lon, "Red", onTop);
		worldmap.showMarker(cityGeoCoord.lat, cityGeoCoord.lon, "Green", !onTop);
	
		
		worldmap.calculateCurveAndDraw(guessGeoCoord, cityGeoCoord, animationDuration);
		var distance = worldmap.calculateCurveLength(guessGeoCoord, cityGeoCoord);
		
		var resultBoxPosition = getResultBoxPositionX(guessGeoCoord.lon, cityGeoCoord.lon);
		infobox.showBox(resultBoxPosition);
		infobox.setDistanceAndAnimate(distance, city.name, city.country, animationDuration);
		
		gameState.credits = gameState.credits - Math.min(5001, distance);
		topbar.setPoints(gameState.credits, animationDuration);
		
		++gameState.questionNumber;
	}	
	
	function getResultBoxPositionX(lon1, lon2){
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
	
	function randomPermutate(){
		for (i=0; i < cities.length; i++){
			var random = Math.floor(Math.random() * i);
			
			var t = cities[random];
			cities[random] = cities[i];
			cities[i] = t;
		}
	}
		
});







