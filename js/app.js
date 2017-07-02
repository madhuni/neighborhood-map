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
    
    vm.query.subscribe(vm.liveSearchLocations);
    vm.addClickListener();
    map.fitBounds(bounds);
    /* Applying the bindings */
    ko.applyBindings(vm);

    /* Making the bounds to be fit whenever the size of the window changes */
    $(window).resize(function () {
        map.fitBounds(bounds);
    });
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
        draggable: false
        // animation: google.maps.Animation.DROP
    });
};

/* Defining the ViewModel constructor */
var ViewModel = function () {
    var self = this;
    
    self.locationContainer = ko.observableArray([]);
    
    self.markerContainer = ko.observableArray([]);
    
    /* Adding Location objects into the locationContainer */
    for (var i = 0; i < locations.length; i++) {
        self.locationContainer.push(new Location(locations[i]));
    }
    
    /* Adding markers to the markerContainer */
    for (var i = 0; i < self.locationContainer().length; i++) {
        self.markerContainer.push(self.locationContainer()[i].marker);
    }
    
    /* This function will activate the infoWindow corresponds to the list item clicked in the navigation */
    self.activateInfoWindow = function (location) {
        bounceMarker(location.marker);
        stopBouncingMarker(location.marker, 1500);
        // getContentFromFoursquare(location.marker);
        openInfoWindow(location.marker, largeInfoWindow);
    };
    
    /* Adding event listener to the markers*/
    self.addClickListener = function () {
        for (var i = 0; i< self.markerContainer().length; i++) {
            /* Adding event listener to each of the marker */
            self.markerContainer()[i].addListener('click', function() {
                bounceMarker(this);
                stopBouncingMarker(this, 1500);
                // getContentFromFoursquare(this);
                openInfoWindow(this, largeInfoWindow);
            });
            
            bounds.extend(self.markerContainer()[i].position);
        }
    }
    
    /* function to add the markers*/
    self.addMarkers = function (locationContainer) {
        for (var i = 0; i < locationContainer().length; i++) {
            self.markerContainer.push(self.locationContainer()[i].marker);
        }
    };
    
    /* function to clear all the markers from the map */
    self.removeMarkers = function () {
        for (var i = 0; i < self.markerContainer().length; i++) {
            self.markerContainer()[i].setMap(null);
        }
    };

    /* Code for implementing the search for the places in the list starts here */
    self.query = ko.observable("");
    
    self.liveSearchLocations = function (value) {
        // removing all the locations from the container
        self.locationContainer.removeAll();
        self.removeMarkers();
        
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.locationContainer.push(new Location(locations[i]));
                self.addMarkers(self.locationContainer);
                self.addClickListener();
            }
        }
    };
};

