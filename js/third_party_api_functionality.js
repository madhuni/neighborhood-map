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
            // console.log(data);
            if (data.response.minivenues.length !== 0) {
                var venue = data.response.minivenues[0];
                var venueUrl = "https://api.foursquare.com/v2/venues/" + venue.id + "/tips";
                venueUrl += "?" + $.param({
                    client_id: clientId,
                    client_secret: clientSecret,
                    v: "20170601",
                    m: "foursquare",
                    sort: "recent",
                    limit: "100"
                });
                
                $.ajax({
                    url: venueUrl,
                    dataType: "json",
                    success: function (data) {
                        // console.log(data);
                        if (data.response.tips.count !== 0) {
                            var tips = data.response.tips.items;
                            for (var i = 0; i < tips.length; i++) {
                                console.log(tips[i].text);
                            }    
                        } else {
                            console.log("no tips are found for the location");
                        }
                    },
                    error: function () {
                        console.log("Tips are not loaded");
                    }
                });    
            } else {
                console.log("No venues were found for the provied location query");
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
