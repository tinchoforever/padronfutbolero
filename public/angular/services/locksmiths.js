'use strict';

/* Filters */
myApp.factory('lockSmithsFactory', function($http, $filter) {

	var factory = {};
	factory.forProvince= function(p, cb){
	  		var onDb = function(){
	  			var experession = {nombre_provincia:p};
	  			var result = $filter('filter')(factory.db,experession,false);
	  			experession = 'nombre_localidad';
	  			result = $filter('unique')(result,experession,false);
	  			result = result.map(function(d){ return d.nombre_localidad });
	  			cb(result);
	  		}
	  		if (!factory.db){
				factory.load(onDb);
			}
			else {
				onDb();
			}

	  	};
	 factory.forCity= function(p, c,cb){
	  		var onDb = function(){
	  			var experession = {nombre_provincia:p, nombre_localidad:c};
	  			var result = $filter('filter')(factory.db,experession,false);
	  			cb(result);
	  		}
	  		if (!factory.db){
				factory.load(onDb);
			}
			else {
				onDb();
			}

	  	};

	factory.forLocation = function(l,cb){

	  	
	  	factory.load(function(locksmith){

	  			var lat = l.latitude;
	        	var lon = l.longitude;
	        	var mock = {latitude:0, longitude:0};
	  			
	  			locksmith.sort(function(a,b){

	  				var geoA = a.latitude ? a : mock;
	  				var geoB = b.latitude ? b : mock;


	  				var distanceFromA = Math.abs(getDistanceFromLatLonInKm(geoA.latitude,geoA.longitude,lat,lon));
	  				var distanceFromB = Math.abs(getDistanceFromLatLonInKm(geoB.latitude,geoB.longitude,lat,lon));
	  				a.distance = Math.round(distanceFromA * 10);
	  				b.distance = Math.round(distanceFromB * 10);
	  				 if (distanceFromA> distanceFromB) {
					    return 1;
					  }
					  if (distanceFromA < distanceFromB) {
					    return -1;
					  }
					  // a must be equal to b
					  return 0;
	  			});
	  			cb(locksmith.slice(0,20));

	  	
	  });
	}
	factory.load = function(cb){
		if (factory.db){
			cb(factory.db);
		}
		else {
			$http.get('http://buscocerrajerov2.herokuapp.com/api-cerrajero/maps')
		  		.success(function(locksmiths){
		  			factory.db = locksmiths;
		  			var experession = 'nombre_provincia';
		  			factory.provincies = 
		  				$filter('unique')(locksmiths, experession, false).map(function(d){
		  					if (d.nombre_provincia &&
		  						d.nombre_provincia !== "" &&
		  						d.nombre_provincia !== "Canelones" &&
		  						d.nombre_provincia !== "Montevideo"){
		  						return d.nombre_provincia;
		  					}	
		  					else {
		  						return "";
		  					}
		  				});
		  			experession = "toString()";
		  			factory.provincies = $filter('orderBy')(factory.provincies, experession, false);
		  			factory.provincies = _.filter(factory.provincies,function(d){
		  				return d != "";
		  			})
		  			
		  			cb(locksmiths);
		  	});  
	  	}
	  	
  	}

  	

	return factory;
});
	