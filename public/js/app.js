// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'geolocation', 'gservice', 'ngResource'])


    .controller('ExampleController', ['$scope', function($scope) {
      $scope.checkboxModel = {
       value1 : true,
       value2 : 'YES'
     };




    }]);

