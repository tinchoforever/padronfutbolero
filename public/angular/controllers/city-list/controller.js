myApp.controller('cityListController', function(lockSmithsFactory, $scope,$rootScope, $routeParams, $location, $http){
	$rootScope.main = true;
	$scope.province = $routeParams.p;
	$scope.city = $routeParams.c;
	if ($routeParams.p && $routeParams.c){
		lockSmithsFactory.forCity($routeParams.p,$routeParams.c, function(places){
			$scope.places = places;
			console.log(places);
		});
	}
	else{
		$scope.places  = $rootScope.activePlaces
	}

});