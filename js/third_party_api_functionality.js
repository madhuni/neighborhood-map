function getContentFromFoursquare (marker, largeInfoWindow) {
    var infoContent;
    var venueCordinates = marker.position;
    var infoWindow = largeInfoWindow;
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
            if (data.response.minivenues.length !== 0) {
                var venue = data.response.minivenues[0];
                var venueId = venue.id;
                /* calling the function to get the venue tips */
                getVenueTips(venueId, clientId, clientSecret, marker, infoWindow);
            } else {
                // showing the msg if no data is available for the currently clicked venue
                var content = "";
                content += '<div class="info-container">';
                content += '<h4 class="info-header text-center">' + marker.title.toUpperCase() + '</h4>'; 
                content += '<hr class="info-hr-rule">'
                content += '<h5 class="info-sub-header text-center">Sorry !!! No Data is available for this venue on Foursquare.</h5>';
                content += '</div>';
                infoWindow.setContent(content);
            }
        },
        error: function (data) {
            var content = "";
            content += '<div class="info-container">';
            content += '<h5 class="info-sub-header text-center">Oops!!! Something went wrong.</h5>';
            content += '</div>';
            infoWindow.setContent(content);
            var responseObject = JSON.parse(data.responseText).meta;
            // console.log("code : " + responseObject.code);
            // console.log("error msg : " + responseObject.errorDetail);
            // console.log("error type: " + responseObject.errorType);
        }
    });
};

/* Function to retrive the tips about the places from Foursquare */
function getVenueTips (venueId, clientId, clientSecret, marker, infoWindow) {
    var content = "";
    var tipsArray = [];
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
                   tipsArray.push('<li class="tip-list-item">' + tips[i].text + '</li>');
               }
                content += '<div class="info-container">';
                content += '<h4 class="info-header text-center">' + marker.title.toUpperCase() + '</h4>'; 
                content += '<hr class="info-hr-rule">'
                content += '<h5 class="info-sub-header">Most Recent Comments :</h5>';
                content += '<ol class="tips">' + tipsArray.join('') + '</ol>';
                content += '</div>';
                
                /* Adding the content to the infowindow once received from Foursquare */
                infoWindow.setContent(content);
                infoWindow.open(map, marker);

           } else {
                content += '<div class="info-container">';
                content += '<h4 class="info-header text-center">' + marker.title.toUpperCase() + '</h4>'; 
                content += '<hr class="info-hr-rule">'
                content += '<h5 class="info-sub-header text-center">Sorry!!! Currently no tips are available for the location.</h5>';
                content += '</div>';
                infoWindow.setContent(content);
           }
       },
        error: function () {
            content += '<div class="info-container">';
            content += '<h5 class="info-sub-header text-center">Oops!!! Something went wrong.</h5>';
            content += '</div>';
            infoWindow.setContent(content);
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
    var cityId = "1277333";
    weatherUrl += "?" + $.param({
        id: cityId,
        APPID: apiKey,
        units: "metric"
    });

    var weatherPromise = $.ajax({
        url: weatherUrl,
        dataType: 'json'
    });
    
    weatherPromise.done(function (data) {
        // console.log("weather is fetched");
        // console.log(data);
        var currentTemp = data.main.temp;
        var maxTemp = data.main.temp_max;
        var minTemp = data.main.temp_min;
        var humidity = data.main.humidity;
        var weather = data.weather[0].description;
        console.log("Temperature is : " + currentTemp + 
            "\n Weather : " + weather + 
            "\n Humidity : " + humidity + "%"
            );
        
        /* Adding live data to the dom elements */
        $(".temp").text(currentTemp);
        $(".weather").text(weather);
        $(".humidity").text(humidity+"%");
    });
    
    weatherPromise.fail(function (e) {
        console.log("Oops...Something went wrong !!! :( ");
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

/* Calling the funtion after a time interval of 10mins */
getWeather(); // initializing the funtion on the load of the app
window.setInterval("getWeather()", 600000);