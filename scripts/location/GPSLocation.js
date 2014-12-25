function GPSLocation(success, failure, positions){

    console.log(navigator);

    window.navigator.geolocation.getCurrentPosition(function(location) {
        console.log('Location from Phonegap');
    });

    this.bgGeo = navigator.plugins.backgroundGeoLocation;

    alert(this.bgGeo);

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