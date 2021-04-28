// module _p
var _p = angular.module('paywall', [
    // our dependencies will be injected here
]);

// controllers
_p.controller('sampleController', function ($scope) {
    $scope.isSuccess=false
    $scope.passSucess=false
    $scope.passStrengthSucess=false
    $scope.phoneSucess=false
    $scope.emailSucess=false
   $scope.checkPass= function (){
       var d1=document.getElementById('pwd_mismatch')
        if($scope.pass!==$scope.confirmpass){
            d1.style.display="block"
        }
        else{
            d1.style.display="none"
            $scope.passSucess=true
        }
      }
    $scope.check_pass_strength=function(){
        var d1=document.getElementById('pass_mismatch')
        if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($scope.pass)){
            d1.style.display="none"
            $scope.passStrengthSucess=true
        }
        else{
            d1.style.display="block"
        }
    }
      $scope.emailCheck =function(){
        var d1=document.getElementById('email_mismatch')
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($scope.email)){
                d1.style.display="none"
                $scope.emailSucess=true
            }
            else{
                d1.style.display="block"
            }
        }
      $scope.checkPhone= function (){
        var d1=document.getElementById('phone_mismatch')
       
         if(/^[0-9]{10,10}$/.test($scope.phone)){
             d1.style.display="none"
             $scope.phoneSucess=true
         }
         else{  
             d1.style.display="block"
         }
       }
       
       console.log($scope.isSuccess)
       const form = document.getElementById('signupForm');
       form.addEventListener('submit', e => {
        e.preventDefault();
        $scope.isSuccess= $scope.phoneSucess &&  $scope.passSucess &&  $scope.passStrengthSucess &&  $scope.emailSucess
        if($scope.isSuccess){
            console.log($scope.phone,$scope.pass,$scope.email)
        }
        else{
            console.log('err')
        }
    });
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