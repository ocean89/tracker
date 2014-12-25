$(document).ready(function(){
    var timer = null;
    var watchID = null;
    var bgGeo = null;
    var positions = null;

    var gpslocation = null;

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

        var onSuccess =  function(location, positions) {
            console.log(positions);
            positions.push({
                lat : location.latitude,
                lng : location.longitude
            });

            $("#position").text("Position:" + location.latitude + " " + location.longitude);
        };

        var onFailure = function(error, context){
            console.log(error);
        };

        
        //if(navigator.plugins.backgroundGeoLocation){

            gpslocation = new GPSLocation(onSuccess, onFailure, positions);
        /*}
        else{
            gpslocation = new FakeLocation(onSuccess, onFailure, positions);
        }*/
        
        gpslocation.start();

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

        console.log(positions);

        e.preventDefault();

        gpslocation.stop();
       

        StorageManager.addTrack(positions);

        $("#stop").hide();
        $("#start").show();

    });

    
});