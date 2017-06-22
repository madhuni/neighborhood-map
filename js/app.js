var map;

var markers = [];

var initMap = function () {
    var mapOptions = {
        center: {lat: 12.9715987,lng: 77.5945627},
        zoom: 13,
        mapTypeId: 'roadmap'
    };
    
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var bounds = new google.maps.LatLngBounds();
    
    for (var i = 0; i < locations.length; i++) {
        var title = locations[i].title;
        var position = locations[i].position;
        var marker = new google.maps.Marker({
            map: map,
            title: title,
            position: position,
            draggable: false,
            animation: google.maps.Animation.DROP
        });
        
        markers.push(marker);
        
        bounds.extend(markers[i].position);
    
    }
    
    map.fitBounds(bounds);
};