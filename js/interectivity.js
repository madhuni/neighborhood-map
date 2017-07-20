$(function () {
    /* Using jQuery to toggle the open and close the navigation panel */
    var hamburger = $('.fa-bars');
    var wrapper = $('#wrapper');
    var nav = $('.nav-menu');
    var closeButton = $('.expend-button');
    
    hamburger.on('click', function () {
        // console.log("I am working fine");
        nav.toggleClass('open-nav');
        closeButton.toggleClass('display-btn');
        $('#map-container').toggleClass('set-margin');
    });

    /* Opening the tool-tip on the hamburger */
    
    $('[data-toggle="tooltip"]').tooltip(); 
    
    /* Adding event to track the change width of any dom element */
    $.event.special.widthChanged = {
        remove: function() {
            $(this).children('iframe.width-changed').remove();
        },
        add: function () {
            var elm = $(this);
            var iframe = elm.children('iframe.width-changed');
            if (!iframe.length) {
                iframe = $('<iframe/>').addClass('width-changed').prependTo(this);
            }
            var oldWidth = elm.width();
            function elmResized() {
                var width = elm.width();
                if (oldWidth != width) {
                    elm.trigger('widthChanged', [width, oldWidth]);
                    oldWidth = width;
                }
            }
            var timer = 0;
            var ielm = iframe[0];
            (ielm.contentWindow || ielm).onresize = function() {
                clearTimeout(timer);
                timer = setTimeout(elmResized, 20);
            };
        }
    }
    
    /* Applying the width tracker event to the 'map-container' */
    $("#map-container").on('widthChanged', function() {
        map.fitBounds(bounds);
    });

    /* Applying the active class while clicking the link item */
    /*var listElement = $('.list-item');
    // console.log(listElement);

    listElement.on('click', function() {
        $(this).addClass('active');
        for (var i = 0; i < listElement.length; i++) {
            var status = $(listElement[i]).hasClass('active');
            if (status === true) {
                $(listElement[i]).removeClass('active');
                console.log('active class is removed');
            }
        }
    });*/
});