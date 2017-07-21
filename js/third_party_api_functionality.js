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
            // console.log("request is successful");
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
                content += '<h5 class="info-sub-header text-center" style="color:red;">Sorry !!! No Data is available for this venue on Foursquare.</h5>';
                content += '</div>';
                infoWindow.setContent(content);
            }
        },
        error: function (xhr) {
            if (xhr.responseText !== undefined) {
                var content = "";
                content += '<div class="info-container">';
                content += '<h5 class="info-sub-header text-center" style="color:red;">Currently unable to fetch Fourquare data !!!</h5>';
                content += '<p class="text-center" style="font-size:14px; font-weight:bold;color:blue;">Please try again later.</p>';
                content += '</div>';
                infoWindow.setContent(content);
            } else {
                var content = "";
                content += '<div class="info-container">';
                content += '<h5 class="info-sub-header text-center" style="color:red;">It seems to have problem with your Internet Connection.</h5>';
                content += '<p class="text-center" style="font-size:14px; font-weight:bold;color:blue;">Please try again later.</p>';
                content += '</div>';
                infoWindow.setContent(content);
            }
            // console.log(xhr.responseText);
            // var responseObject = JSON.parse(xhr.responseText).meta;
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
                content += '<h5 class="info-sub-header">Most Recent Comments from Foursquare :</h5>';
                content += '<ol class="tips">' + tipsArray.join('') + '</ol>';
                content += '</div>';
                
                /* Adding the content to the infowindow once received from Foursquare */
                infoWindow.setContent(content);
                infoWindow.open(map, marker);

           } else {
                content += '<div class="info-container">';
                content += '<h4 class="info-header text-center">' + marker.title.toUpperCase() + '</h4>'; 
                content += '<hr class="info-hr-rule">'
                content += '<h5 class="info-sub-header text-center" style="color:red;">Unable to fetch Foursquare tips for the venue.</h5>';
                content += '</div>';
                infoWindow.setContent(content);
           }
       },
        error: function (xhr) {
            var content = "";
            content += '<div class="info-container">';
            content += '<h5 class="info-sub-header text-center" style="color:red;">Currently unable to fetch Fourquare data !!!</h5>';
            content += '<p class="text-center" style="font-size:14px; font-weight:bold;color:blue;">Please try again later.</p>';
            content += '</div>';
            infoWindow.setContent(content);
       }
   });
};