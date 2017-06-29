/* Defining the Global Variables */
var map, largeInfoWindow;

/* Defining the initMap call back function */
var initMap = function () {
    var mapOptions = {
        center: {lat: 12.9715987,lng: 77.5945627},
        zoom: 13,
        mapTypeId: 'roadmap',
        scrollwheel: false,
        scaleControl: false,
        rotateControl: false,
        zoomControl: false
    };
    
    /* Initializing the map object */
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    /* Initializing the largeInfoWindow object */
    largeInfoWindow = new google.maps.InfoWindow();
    
    /* Initializing the bounds object */
    var bounds = new google.maps.LatLngBounds();
    
    /* Initializing the viewModel object */
    var vm = new ViewModel();
    var locContainer = vm.locationContainer();
    
    for (var i = 0; i< locContainer.length; i++) {
        /* Adding event listener to each of the marker */
        locContainer[i].marker.addListener('click', function() {
            openInfoWindow(this, largeInfoWindow);
        });
        
        bounds.extend(locContainer[i].marker.position);
    }
    
    map.fitBounds(bounds);
    
    /* Applying the bindings */
    ko.applyBindings(vm);
};

/* Defining the openInfoWindow funtion */
function openInfoWindow(marker, infoWindow) {
    infoWindow.marker = marker;
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
};

/* Defining the Location constructor */
var Location = function (data) {
    this.title = ko.observable(data.title);
    this.position = ko.observable(data.position);
    this.address = ko.observable(data.address);
    this.placeId = ko.observable(data.placeId);
    this.marker = new google.maps.Marker({
        map: map,
        title: this.title(),
        position: this.position(),
        draggable: false,
        animation: google.maps.Animation.DROP
    });
};

/* Defining the ViewModel constructor */
var ViewModel = function () {
    var self = this;
    
    self.locationContainer = ko.observableArray([]);
    
    /* Adding Location objects into the locationContainer */
    for (var i = 0; i < locations.length; i++) {
        self.locationContainer.push(new Location(locations[i]));
    }
};

