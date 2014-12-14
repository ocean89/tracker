$(document).ready(function(){
    var timer = null;
    var watchID = null;
    var bgGeo = null;
    var positions = null;

    $("#time").hide();
    $("#stop").hide();
    $("#position").hide();

    $("#start").click(function(e){

        e.preventDefault();

        $("#time").text("0:0:0");
        $("#position").text("Position: ");

        $("#start").hide();
        $("#stop").show();
        $("#time").show();
        $("#position").show();

        positions = [];

        
        if(navigator.plugins.backgroundGeoLocation){

            var onBackgroundSuccess = function(location) {
                positions.push({
                    lat : location.latitude,
                    lng : location.longitude
                });

                $("#position").text("Position:" + position.coords.latitude + " " + position.coords.longitude);
            };

            bgGeo = navigator.plugins.backgroundGeoLocation;

            var callbackFn = function(location){
                console.log("test");
                onBackgroundSuccess(location);
            };

            var failureFn = function(error){
                alert('Geolocation Error');
            };

            bgGeo.configure(callbackFn, failureFn, {
                desiredAccuracy: 10,
                stationaryRadius: 10,
                distanceFilter: 30,
                debug: true
            });

            bgGeo.start();
        }
        else if(navigator.geolocation){
            var onSuccess = function(position) {
                console.log("test2");
                positions.push({
                    lat : position.coords.latitude,
                    lng : position.coords.longitude
                });
                $("#position").text("Position:" + position.coords.latitude + " " + position.coords.longitude)
            };

            var onFailure = function(){

            };

            var options = {frequency: 3000, enableHighAccuracy: true};
            watchID = navigator.geolocation.watchPosition(
                onSuccess,
                onFailure,
                options
            );
        }
        

        var then = new Date();

        timer = setInterval(function(){

            var now = new Date();
            var dif = then.getTime() - now.getTime();
            var secondsBetween = Math.abs(dif / 1000);

            var seconds = Math.round(secondsBetween % 60);
            var minutes = Math.round((secondsBetween/60) % 60);
            var hours = Math.round(secondsBetween/(60*60));
            var timeString = hours + ":" + minutes + ":" + seconds;

            $("#time").text(timeString);
                
        },
        1000);

    });
    $("#stop").click(function(e){

        e.preventDefault();

        if(timer){
            clearInterval(timer);
        }
        
        if(navigator.plugins.backgroundGeoLocation){
             bgGeo.stop();
        }
        else if(navigator.geolocation){
            navigator.geolocation.clearWatch(watchID);
        }
       

        StorageManager.addTrack(positions);

        $("#stop").hide();
        $("#start").show();

    });

    
});