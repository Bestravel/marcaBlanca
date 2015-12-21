//SCROLL from http://alijafarian.com/responsive-page-scrolling-with-jquery-and-bootstrap/


$(document).ready(function() {
    // navigation click actions
    $('.scroll-link').on('click', function(event){
        
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
        
    });
// scroll to top action
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');
    });
    // mobile nav toggle

    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });
});
// scroll function
function scrollToID(id, speed){
    var offSet = 0;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#main-nav');
    $('html,body').animate({scrollTop:targetOffset}, speed);
    if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}
