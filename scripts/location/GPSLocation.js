function GPSLocation(success, failure, positions){

    this.bgGeo = navigator.plugins.backgroundGeoLocation;

    var callbackFn = function(location){
        success(location, positions);
    };

    var failureFn = function(error){
    	failure(error,positions);
    };

    this.bgGeo.configure(callbackFn, failureFn, {
        desiredAccuracy: 10,
        stationaryRadius: 10,
        distanceFilter: 30,
        debug: true
    });
};

GPSLocation.prototype.start = function() {
	this.bgGeo.start();
};

GPSLocation.prototype.stop = function() {
	this.bgGeo.stop();
};