function FakeLocation(success, failure, positions){

    this.lat = 58;
    this.lng = 16;

    this.latModifier = 0;
    this.lngModifier = 0.1;

    this.bgGeo = navigator.plugins.backgroundGeoLocation;

    this.callbackFn = function(location){
        success(location, positions);
    };

    this.failureFn = function(error){
    	failure(error,positions);
    };
};

FakeLocation.prototype.start = function() {

    var self = this;

	this.timer = setInterval(function(){
        self.lat += self.latModifier;
        self.lng += self.lngModifier;

        var location = {
            latitude : self.lat,
            longitude : self.lng
        };

        self.callbackFn(location);
    },
    1000);
};

FakeLocation.prototype.stop = function() {
    clearInterval(this.timer);
};