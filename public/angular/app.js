
var myApp = angular.module('myApp',['ngMap','ngRoute','ui.materialize']).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', 
    {
      templateUrl: 'angular/controllers/home/view.html', 
      controller: 'homeController'
    });
  
  $routeProvider.when('/call', 
    {
      templateUrl: 'angular/controllers/call/view.html', 
      controller: 'callController'
    })
    .when('/call/help', 
    {
      templateUrl: 'angular/controllers/location-wizard/view.html', 
      controller: 'wizardController'
    })
    .when('/map/active', 
    {
      templateUrl: 'angular/controllers/city/view.html', 
      controller: 'cityController'
    })
    .when('/list/active', 
    {
      templateUrl: 'angular/controllers/city-list/view.html', 
      controller: 'cityListController'
    }).when('/province/:p', 
    {
      templateUrl: 'angular/controllers/province/view.html', 
      controller: 'provinceController'
    })
    .when('/city/list/:p/:c', 
    {
      templateUrl: 'angular/controllers/city-list/view.html', 
      controller: 'cityListController'
    })
    .when('/city/:p/:c', 
    {
      templateUrl: 'angular/controllers/city/view.html', 
      controller: 'cityController'
    })

   .otherwise({
        redirectTo: '/'
      });

 
}]);

myApp.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});
// This is a function that bootstraps AngularJS, which is called from later code
function bootstrapAngular() {
    console.log("Bootstrapping AngularJS");
    // This assumes your app is named "app" and is on the body tag: <body ng-app="app">
    // Change the selector from "body" to whatever you need
    var domElement = document.querySelector('body');
    // Change the application name from "app" if needed
    angular.bootstrap(domElement, ['myApp']);
}


function loadScript(src,callback){
  
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(callback)script.onload=callback;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.src = src;
}
function loadStyle(src,callback){
  
  var script = document.createElement("link");
  script.rel = "stylesheet";
  if(callback)script.onload=callback;
  document.getElementsByTagName("head")[0].appendChild(script);
  script.href = src;
}

function initialize(){
  console.log('initialize');
}
  
function loadAsync(){
   
  
  loadScript('http://maps.googleapis.com/maps/api/js?v=3&sensor=false&callback=initialize',
              function(){
                console.log('google-loader has been loaded, but not the maps-API ');
              });

    bootstrapAngular();
}
$(document).ready(function(){
    new WOW().init();
    // This is my preferred Cordova detection method, as it doesn't require updating.
    if (document.URL.indexOf( 'http://' ) === -1 
            && document.URL.indexOf( 'https://' ) === -1) {
        console.log("URL: Running in Cordova/PhoneGap");
        document.addEventListener("deviceready", loadAsync, false);
    } else {
        console.log("URL: Running in browser");
        loadAsync();
    }


});

