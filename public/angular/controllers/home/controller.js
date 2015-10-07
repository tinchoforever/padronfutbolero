myApp.controller('homeController', function(lockSmithsFactory, $scope,$rootScope, $routeParams, $location, $http){
	$rootScope.main = true;
	lockSmithsFactory.load(function(l){
		console.log(lockSmithsFactory.provincies);
		$scope.provincies = lockSmithsFactory.provincies;
	});
	$scope.$watch('province', function(newVal) {
        if (newVal) {
        	lockSmithsFactory.forProvince(newVal, function(d){
        		$scope.cities = d;
        	});
        }
    });
    $scope.search = function(){
    	if ($scope.province && $scope.city){
    		var newRoute = '/city/' + $scope.province + '/' + $scope.city;
    		$location.path(newRoute);
    	}
    }
});