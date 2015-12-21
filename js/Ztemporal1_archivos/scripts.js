function scrollToElement(selector, time, verticalOffset) {
    time = typeof (time) != 'undefined' ? time : 800;
    verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : -200;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
}

$(document).ready(function () {
    //UI FORM ELEMENTS
    var spinner = $('.spinner input').spinner({min: 0});

    $('.datepicker-wrap input').datepicker({
        showOn: 'button',
        buttonImage: 'images/ico/calendar.png',
        buttonImageOnly: true
    });

    $('#slider').slider({
        range: "min",
        value: 1,
        min: 0,
        max: 10,
        step: 1
    });

    //CUSTOM FORM ELEMENTS
    $('input[type=radio],select, input[type=checkbox]').uniform();

    //SCROLL TO TOP BUTTON
    $('.scroll-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


    //TABS
    $('.tab-content').hide().first().show();
    $('.inner-nav li:first').addClass("active");

    $('.inner-nav a').on('click', function (e) {
        e.preventDefault();
        $(this).closest('li').addClass("active").siblings().removeClass("active");
        $($(this).attr('href')).show().siblings('.tab-content').hide();
        var currentTab = $(this).attr("href");
        if (currentTab == "#location")
            initialize();
    });

    var hash = $.trim(window.location.hash);
    if (hash)
        $('.inner-nav a[href$="' + hash + '"]').trigger('click');

    //CSS
    $('.top-right-nav li:last-child,.social li:last-child,.twins .f-item:last-child,.ribbon li:last-child,.room-types li:last-child,.three-col li:nth-child(3n),.reviews li:last-child,.three-fourth .deals .one-fourth:nth-child(3n),.full .deals .one-fourth:nth-child(4n),.locations .one-fourth:nth-child(3n),.pager span:last-child,.get_inspired li:nth-child(5n)').addClass('last');
    $('.bottom nav li:first-child,.pager span:first-child').addClass('first');

    //ROOM TYPES MORE BUTTON
    $('.more-information').slideUp();
    $('.more-info').click(function () {
        var moreinformation = $(this).closest('li').find('.more-information');
        var txt = moreinformation.is(':visible') ? '+ more info' : ' - less info';
        $(this).text(txt);
        moreinformation.stop(true, true).slideToggle('slow');
    });

    //MAIN SEARCH 
    /*	$('.main-search input[name=radio]').change(function() {
     var showForm = $(this).val();
     $('.form').hide();
     $("#"+showForm).show();
     }); */

    $('.box').click(function (e) {
        e.preventDefault();
        var lnk = $(this).attr('id');

        $('#box_result').empty();
        if (lnk == "vuelosx" || lnk == "homex") {
            //$('#box_result').load("box_vuelos.html");
        }
        if (lnk == "hotelx")
            $('#box_result').load("box_hoteles.html");
        if (lnk == "atracx")
            $('#box_result').load("box_atracciones.html");
        if (lnk == "traslx")
            $('#box_result').load("box_traslados.html");
    });

    var options = {};           //your Sequence options, change as desired
    var mySequence = undefined; //setup a public variable to contain your Sequence instances

    function initSequence() {
        sequence = $("#sequence").sequence(options).data("sequence"); //initiate Sequence

        sequence.afterLoaded = function () {
            /* an example callback applied to the new instance of Sequence */
        }
    }


    $('.box2').click(function (e) {
        e.preventDefault();
        var lnk = $(this).attr('id');
        $('.slider').hide();

        $('#box_result').empty();
        $(".content").css("padding-top", '0px');
        if (lnk == "vuelosx") {
            /*
            $('.slider').show();
            initSequence();
            sequence.goTo(1, 1);
            $('#box_result').load("box_vuelos.html");
            */
        }
        if (lnk == "hotelx") {
            $('.slider').show();
            initSequence();
            sequence.goTo(2, 1);
            $('#box_result').load("box_hoteles.html");
        }
        if (lnk == "atracx") {
            $('.slider').show();
            initSequence();
            sequence.goTo(3, 1);
            $('#box_result').load("box_atracciones.html");
        }
        if (lnk == "traslx") {
            $('.slider').show();
            initSequence();
            sequence.goTo(4, 1);
            $('#box_result').load("box_traslados.html");
        }
    });

    $(".box-phones").click(function(e){
        e.preventDefault();
        var toShow = $(this).attr("data-box");
        var html = '';
        switch (toShow) {
            case '#vuelos':
                return false;
                //html = 'box_vuelos.html';
                //break;
            case '#hoteles':
                html = 'box_hoteles.html';
                break;
            case '#atracciones':
                html = 'box_atracciones.html';
                break;
            case '#traslados':
                html = 'box_traslados.html';
                break;
            default:
                return false;
        }

        scrollToElement("#container-box-buttons");
        $('#container-box-phones').load(html);
    });
    
    $(".link-box-desktop").click(function(e){
        e.preventDefault();
        var to = $(this).attr("data-box");
        scrollToElement("#box_result");
        $(to).trigger("click");
    });
    
    $("[data-link]").click(function(e){
        e.preventDefault();
        var link = $(this).attr("data-link");
        window.location.href = link;
    });

    // LIST AND GRID VIEW TOGGLE
    $('.view-type li:first-child').addClass('active');

    $('.grid-view').click(function () {
        $('.three-fourth article').attr("class", "one-fourth");
        $('.three-fourth article:nth-child(3n)').addClass("last");
        $('.view-type li').removeClass("active");
        $(this).addClass("active");
    });

    $('.list-view').click(function () {
        $('.three-fourth article').attr("class", "full-width");
        $('.view-type li').removeClass("active");
        $(this).addClass("active");
    });

    //LOGIN & REGISTER LIGHTBOX
    $('.close').click(function () {
        $('.lightbox').hide();
    });

    //MY ACCOUNT EDIT FIELDS
    $('.edit_field').hide();
    $('.edit').on('click', function (e) {
        e.preventDefault();
        $($(this).attr('href')).toggle('slow', function () {
        });
    });
    $('.edit_field a,.edit_field input[type=submit]').click(function () {
        $('.edit_field').hide(400);
    });
});


