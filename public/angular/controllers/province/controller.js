myApp.controller('provinceController', function(lockSmithsFactory, $scope,$rootScope, $routeParams, $location, $http){
	$rootScope.main = true;
	$scope.province = $routeParams.p;
	lockSmithsFactory.forProvince($scope.province, function(cities){
		$scope.cities = cities;
	})
});