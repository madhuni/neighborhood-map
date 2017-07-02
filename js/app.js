/* Defining the Global Variables */
var map, largeInfoWindow, bounds;

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
    bounds = new google.maps.LatLngBounds();
    
    /* Initializing the viewModel object */
    var vm = new ViewModel();
    var locContainer = vm.locationContainer();
    
    for (var i = 0; i< locContainer.length; i++) {
        /* Adding event listener to each of the marker */
        locContainer[i].marker.addListener('click', function() {
            bounceMarker(this);
            stopBouncingMarker(this, 1500);
            getContentFromFoursquare(this);
            openInfoWindow(this, largeInfoWindow);
        });
        
        bounds.extend(locContainer[i].marker.position);
    }
    
    map.fitBounds(bounds);
    
    /* Applying the bindings */
    ko.applyBindings(vm);
    vm.query.subscribe(vm.liveSearchLocations);
};

/* Defining the bounceMarker function */
function bounceMarker (marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
};

/* Defining function to stop the bouncing of the marker */
function stopBouncingMarker (marker, time) {
    window.setTimeout(function () {
        marker.setAnimation(null);
    }, time);
};

/* Defining the openInfoWindow funtion */
function openInfoWindow (marker, infoWindow) {
    infoWindow.marker = marker;
    infoWindow.setContent('<h4 class="infowin-title">This is title on the info window</h4><ul class="infowin-list"><li class="infowin-list-item">First Location</li></ul>');
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
    
    /* This function will activate the infoWindow corresponds to the list item clicked in the navigation */
    self.activateInfoWindow = function (location) {
        bounceMarker(location.marker);
        stopBouncingMarker(location.marker, 1500);
        getContentFromFoursquare(location.marker);
        openInfoWindow(location.marker, largeInfoWindow);
    };
    
    /* Code for implementing the search for the places in the list starts here */
    self.query = ko.observable("");
    
    self.liveSearchLocations = function (value) {
        // removing all the locations from the container
        self.locationContainer.removeAll();
        
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.locationContainer.push(new Location(locations[i]));
            }
        }
    };
    
    
};

