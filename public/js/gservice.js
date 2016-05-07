// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
 .factory('gservice', function($rootScope, $http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

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
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/users').success(function(response){

                // Convert the results into Google Map Format
                locations = convertToMapPoints(response);
                console.log('users gotten from db gservice.js');
                // Then initialize the map.
                initialize(latitude, longitude);
                // console.log('innitialize map gservice.js');
            }).error(function(){});



        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(response){
            console.log('convert db users into map icons gservice.js');
            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];
                username = user.name;
                description = user.description;
                // Create popup windows for each record
                var  contentString =
                    '<p><h3> ' + user.name + '</h3>' +
                    ' ' + user.description +
                    '</br></br><a href="https://www.google.com/maps/dir/Current+Location/'+ user.location[1] + ',' + user.location[0] + '" target="blank">Directions</a>'
                    // '<button type="button" class="btn btn-primary">Directions</button>'
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

                // This is where to filter which markers get shown
                if(username === "Venice Skate Park"){


                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.description,
            });
                }

        }
        // location is now an array populated with records in Google Maps format

        return locations;
    };

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

    // Loop through each location in the array and place a marker
    locations.forEach(function(n, i){
        var icon = "http://cdn.shopify.com/s/files/1/0262/6741/files/skateboard_icon__thumb_ad7dd2c2-3f4e-48cd-9803-725af55aabd8_small.png?17131587700476465343"
        console.log(username);
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
        animation: google.maps.Animation.DROP,
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
        animation: google.maps.Animation.DROP,
        map: map,
        icon: 'http://www.westcoastfish.co.uk/wp-content/uploads/2013/05/Map-Marker.png'
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
google.maps.event.addDomListener(window, 'load',
    googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;
});
