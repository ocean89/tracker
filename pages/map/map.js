var Map = function(){
    this.options = {
        osmUrl : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib : 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    };
}

Map.prototype.showMap = function(){
    
    this.map = L.map('map');

    this.addLayers();

    this.bindEvents();

    this.locate();
    
}

Map.prototype.addLayers = function(){

    var map = this.map;

    L.tileLayer(this.options.osmUrl, {
        attribution: this.options.osmAttrib,
        maxZoom: 18
    }).addTo(this.map);

    var tracks = StorageManager.getTracks();
    console.log(tracks);
    tracks.forEach(function(track) {

        var points = [];
        
        track.forEach(function(point) {
            points.push(new L.LatLng(point.lat, point.lng));
        });

        var firstpolyline = new L.Polyline(points, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        });

        firstpolyline.addTo(map);
    });
}

Map.prototype.locate = function(){
    this.map.locate({setView: true, maxZoom: 16});
}

Map.prototype.bindEvents = function(){

    this.map.on('locationfound', this.onLocationFound);
    this.map.on('locationerror', this.onLocationError);
}

Map.prototype.onLocationError = function(e) {
    alert(e.message);
}

Map.prototype.onLocationFound = function(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(this)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(this);
}

$(document).ready(function(){
    var map = new Map();
    map.showMap();
});