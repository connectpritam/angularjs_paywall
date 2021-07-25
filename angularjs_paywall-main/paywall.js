// module app
var app = angular.module('paywall',  ['ngRoute'])

app.config(function ($routeProvider, $locationProvider)
 {  
    $locationProvider.html5Mode(true);
    $routeProvider.
    when('/', 
    {  
        resolve:{
            check:function($location,$rootScope){
                
                $rootScope.isAccountPresent=false
                if( $rootScope.isAccountPresent)
                {   
                    //$rootScope.isLoggedin='true'
                   $location.path('/home/')
                }
                else{
                    $location.path('/signIn/')
                }
               
            }
        },
        template: 'index.html'
     }) .
     when('/home/', 
     {  
         
          resolve:{
            remove:function(){
                console.log('entering resolve funciton');
                $("#modal").remove();  
                 $(".mainwrapper").css({"opacity":"1"})
            }
        }, 
        template: '',
          controller: 'homeController' 
      }) .
    when('/signUp/', 
   {  
        templateUrl: 'signUp.html',  
        controller: 'signUpController'  
    }) .
    when('/signIn/', 
    {  
         templateUrl: 'login.html',  
         controller: 'signInController'  
     }) .
    when('/subscription/', 
    {  
         templateUrl: 'subscription.html',  
        // controller: 'sampleController'  
     }).otherwise({
        redirectTo: '/',
    })
})  


// controllers
app.controller('signUpController', function ($scope,$rootScope,$location,$http,$httpParamSerializerJQLike) {
    $scope.isSuccess=false  
    $scope.phoneSucess=false
    $scope.emailSucess=false
    $scope.init=function() {
        //var signedIn=localStorage.getItem('signedIn')
            $(".mainwrapper").css({"cursor":"none","opacity":"0.2","background":"blue"})
       
    };
    
    if(localStorage.getItem('name')||localStorage.getItem('email')){

        $("#name").val(localStorage.getItem('name'))
        $("#signUpEmail").val(localStorage.getItem('email'))
    }
    
    $scope.emailCheck =function(){
       
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($scope.email)){
                
                $("#email_mismatch").hide()
                $('#phone_present').hide()
                $scope.emailSucess=true
                $('#signUp').attr('disabled',false)
            }
            else{
                $("#email_mismatch").show()  
            }
        }
    $scope.checkPhone= function (){
       
         if(/^[0-9]{10,10}$/.test($scope.phone)){
            $("#phone_mismatch").hide()
             $scope.phoneSucess=true
             $('#phone_present').hide()
             $('#signUp').attr('disabled',false)
         }
         else{  
            $("#phone_mismatch").show()
         }
       }

    $scope.subscriptionRoute=function(){

        //ajax call here to server to check for phone no already present 

        //on success ajax call to server to post form contents

        //route to subscription page
        $('.loader').show()
        $('#signUp').attr('disabled',true)
        $('#phone_present').hide()
        if( $scope.phoneSucess&& $scope.emailSucess){
           
           /*
            $http({
                url: 'https://uttarbangasambad.in/api/users/register.php',
                method: "POST",
                data:$.param({
                   
                    
                }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            */
            var configs = { cache: false };
            var payload = {
                name: $("#name").val(),
                email: $scope.email, 
                phone: $scope.phone
            };
      
      // The Method Post is generally used with a payload,
      configs.params = payload;
            $http.post('https://uttarbangasambad.in/api/users/register.php', null /* but normally payload */, configs)
            .then(function successCallback(response) {
                console.log(response)
                  if( response.status==200){
                    $('#signUp').attr('disabled',false)
                    $rootScope.isAccountPresent=true
                    $location.path('/subscription/')
                  }
                  else {
                    console.log(response.status)
                    $('#phone_present').show()
                    $('.loader').hide()
                }
                }, function errorCallback(response) {
                 alert('there was a problem in signing up.please try again')
                 $('.loader').hide()
                 $('#signUp').attr('disabled',false)
                });
           
        }
        else{
            $('#signUp').attr('disabled',true)
        }
       
    }
    })


app.controller('signInController',function ($scope,$rootScope,$location,$http){

    $scope.init=function() {
        //var signedIn=localStorage.getItem('signedIn')
        //$rootScope.isAccountPresent=false
        
        if(!$rootScope.isAccountPresent){
            $(".mainwrapper").css({"cursor":"none","opacity":"0.2","background":"blue"})
        } 
        else{
            $(".mainwrapper").css({"opacity":"1"})
        }
        
       
    };

    //ajax call to check is account present
   
    $scope.loginCheck=function(){  
        $rootScope.isSubscritonpresent=true
        $rootScope.isAccountPresent=false
        $('.loader').show()
        if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#uname').val()))){
                
            return  $("#email_mismatch").show()
        }
        $http({
            method: 'GET',
            url: 'https://uttarbangasambad.in/api/users/getuser.php?email='+$('#uname').val()
          }).then(function successCallback(response) {
              if(response.status==200){
                $rootScope.isAccountPresent=true
                $location.path('/subscription/')
                $('.loader').hide()
              }
           
            }, function errorCallback(response) {
              $location.path('/signUp/')
              
            });

    if($rootScope.isAccountPresent && !$rootScope.isSubscritonpresent ){
        $location.path('/subscription/')
        console.log('hi')
    }
    if($rootScope.isAccountPresent && $rootScope.isSubscritonpresent ){
        $rootScope.isAccountPresent=true
        localStorage.setItem('isLoggedIn','true')
        console.log('hello');
        $location.path('/home/')
    }
    
  }
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#uname").val(profile.getEmail())
    localStorage.setItem('name',profile.getName())
    localStorage.setItem('email',profile.getEmail())
  }
 
    
  

 
