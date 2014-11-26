Guess the City
=========================

Small game where you can have fun guessing cities positions on the map and learn something along the way. You can try this game at [Guess the cities](http://www.marinasovic.com/cities/).

Getting started
---------------

To play the game you don't need to build anything. Just open `index.html` in a browser and you're ready to go!  


Development
-----------
  
To calculate the shortest distance(great-circle distance) over the earth's surface **haversine formula** is used.

To draw the curve, **half-way point** is calculated along a great circle path between the two points until enough points is obtained to get good curve aproximation. Code uses **d3** to draw curve between guessed and real point.

`animate.js` is an object used for animations in the project. It can accept different function that will be used on each frame. 

Map is used from free source and it has Equirectangular projection. 

License
-------

MIT