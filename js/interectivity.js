/* Below functions were used when pure javascript was used */
function openNav() {
    document.getElementById('navigation-container').style.width='300px';
    document.getElementById('wrapper').style.marginLeft='300px';
};

function closeNav() {
    document.getElementById('navigation-container').style.width='0px';
    document.getElementById('wrapper').style.marginLeft='0px';
}

$(function () {
    /* Using jQuery to toggle the open and close the navigation panel */
    var hamburger = $('.fa-bars');
    var wrapper = $('#wrapper');
    var nav = $('#navigation-container');
    
    hamburger.on('click', function () {
        console.log("I am working fine");
        nav.toggleClass('open-nav');
        wrapper.toggleClass('wrapper-off');
    });
    
});