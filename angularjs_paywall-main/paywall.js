// module _p
var _p = angular.module('paywall', [
    // our dependencies will be injected here
]);

// controllers
_p.controller('sampleController', function ($scope) {
    $scope.name = 'Arijit';
});
gapi.load('auth2', function(){
    gapi.auth2.init()
})
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
// controller-functions