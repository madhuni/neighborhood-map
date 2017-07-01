function getContentFromFoursquare () {
	var clientId = "UPSN54SKPJL2AIQ4QL55UDZADYQKDP545LTWKAZAUN5MVGLN";
	var clientSecret = "ZPRUPW2TZYLW4SIE41RXUZMKJYCD3TE25EPNMP3305ZOCYTK";
	var url = "https://api.foursquare.com/v2/venues/suggestcompletion";
	url += "?" + $.param({
        client_id: clientId,
        client_secret: clientSecret,
        ll: "12.997572" + ',' + "77.69633899999999",
        query: "Phoenix",
        v: "20170601",
        m: "foursquare"
    });
    
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            //console.log(url);
            //console.log(data);
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
                    //console.log(data);
                    var tips = data.response.tips.items;
                    for (var i = 0; i < tips.length; i++) {
                        console.log(tips[i].text);
                    }
                },
                error: function () {
                    console.log("Tips are not loaded");
                }
            });
        },
        error: function () {
            console.log("Request didn't work");
        }
    });
};

getContentFromFoursquare();


