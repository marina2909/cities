function WorldMap(){
	
	var element = $(".worldMap");
	var PI = Math.PI;
	var svg = d3.select(".worldMap svg");	
	var onMapClick = function(){};
	
	element.click(function (e) { 	
		var clickedPixelCoord = { x : e.clientX - element.offset().left, y : e.clientY - element.offset().top};
		var clickedGeoCoord = getGeoFromPixel(clickedPixelCoord);
		onMapClick(clickedGeoCoord);
	});

	function getGeoFromPixel(t){
		return {
			lon : 2 * PI * t.x / element.width() - PI,
			lat : PI / 2 - PI * t.y / element.height()
		};
	}
	
	function getSvgXFromLon(lon){
		return (lon + PI) * svg[0][0].viewBox.baseVal.width / (2 * PI);
	};
	
	function getSvgYFromLat(lat){
		return (PI / 2 - lat) * svg[0][0].viewBox.baseVal.height / PI ;
	};
	
	function getXFromLon(lon){
		return (lon + PI) * element.width() / (2 * PI);
	};
	
	function getYFromLat(lat){
		return (PI / 2 - lat) * element.height() / PI ;
	};
	
	function calculateCurveAndDraw(p1, p2, duration){
		var PI = Math.PI;
		var dLon = p1.lon - p2.lon;
		
		if (Math.abs(dLon) > PI){
			
			// 1st part of curve
			var sign = dLon >= 0 ? 1 : -1;
			var p22 = {
				lon: p2.lon + 2*PI*sign,
				lat: p2.lat
			};
			var curvePoints = createCurvePoints(p1, p22); // add curve points
			drawCurve(curvePoints, duration);
		
			// 2nd part of curve
			var p11 = {
				lon: p1.lon - 2*PI*sign,
				lat: p1.lat
			};
			curvePoints = createCurvePoints(p11, p2); // add curve points
			drawCurve(curvePoints, duration);

		} else {
			var curvePoints = createCurvePoints(p1, p2); // add curve points
			drawCurve(curvePoints, duration);
		}

	}

	function createCurvePoints(p1, p2){
		var points = [p1];
		
		function calculateMidPoint(p1, p2){
			var dLon = p2.lon - p1.lon;
			var Bx = Math.cos(p2.lat) * Math.cos(dLon);
			var By = Math.cos(p2.lat) * Math.sin(dLon);
			var latMid = Math.atan2(Math.sin(p1.lat) + Math.sin(p2.lat),
								Math.sqrt((Math.cos(p1.lat) + Bx) * 
								(Math.cos(p1.lat) + Bx) + By * By )); 
			var lonMid = p1.lon + Math.atan2(By, Math.cos(p1.lat) + Bx);
			return {
				lat: latMid,
				lon: lonMid
			};
		}	
		
		var addPoints = function(p1, p2, n){
			if (n < 0) return;

			var p3 = calculateMidPoint(p1, p2);
			addPoints(p1, p3, n-1);
			points.push(p3);
			addPoints(p3, p2, n-1);		
		};	
		
		addPoints(p1, p2, 5); // add mid points
		points.push(p2); //add last point
		return points;
	}

	function drawCurve(lineData, duration){
		var lineFunction = d3.svg.line()
							.x(function(d) { return getSvgXFromLon(d.lon);})
							.y(function(d) { return getSvgYFromLat(d.lat);})
							.interpolate("basis");


		var lineGraph = svg.append("path")
						.attr("d", lineFunction(lineData))
						.attr("stroke", "#0c2766")
						.attr("stroke-width", 2)
						.attr("fill", "none")
						.attr("clip-path", "url(#clip)");

		var totalLength = lineGraph.node().getTotalLength();
		lineGraph.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)
				.transition()
				.duration(duration)
				.attr("stroke-dashoffset", 0);
	}

	function calculateCurveLength(p1, p2){
		var R = 6371; // km
		var dLat = p2.lat - p1.lat;
		var dlon = p2.lon - p1.lon;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(p1.lat) * Math.cos(p2.lat) *
				Math.sin(dlon/2) * Math.sin(dlon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		return Math.round(d);
	}
	
	function showMarker(lat, lon, color, onTop){
		var marker = $(".marker" + color);
		var topY = getYFromLat(lat) / element.height() * 100;
		var leftX = getXFromLon(lon) / element.width() * 100;
		var topPer = 'calc(' + topY  + '% - ' + (marker.height() - 1) + 'px)';
		var leftPer = 'calc(' + leftX + '% - ' + (marker.width() / 2 -1) + 'px)';
		marker.css({top: topPer, left: leftPer, 'margin-top': '-20%', 'zIndex': +onTop+1});
		marker.show().animate({'margin-top': 0},'fast');
	
	}
	
	function clean(){
		svg.selectAll("path").remove();
		$(".markerRed").hide().offset({top: 0, left: 0});
		$(".markerGreen").hide().offset({top: 0, left: 0});
	}

	return {
		calculateCurveAndDraw: calculateCurveAndDraw,
		calculateCurveLength: calculateCurveLength,
		showMarker: showMarker,
		setOnClick: function(handler){
			onMapClick = handler;
		},
		getXFromLon: getXFromLon,
		clean: clean
	};
} 
