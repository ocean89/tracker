$(document).ready(function(){
    var timer = null;
    var watchID = null;
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

        watchID = navigator.geolocation.watchPosition(function(position) {
            positions.push({
                lat : position.coords.latitude,
                lng : position.coords.longitude
            });
            $("#position").text("Position:" + position.coords.latitude + " " + position.coords.longitude)
        });

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

        if(watchID){
            navigator.geolocation.clearWatch(watchID);
        }
        StorageManager.addTrack(positions);

        $("#stop").hide();
        $("#start").show();

    });

    
});