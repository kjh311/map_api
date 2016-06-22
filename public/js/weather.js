// forecast.io api key
// 3230f84c79e173d82bf07aa89fa056b8



var weather = angular.module('weather', ['geolocation', 'gservice']);
addCtrl.controller('weather', function($scope, $http, $rootScope, geolocation, gservice){


  function b(){

            var apiKey = '3230f84c79e173d82bf07aa89fa056b8/34.291852';
            var url = 'https://api.forecast.io/forecast/';
            var lati = 0;
            var longi = 0;
            var data;

            $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?", function(data) {
              $('#weather').innerHTML('and the weather is: ' + data[4].temperature);
            });
        }

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;


    // Set initial coordinates to the center of the US
    // $scope.formData.latitude = 33.898;
    // $scope.formData.longitude = -118.015;

// Weather API
// http://api.opennweathermap.org/data/2.5/weather?lat=35&lon=139&appid=e43c18b3b50f85a765b1c8ee556b0ebe
// weather API key
var APPID = "e43c18b3b50f85a765b1c8ee556b0ebe";

// get lost, api key!!!
// var APPID = '<%= process.env.WEATHERAPIKEY' %>;
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

// send GET request for a zip code
function updateByZip(zip) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "zip=" + zip +
    "&APPID=" + APPID;
  sendRequest(url);
  console.log("updated by zip");
}

function updateByGeo(lat, lon) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + laty +
    "&lon=" + longy +
    "&APPID=" + APPID;
  sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
    var data = JSON.parse(xmlhttp.responseText);
    var weather = {};
    weather.icon = data.weather[0].id;
    weather.humidity = data.main.humidity;
    weather.wind = data.wind.speed;
    weather.direction = degreesToDirection(data.wind.deg);
    weather.loc = data.name;
    weather.temp = K2F(data.main.temp);
    update(weather);
    console.log('weather gotten from api');
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function degreesToDirection(degrees) {
  var range = 360/16;
  var low = 360 - range/2;
  var high = (low + range) % 360;
  var angles = [ "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  for ( i in angles ) {

    if( degrees >= low && degrees < high)
      return angles[i];

    low = (low + range) % 360;
    high = (high + range) % 360;
  }
}

function K2F(k) {
  return Math.round(k*(9/5)-459.67);
}

function update(weather) {
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "imgs/codes/" + weather.icon + ".png";
  console.log(icon.src);
}

// function showPosition(position) {
//   updateByGeo(position.coords.latitude, position.coords.longitude);
// }

window.onload = function (){
  temp = document.getElementById("temperature");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

  // if(navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  //   var zip = window.prompt("Could not discover your location. What is your zip code?");
  //     }
// updateByZip("91342");

// where user's location should be
// updateByGeo(pos.coords.latitude,pos.coords.longitude);
}
});
