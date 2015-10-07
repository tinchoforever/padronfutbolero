myApp.controller('callController', function(lockSmithsFactory, $scope,$rootScope, $routeParams, $location, $http){

	$scope.position= false;
	$scope.active= false;
	$scope.next= false;


	$rootScope.close= function(){
    $rootScope.waitingLocation = false;
    onLocationError();
  };



  var onLocationError = function(e){
    $rootScope.waitingLocation= false;
    $location.path('/call/help');
  }
  var onLocationFound = function(position){
    $rootScope.waitingLocation= false;
      $scope.$apply(function(){
        $scope.position = position;
        console.log(position);
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var imageSize = Math.round($(window).width() / 2);
        //TODO: Create algorithm.
        var imageHeight = Math.round($(window).height() / 3);
        var formatedSize = imageSize + "x" + imageHeight;
        var googleMaps = "https://maps.googleapis.com/maps/api/staticmap?center="+ lat + ","+ lon + "&zoom=14&size=" + formatedSize;
        googleMaps+= "&markers=color:blue%7Clabel:C%7C" + lat +  "," + lon;
        var streetView = "https://maps.googleapis.com/maps/api/streetview?size=" + formatedSize+ "&location=" + lat + ","+ lon + "&heading=100"
        $scope.googleMaps = googleMaps;
        $scope.streetView = streetView;
        lockSmithsFactory.forLocation(position.coords, function(result){ 
          //Set Place position
          $rootScope.activePlaces = $scope.closer = result;
          $rootScope.currentPos = $scope.position.coords;
          
          var c =  $scope.active = result[0];
          
          try {
            var lat = c.latitude;
            var lon = c.longitude;
            c.googleMaps = "https://maps.googleapis.com/maps/api/staticmap?center="+ lat + ","+ lon + "&zoom=14&size=" + formatedSize;
            c.googleMaps+= "&markers=icon:http://buscocerrajero.herokuapp.com/www/images/marker-small.png%7C" + lat +  "," + lon;
            c.streetView = "https://maps.googleapis.com/maps/api/streetview?size=" + formatedSize+"&location=" + lat + ","+ lon + "&heading=100"
            

            //Then set location
            lat = $scope.position.coords.latitude;
            lon = $scope.position.coords.longitude;
            c.googleMaps+= "&markers=color:red%7Clabel:C%7C" + lat +  "," + lon;
          }
          catch(e){
            console.log(e);
            onLocationError();
          }
          $scope.active = c ;
          
        });
      });
    };

$rootScope.waitingLocation= true;
if (navigator.geolocation){
    $rootScope.waitingLocation= true;
    navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
  }else {
    
    alert("no location found");
  }


  
});
