// module _p
var _p = angular.module('paywall', [
    // our dependencies will be injected here
]);

// controllers
_p.controller('sampleController', function ($scope,$window,$sce,$location) {
    $scope.isSuccess=false  
    $scope.phoneSucess=false
    $scope.emailSucess=false

      $scope.emailCheck =function(){
       
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($scope.email)){
            
                $("#email_mismatch").hide()
                $scope.emailSucess=true
            }
            else{
                $("#email_mismatch").show()
                
            }
        }
     
      $scope.checkPhone= function (){
       
         if(/^[0-9]{10,10}$/.test($scope.phone)){
            $("#phone_mismatch").hide()
             $scope.phoneSucess=true
         }
         else{  
            $("#phone_mismatch").show()
         }
       }

     $scope.loginCheck=  function(){
        //e.preventDefault()
        var isAccountPresent=false
        var isSubscriptionDone=true
  if(isAccountPresent && isSubscriptionDone){
      $(".mainwrapper").css({"opacity":"1"})
      $("#overlay").fadeOut(500)
  }
  if(isAccountPresent && !isSubscriptionDone){
    $(".login").load('subscription.html')
  }
  else{
    $window.location.href = '/signUp.html';
    //$location.url('/SignUp.html')
    $("#name").val(localStorage.getItem('name'))
    $("#email").val(localStorage.getItem('email'))
  
   };
      
  }
  
  /*
  const form = document.getElementById('signupForm');
  if(form!==undefined){
  form.addEventListener('submit', e => {
   e.preventDefault();
   $scope.isSuccess= $scope.phoneSucess &&  $scope.emailSucess
   if($scope.isSuccess){
       console.log($scope.phone,$scope.email)
   }
   else{
       console.log('err')
   }
})
}
*/


});


gapi.load('auth2', function(){
    gapi.auth2.init()
})


$( document ).ready(function() {
    //var signedIn=localStorage.getItem('signedIn')
    var signedIn= 'false'
    if(signedIn==='false'){
        $(".mainwrapper").css({"cursor":"none","opacity":"0.2","background":"blue"})
    }   
   
});


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#uname").val(profile.getEmail())
    localStorage.setItem('name',profile.getName())
    localStorage.setItem('email',profile.getEmail())
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
    // This is null if the 'email' scope is not present.
    
  }
 
    
  

 
// controller-functions