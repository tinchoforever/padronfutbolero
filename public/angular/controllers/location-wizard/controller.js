myApp.controller('wizardController', function(lockSmithsFactory, $scope,$rootScope, $routeParams, $location, $http){
	$rootScope.main = true;
	lockSmithsFactory.load(function(l){
		$scope.provincies = lockSmithsFactory.provincies;
	})

});