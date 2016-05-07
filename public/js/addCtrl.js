// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service.

var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

// var addCtrl = angular.module('addCtrl', ['geolocation']);
// addCtrl.controller('addCtrl', function($scope, $http, geolocation){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 33.898;
    $scope.formData.longitude = -118.015;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

    // Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    // Display coordinates in location textboxes rounded to three decimal points
    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

    // Display message confirming that the coordinates verified.
    $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){

    // Run the gservice functions associated with identifying coordinates
    $scope.$apply(function(){
    $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
    $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
    $scope.formData.htmlverified = "Nope (Thanks for spamming my map...)";
    });
});

// Create User Function
// ...


    // Creates a new user based on the form fields
    $scope.createScuba = function() {

        // Grabs all of the text box fields
        var scubaData = {
            name: $scope.formData.name,
            description: $scope.formData.description,

            favlang: $scope.formData.favlang,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/scubas', scubaData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.name = "";
                $scope.formData.description = "";
                // $scope.formData.age = "";
                $scope.formData.favlang = "";

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
