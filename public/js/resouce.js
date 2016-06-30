angular.module('meanMapApp.controllers',[]);

angular.module('meanMapApp.controllers').controller('ResourceController',function($scope, Entry) {
  var user = User.get({ id: $scope.id }, function() {
    console.log(User);
  }); // get() returns a single User

  var entries = User.query(function() {
    console.log(entries);
  }); //query() returns all the entries

  $scope.user = new User(); //You can instantiate resource class

  $scope.user.data = 'some data';

  User.save($scope.entry, function() {
    //data saved. do something here.
  }); //saves an entry. Assuming $scope.entry is the Entry object
});
