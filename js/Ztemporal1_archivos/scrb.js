$(document).ready(function () {

    $("#rta_in").hide();
    $('#gifsending').hide();

    $("#newsletter").submit(function (e) {
        e.preventDefault();
        if ($("#newsletter").valid() != true) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: "/includes/emzac/ajax/newsletter.php",
                data: $("#newsletter").serialize(),
                cache: false,
                beforeSend: function () {
                    $('#gifsending').show();
                },
                complete: function () {
                    $('#gifsending').hide();
                },
                success: function (response) {
                    $('#rta_in').empty();
                    
                    if ( response.result === 'error' ) {
                        $('#rta_in').addClass("bs-callout bs-callout-danger");
                    } else {
                        $('#rta_in').addClass("bs-callout bs-callout-info");
                        $('#send_in').remove();
                        $("#contact-form").clearForm();
                    }
                    $('#rta_in').html(response.msg[0]).fadeIn();
                },
                error: function () {
                    $('#rta_in').empty();
                    $('#rta_in').addClass("bs-callout bs-callout-danger");
                    $('#rta_in').html("Se produjo un error en la inserción de la información").fadeIn();
                }
            });
        }
    });
    
    var trm = $("#trm").html();
    if (trm == "-") {
        $.ajax({
            url: '/manager_events.php?ev=trm',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.error) {
                    $("#trm").html(data.replace);
                } else {
                    $("#trm").html(data.replace);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#trm").html("-");
            }
        });
    }
});