function getContentFromFoursquare (marker) {
    var venueCordinates = marker.position;
    // console.log(venueCordinates);
    // console.log(marker.title);
    // console.log(venueCordinates.lat() + " and " + venueCordinates.lng());
	var clientId = "UPSN54SKPJL2AIQ4QL55UDZADYQKDP545LTWKAZAUN5MVGLN";
	var clientSecret = "ZPRUPW2TZYLW4SIE41RXUZMKJYCD3TE25EPNMP3305ZOCYTK";
	var url = "https://api.foursquare.com/v2/venues/suggestcompletion";
	url += "?" + $.param({
        client_id: clientId,
        client_secret: clientSecret,
        ll: venueCordinates.lat() + ',' + venueCordinates.lng(),
        query: marker.title,
        v: "20170601",
        m: "foursquare"
    });
    
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log("request is successful");
            // console.log(url);
            // console.log(data.response.minivenues[0].id);
            if (data.response.minivenues.length !== 0) {
                var venue = data.response.minivenues[0];
                var venueId = venue.id;
                getVenueTips(venueId, clientId, clientSecret);
                getNextVenues(venueId, clientId, clientSecret);
                getVenuePhotoes(venueId, clientId, clientSecret);
                getSimilarVenues(venueId, clientId, clientSecret);

            } else {
                console.log("No venues were found for the provided location query");
            }
            
        },
        error: function (data) {
            var responseObject = JSON.parse(data.responseText).meta;
            console.log("code : " + responseObject.code);
            console.log("error msg : " + responseObject.errorDetail);
            console.log("error type: " + responseObject.errorType);
        }
    });
};

/* Function to retrive the tips about the places from Foursquare */
function getVenueTips (venueId, clientId, clientSecret) {
    var venueUrl = "https://api.foursquare.com/v2/venues/" + venueId + "/tips";
    venueUrl += "?" + $.param({
        client_id: clientId,
        client_secret: clientSecret,
        v: "20170601",
        m: "foursquare",
        sort: "recent",
        limit: "10"
    });
    
    $.ajax({
        url: venueUrl,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            if (data.response.tips.count !== 0) {
                var tips = data.response.tips.items;
                for (var i = 0; i < tips.length; i++) {
                    // console.log(tips[i].text);
                }    
            } else {
                console.log("no tips are found for the location");
            }
        },
        error: function () {
            console.log("Tips are not loaded");
        }
    });
};

/* Function to retrive the hours of the venue*/
function getNextVenues (venueId, clientId, clientSecret) {
    var venueUrl = "https://api.foursquare.com/v2/venues/" + venueId + "/nextvenues";
    venueUrl += "?" + $.param({
        client_id: clientId,
        client_secret: clientSecret,
        v: "20170601",
        m: "foursquare",
    });
    
    $.ajax({
        url: venueUrl,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            /*if (data.response.tips.count !== 0) {
                var tips = data.response.tips.items;
                for (var i = 0; i < tips.length; i++) {
                    console.log(tips[i].text);
                }    
            } else {
                console.log("no tips are found for the location");
            }*/
        },
        error: function () {
            console.log("Hours not found");
        }
    });
};

/* Function to retrive the photoes of the venue */
function getVenuePhotoes (venueId, clientId, clientSecret) {
    var venueUrl = "https://api.foursquare.com/v2/venues/" + venueId + "/photos";
    venueUrl += "?" + $.param({
        client_id: clientId,
        client_secret: clientSecret,
        v: "20170601",
        m: "foursquare",
        group: "venue",
        limit: "5",
        offset: "5"
    });
    
    $.ajax({
        url: venueUrl,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            /*if (data.response.tips.count !== 0) {
                var tips = data.response.tips.items;
                for (var i = 0; i < tips.length; i++) {
                    console.log(tips[i].text);
                }    
            } else {
                console.log("no tips are found for the location");
            }*/
        },
        error: function () {
            console.log("Hours not found");
        }
    });
};

/* Function to retrive similar venues */
function getSimilarVenues (venueId, clientId, clientSecret) {
    var venueUrl = "https://api.foursquare.com/v2/venues/" + venueId + "/similar";
    venueUrl += "?" + $.param({
        client_id: clientId,
        client_secret: clientSecret,
        v: "20170601",
        m: "foursquare",
    });
    
    $.ajax({
        url: venueUrl,
        dataType: "json",
        success: function (data) {
            console.log(data);
            /*if (data.response.tips.count !== 0) {
                var tips = data.response.tips.items;
                for (var i = 0; i < tips.length; i++) {
                    console.log(tips[i].text);
                }    
            } else {
                console.log("no tips are found for the location");
            }*/
        },
        error: function () {
            console.log("Hours not found");
        }
    });
};

/* Function to retrive weather for the city */
function getWeather () {
    var apiKey = "a71fa89ba24601d8940995e04f9d6bb6";
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
    weatherUrl += "?" + $.param({
        q: "Bangalore",
        APPID: apiKey,
        units: "metric"
    });
    
    $.ajax({
        url: weatherUrl,
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("Oops...Something went wrong !!! :( ");
        }
    });
};

/* Function to get the details of the places from Good Maps API */
function getDetailFromGoogle () {
    var apiKey = "AIzaSyA31u0Hxmq37sPOLezIMM8wg0VLJd5E0Sg";
    var url = "https://maps.googleapis.com/maps/api/geocode/json";
    url += "?" + $.param({
        address: 'Sattvam Bangalore',
        key: apiKey
    });

    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            var location = data.results[0];
            console.log(location.geometry.location);
            console.log("address : " + location.formatted_address);
            console.log("place_id : " + location.place_id);
        },
        error: function () {
            console.log("Something went wrong !!!");
        }
    }); 
};

// getDetailFromGoogle();
// getWeather();