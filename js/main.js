$(document).ready(function(){
	
	var initialCredits = 20000;
	var animationDuration = 2000;
	
	var gameState = {
		questionNumber: 0,
		credits: initialCredits,
		city: null
	};
	
	
	var worldmap = WorldMap();
	var infobox = InfoBox();
	var topbar = TopBar(initialCredits);
	var finishbox = FinishBox();
	
	var startbox = $(".startBox");
	startbox.find("button").click(function(ev){
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
		gameState.questionNumber = 0;
		gameState.credits = initialCredits;
		
		worldmap.clean();
		topbar.clean();
		topbar.setQuestion(getCityQuestion());
		topbar.setPoints(gameState.credits);		
	});


	function getCityQuestion(){
		var randomQ = Math.floor(Math.random() * cities.length);
		gameState.city = cities[randomQ];
		return (++gameState.questionNumber) + ". "+ gameState.city.name;
	}
	
	function onMapClick(guessGeoCoord){
		if (startbox.is(":visible") || infobox.isVisible() || finishbox.isVisible()) return;
		
		var city = gameState.city;
		var cityGeoCoord = {
			lat: city.latitude * Math.PI / 180, 
			lon: city.longitude * Math.PI / 180
		};
		
		worldmap.showMarker(guessGeoCoord.lat, guessGeoCoord.lon, "Red");
		worldmap.showMarker(cityGeoCoord.lat, cityGeoCoord.lon, "Green");
		
		worldmap.calculateCurveAndDraw(guessGeoCoord, cityGeoCoord, animationDuration);
		var distance = worldmap.calculateCurveLength(guessGeoCoord, cityGeoCoord);
		
		var resultBoxPosition = getResultBoxPositionX(guessGeoCoord.lon, cityGeoCoord.lon);
		infobox.showBox(resultBoxPosition);
		infobox.setDistanceAndAnimate(distance, city.name, city.country, animationDuration);
		
		gameState.credits = gameState.credits - distance;
		topbar.setPoints(gameState.credits, animationDuration);
		
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
		
});







