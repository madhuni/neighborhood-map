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
        $(".temp").text("No Content");
        $(".weather").text("No Content");
        $(".humidity").text("No Content");
        $(".temp").toggleClass("changed");
    });
};

// $(function() {
//     /* Calling the funtion after a time interval of 10mins */
//     getWeather(); // initializing the funtion on the load of the app
//     window.setInterval("getWeather()", 600000);
// });