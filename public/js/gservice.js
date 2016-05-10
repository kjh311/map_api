// Weather API
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=e43c18b3b50f85a765b1c8ee556b0ebe


// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
 .factory('gservice', function($rootScope, $http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var skateboarding_locations = [];
        var scuba_locations = [];
        var hiking_locations = [];
        var camping_locations = [];
        var surfing_locations = [];
        var photography_locations = [];
        var mountain_biking_locations = [];
        var basketball_locations = [];
        var brewery_locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 36.598;
        var selectedLong = -99.141;

        // Handling Clicks and location selection
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;




        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){

            // Clears the holding array of locations
            skateboarding_locations = [];
            scuba_locations = [];
            hiking_locations = [];
            camping_locations = [];
            surfing_locations = [];
            photography_locations = [];
            mountain_biking_locations = [];
            basketball_locations = [];
            brewery_locations = [];



            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/users').success(function(response){

                // Convert the results into Google Map Format
                skateboarding_locations = convertSkateboardingToMapPoints(response);
                scuba_locations = convertScubaToMapPoints(response);
                hiking_locations = convertHikingToMapPoints(response);
                camping_locations = convertCampingToMapPoints(response);
                surfing_locations = convertSurfingToMapPoints(response);
                photography_locations = convertPhotographyToMapPoints(response);
                mountain_biking_locations = convertMountainBikingToMapPoints(response);
                basketball_locations = convertBasketballToMapPoints(response);
                brewery_locations = convertBreweryToMapPoints(response);
                console.log('users gotten from db gservice.js');
                // Then initialize the map.
                initialize(latitude, longitude);
                // console.log('innitialize map gservice.js');
            }).error(function(){});



        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of SKATEBOARDING users into map points
        var convertSkateboardingToMapPoints = function(response){

            console.log('convert db users into map icons gservice.js');
            // Clear the skateboarding_locations holder
            var skateboarding_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                photo = user.photo;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger" ng-model="formData.id">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).



// This is where to filter which markers get shown
                if(usertype === "Skateboarding"){
                skateboarding_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
                    photo: user.photo,
            });
        }
    }

// location is now an array populated with records in Google Maps format
        return skateboarding_locations;
    };

        // Convert a JSON of SCUBA users into map points
        var convertScubaToMapPoints = function(response){
            console.log('convert db scuba into map icons gservice.js');
            // Clear the scuba_locations holder

            var scuba_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                // var activity_locations = skateboarding_locations + scuba_locations;
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '<h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button></a></h4><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Scuba"){
                scuba_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }

// location is now an array populated with records in Google Maps format
        return scuba_locations;
    };


        // Convert a JSON of HIKING users into map points
        var convertHikingToMapPoints = function(response){
            console.log('convert db hiking into map icons gservice.js');
            // Clear the scuba_locations holder

            var hiking_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Hiking"){
                hiking_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }



// location is now an array populated with records in Google Maps format
        return hiking_locations;
    };

        // Convert a JSON of CAMPING users into map points
        var convertCampingToMapPoints = function(response){
            console.log('convert db camping into map icons gservice.js');
            // Clear the scuba_locations holder

            var camping_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Camping"){
                camping_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }

// location is now an array populated with records in Google Maps format
        return camping_locations;
    };

        // Convert a JSON of SURFING users into map points
        var convertSurfingToMapPoints = function(response){
            console.log('convert db camping into map icons gservice.js');
            // Clear the scuba_locations holder

            var surfing_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Surfing"){
                surfing_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }

// location is now an array populated with records in Google Maps format
        return surfing_locations;
    };

        // Convert a JSON of CAMPING users into map points
        var convertPhotographyToMapPoints = function(response){
            console.log('convert db Photography into map icons gservice.js');
            // Clear the scuba_locations holder

            var photography_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Photography"){
                photography_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }

// location is now an array populated with records in Google Maps format
        return photography_locations;
    };

        // Convert a JSON of CAMPING users into map points
        var convertMountainBikingToMapPoints = function(response){
            console.log('convert db mountain biking into map icons gservice.js');
            // Clear the scuba_locations holder

            var mountain_biking_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Mountain_Biking"){
                mountain_biking_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });


     }
        }

// location is now an array populated with records in Google Maps format
        return mountain_biking_locations;
    };

        // Convert a JSON of CAMPING users into map points
        var convertBasketballToMapPoints = function(response){
            console.log('convert db Basketball into map icons gservice.js');
            // Clear the Basketball_locations holder

            var basketball_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Basketball"){
                basketball_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }

// location is now an array populated with records in Google Maps format
        return basketball_locations;
    };

        // Convert a JSON of CAMPING users into map points
        var convertBreweryToMapPoints = function(response){
            console.log('convert db camping into map icons gservice.js');
            // Clear the scuba_locations holder

            var brewery_locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                usertype = user.type;
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h2> ' + user.name + '</h2>' +
                    '<h4> ' + user.description + '</h4>' +
                    '<img style="width:300px;maxheight:300px;border-radius:20px;" src="' + user.photo + '">' +
                    '</br></br><h4><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></a></h4></br><button type="button" class="btn btn-info">EDIT Location</button></br></br><button type="button" class="btn btn-danger">DELETE Location</button>'
                    // '<button type="button" class="btn btn-primary"><button type="button" class="btn btn-primary directions">DIRECTIONS To:</button></button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

// This is where to filter which markers get shown
                if(usertype === "Brewery"){
                brewery_locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    usertype: user.type,
                    username: user.username,
                    gender: user.description,
            });

     }
        }

// location is now an array populated with records in Google Maps format
        return brewery_locations;
    };

// var addSk8 = document.getElementById("sk8butt");
    var findSk8Locals = function(){


    // var findSk8Locals = skateboarding_locations.forEach(function(n, i){
        document.getElementById("sk8butt").style.color = "red";
};
        // var icon = {
        //     url: "/images/skate3.png"
        // };
        // var marker = new google.maps.Marker({
        //     position: n.latlon,
        //     animation: google.maps.Animation.DROP,
        //     map: map,
        //     title: "Big Map",
        //     icon: icon,

        // });

        // // For each marker created, add a listener that checks for clicks
        // google.maps.event.addListener(marker, 'click', function(e){

        //     // When clicked, open the selected marker's message
        //     currentSelectedMarker = n;
        //     n.message.open(map, marker);
        // });
    // });




// Initializes the map
var initialize = function(latitude, longitude) {
    console.log('initialize map gservice.js');
    // Uses the selected lat, long as starting point
    var myLatLng = {lat: selectedLat, lng: selectedLong};

    // If map has not been created already...
    if (!map){

        // Create a new map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: myLatLng
        });
    }


// TRYING TO MAKE CERTAIN MAP MARKERS APPEAR ON COMMAND
    // Loop through each SKATEBOARDING location in the array and place a marker
    skateboarding_locations.forEach(function(n, i){
        var icon = {
            url: "/images/skate3.png"
        };
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,

        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });


// Code to reload the map
 // google.maps.event.addDomListener(window, 'load',
 //    googleMapService.refresh(selectedLat, selectedLong));


    // Loop through each SCUBA location in the array and place a marker
    scuba_locations.forEach(function(n, i){

        var icon = "/images/snorkel4.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    hiking_locations.forEach(function(n, i){

        var icon = "/images/hiking2.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    camping_locations.forEach(function(n, i){

        var icon = "/images/camping.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    surfing_locations.forEach(function(n, i){

        var icon = "/images/surf4.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    photography_locations.forEach(function(n, i){

        var icon = "/images/camera6.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    mountain_biking_locations.forEach(function(n, i){

        var icon = "/images/bike2.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    basketball_locations.forEach(function(n, i){

        var icon = "/images/basket.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });

    brewery_locations.forEach(function(n, i){

        var icon = "/images/beer3.png"
        // console.log(username);
        var marker = new google.maps.Marker({
            position: n.latlon,
            animation: google.maps.Animation.DROP,
            map: map,
            title: "Big Map",
            icon: icon,
        });

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });


    // Set initial location as a bouncing red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
        position: initialLocation,
        // animation: google.maps.Animation.DROP,
        map: map,
        icon: 'https://www.teawamutu.nz/town/2/images/icons/iconMe_N.png'
    });
    lastMarker = marker;



    // Bouncing Red Marker Logic
// ...

// Function for moving to a selected location
map.panTo(new google.maps.LatLng(latitude, longitude));

// Clicking on the Map moves the bouncing red marker
google.maps.event.addListener(map, 'click', function(e){

    var marker = new google.maps.Marker({
        position: e.latLng,
        // animation: google.maps.Animation.DROP,
        map: map,
        icon: 'http://mapbullet.com/map/images/find.png'
    });

    // When a new spot is selected, delete the old red bouncing marker
    if(lastMarker){
        lastMarker.setMap(null);
    }

    // Create a new red bouncing marker and move to it
    lastMarker = marker;
    map.panTo(marker.position);
    // Update Broadcasted Variable (lets the panels know to change their lat, long values)
googleMapService.clickLat = marker.getPosition().lat();
googleMapService.clickLong = marker.getPosition().lng();
$rootScope.$broadcast("clicked");
});




};

// Refresh the page upon window load. Use the initial latitude and longitude
// google.maps.event.addDomListener(window, 'load',
//     googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
});
