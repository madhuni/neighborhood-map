// hard coded Array of location objects
// https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html#L150

// initMap function
// https://developers.google.com/maps/documentation/javascript/examples/map-simple

// Location constructor similiar to the Cat constructor form the JavaScript Design Patterns course (optional)

// ViewModel constructor
// In the ViewmModel create an observableArray with place objects
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models
// Separating Out the Model video lesson:
// https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/271165859175461/lessons/3406489055/concepts/34284402380923
// Adding More Cats video lesson
// https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/271165859175461/lessons/3406489055/concepts/34648186930923

// Instantiate the ViewModel
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
// The difference between defining the ViewModel as a function expression or defining the viewModel as an object literal:
// https://discussions.udacity.com/t/text-not-updating-with-search-box/182886/6

// Apply the bindings aka activate KO
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models#activating-knockout 

/* snippet from the discussion on 27th June */

var map;
var markers = [];

var initMap = function () {

    vm.google(!!window.google); // true
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
        vm.locationContainer()[i].marker = marker;

        // make markers clickable here, so that an info window opens

        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
};

/* Starting the code for Project */

/* Initializing the Location constructor */
var Location = function (data) {
    this.title = ko.observable(data.title);
    this.position = data.position;
    this.address = ko.observable(data.address);
    this.placeId = ko.observable(data.placeId);

    // don't
    // this.marker = ko.observable(new google.maps.Marker({}))

    // when the google maps api has finished loading
    //this.marker = google.maps.Marker({map: map,})
};

var ViewModel = function () {
    var self = this;
    
    self.locationContainer = ko.observableArray([]);
    
    for (var i = 0; i < locations.length; i++) {
        self.locationContainer.push(new Location(locations[i]));
    }

    self.activateMarker = function(location) {
        console.log(location);
        // do something with location.marker
        // for example: google.maps.event.trigger() method

    };
 
    self.google = ko.observable(!!window.google); // false

    // we can only execute script which depends on the google maps api when the google maps api has finished loading
    self.googleFinishedLoading = ko.computed(function() {
        console.log(self.google()); // false the first time this function executes
         // google.maps.Marker({}); error google is not defined

        if (self.google()) {
            console.log("The Google Maps API has finished loading. Let's create, for example the marker objects");
            console.log(google);

            // google.maps.Marker({}); no error
        }

    });
};

var vm = new ViewModel();

ko.applyBindings(vm);