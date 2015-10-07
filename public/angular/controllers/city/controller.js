myApp.controller('cityController', function(lockSmithsFactory,$compile, $scope,$rootScope, $routeParams, $location, $http){
	$rootScope.main = true;
	$scope.province = $routeParams.p;
	$scope.city = $routeParams.c;
	if ($routeParams.p && $routeParams.c){
		lockSmithsFactory.forCity($routeParams.p,$routeParams.c, function(places){
			$scope.places = places;
			$scope.center = places[0]
			console.log(places);
		});
	}
	else{
		$scope.places  = $rootScope.activePlaces;
		$scope.currentPos  = $rootScope.currentPos;
		$scope.center = $scope.currentPos;
	}
	$scope.$on('mapInitialized', function(evt, map) {
    	$scope.map = map;
	    
	});
	$scope.showInfo= function(pos,item){
		console.log(pos,item);
		$scope.active = pos;
		var infowindow = new google.maps.InfoWindow({position: pos.latLng});
        
        var x = '<div><h5>{{foo.nombre || foo.razon_social}}</h5>';
        x+= '<h6>{{foo.direccion}}</h6>';
        x+= '<h6><strong><a ng-href="tel:{{foo.tel}}">';
        x+= '{{foo.cel}}</strong></a></h6>';
       	x+= '</div>';
        $scope.foo= item;
        var el = $compile(x)($scope);
        
        
        $scope.$evalAsync(function() {
          $scope.$apply();
          infowindow.setContent(el.html());
          infowindow.open($scope.map);          
        });

	}
});