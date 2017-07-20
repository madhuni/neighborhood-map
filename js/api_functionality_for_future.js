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