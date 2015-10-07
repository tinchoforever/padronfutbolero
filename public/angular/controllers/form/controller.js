myApp.controller('formController', function($scope){
  $scope.socket = io();
 
 	(function($scope){
    var ready = function(error, clubes){

    	$scope.$apply(function(){
    		$scope.clubes = clubes;
    		console.log(clubes);
    	});
    };
    queue()
	   	.defer(d3.csv, "data/clubes.csv")
	    .await(ready);
	})($scope);
	$scope.sendVote = function(){
		$scope.socket.emit('club', $scope.club.name);
		window.location.href= "/results"
		
	}
});
