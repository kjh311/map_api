// addCtrl

// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.

var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){




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




 // google.maps.event.addDomListener(window, 'load',
 //    googleMapService.refresh(selectedLat, selectedLong));

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};


    // Display coordinates in location textboxes rounded to three decimal points
    longy = $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    laty = $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    geolatlong = laty + "," + longy;
    console.log("coords are " + laty + "," + longy);
    // Display message confirming that the coordinates verified.
    $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

    // updates weather info for user's current location
    updateByGeo(coords.latitude,coords.longitude);

    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});


    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){
        console.log('icon moved addCtrl.js');
    // Run the gservice functions associated with identifying coordinates
    $scope.$apply(function(){
    $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
    $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
    $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
    });
});


// $scope.button = function() {
//   alert('button works');
// };


// Create User Function
    // Creates a new user based on the form fields
    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            type: $scope.formData.type,
            name: $scope.formData.name,
            description: $scope.formData.description,
            website: $scope.formData.website,
            photo: $scope.formData.photo,
            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {
                console.log('new user created addCtrl.js');

                // Once complete, clear the form (except location)
                $scope.formData.type = "";
                $scope.formData.name = "";
                $scope.formData.description = "";
                // $scope.formData.description = "";
                $scope.formData.photo = "";


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

            // Logic for Clearing the FOrm
// ...

// Refresh the map with new data
gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    };

});


