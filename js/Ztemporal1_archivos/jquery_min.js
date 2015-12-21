// JavaScript Document

var myApp;
myApp = myApp || (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Estamos gestionando su reserva...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
    return {
        showPleaseWait: function () {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        },
    };
})();

$(document).ready(function () {

    jQuery('#plan_arrive, #plan_departure').datetimepicker({
        format: 'd/m/Y',
        timepicker: false,
        mask: true,
        lang: 'es'
    });

    /* default settings */
    $('.venobox').venobox();

    $(".plan_bookingt").click(function () {
        $(".plan_booking").toggle("slow", function () {
            if ($('.plan_booking').is(':visible')) {
                scrollToElement('.plan_bookingt');
            }
        });
    });

    $(".btn-booking-plan").click(function () {
        $(".plan_booking").show("slow", function () {
            if ($('.plan_booking').is(':visible')) {
                scrollToElement('.plan_bookingt');
            }
        });
    });

    $('#plan_adults').on('change', function () { //on add input button click
        
        var max_fields = parseInt($("#plan_adults").val());
        var exist = $("#container-adults").children().length;
        var toAdd = max_fields-exist;
        
        if ( toAdd > 0 ) {
            var html = $("#markup-adults").html();
            for (var i=0;i<toAdd;i++) {
                $("#container-adults").append(html);
            }
        } else if ( toAdd < 0 ) {
            var toRemove = -1*toAdd;
            for (var i=0;i<toRemove;i++) {
                $("#container-adults").children().last().remove();
            }
        }
    });

    $('#plan_child').on('change', function () { //on add input button click
        var max_fields = $("#plan_child").val();
        var exist = $("#container-children").children().length;
        var toAdd = max_fields-exist;
        
        if ( max_fields > 0 ) {
            $("#divider-children").show();
        } else {
            $("#divider-children").hide();
        }
        
        if ( toAdd > 0 ) {
            var html = $("#markup-childrens").html();
            for (var i=0;i<toAdd;i++) {
                $("#container-children").append(html);
            }
        } else if ( toAdd < 0 ) {
            var toRemove = -1*toAdd;
            for (var i=0;i<toRemove;i++) {
                $("#container-children").children().last().remove();
            }
        }
    });

    $(document).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        console.log("remover campo");
        var toDelete = $(this).parents('.row')[0];
        var siblings = $(toDelete).siblings().length;
        var parantContainer = $(toDelete).parents('#container-adults').length;
        console.log("siblings:"+siblings);
        console.log("parantContainer:"+parantContainer);
        
        $(toDelete).remove();
        if ( parantContainer > 0 ) {
            $('#plan_adults').val(siblings);
            $('#plan_adults').trigger("change");
        } else {
            $('#plan_child').val(siblings);
            $('#plan_child').trigger("change");
        }
        
    });

    $(document).on('click', '#plan_finish', function () {
        window.location = '/';
    });

    $('.plan_booking').hide();

    $(document).on('click', '#plan_reload', function () {
        $("#rta").hide();
        $('.plan_booking, .plan_bookingt').show();
    });

    $("#booking-form").validate({
        rules: {
            plan_name: {
                minlength: 2,
                required: true,
                onlyLetterSp2: true
            },
            plan_lastname: {
                minlength: 2,
                required: true,
                onlyLetterSp2: true
            },
            plan_email: {
                required: true,
                email: true
            },
            plan_typeid: {
                required: true
            },
            plan_id: {
                minlength: 2,
                number: true,
                required: true
            },
            plan_phone: {
                minlength: 2,
                required: true
            },
            plan_city: {
                minlength: 3,
                required: true
            },
            plan_address: {
                minlength: 2,
                required: true
            },
            plan_arrive: {
                dateITA: true,
                required: true
            },
            plan_departure: {
                dateITA: true,
                required: true
            },
            plan_adults: {
                number: true,
                required: true
            },
            plan_child: {
                number: true,
                required: true
            },
            plan_nights: {
                number: true,
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        }
    });

    $('#plan_typeid').on('change', function () {
        var opc = $("#plan_typeid").val();
        $("#plan_id").val("");
        $("#plan_id").rules("remove", "number CC_id CE_id TI_id PPN_id LIC_id SSN_id TAX_id");
        switch (opc) {
            case "CC":
                $("#plan_id").rules("add", {
                    CC_id: true
                });
                break;
            case "CE":
                $("#plan_id").rules("add", {
                    CE_id: true
                });
                break;
            case "TI":
                $("#plan_id").rules("add", {
                    TI_id: true
                });
                break;
            case "NIT":
                $("#plan_id").rules("add", {
                    NIT_id: true
                });
                break;
            case "PPN":
                $("#plan_id").rules("add", {
                    PPN_id: true
                });
                break;
            case "LIC":
                $("#plan_id").rules("add", {
                    LIC_id: true
                });
                break;
            case "SSN":
                $("#plan_id").rules("add", {
                    SSN_id: true
                });
                break;
            case "TAX":
                $("#plan_id").rules("add", {
                    TAX_id: true
                });
                break;
            default:
                $("#plan_id").val("");
                $("#plan_typeid").val("");
                break;
        }
    });

    $("#plan_payment").click(function () {
        if ($("#booking-form").valid() !== true) {
            return false;
        }
        
        $("#rta").empty();
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: "/includes/emzac/ajax/booking.php",
            data: $("#booking-form").serialize(),
            cache: false,
            beforeSend: function () {
                $("#plan_payment").attr("disabled", "disabled");
                $("#gifsending_booking").show();
            },
            success: function (response) {
                if ( response.result === "error" ) {
                    $('#rta').addClass("bs-callout bs-callout-danger");
                } else {
                    $('#rta').addClass("bs-callout bs-callout-info");
                    $("#booking-form").clearForm();
                }
                
                $('#rta').html("<h4>"+response.msg[0]+"</h4>");
            },
            error: function () {
                $('#rta').addClass("bs-callout bs-callout-danger");
                $('#rta').html('<h4>Ha ocurrido un error al momento de realizar la acción</h4><div><br />Por favor verifique la información e intente realizar la acción nuevamente. En caso de volver a obtener una respuesta de error, le sugerimos comunicarse con uno de nuestros asesores de viajes quienes estarán dispuestos a brindarle la ayuda necesaria.</div>').fadeIn();
            },
            complete: function () {
                $("#gifsending_booking").hide();
                $("#plan_payment").removeAttr("disabled");
                scrollToElement('#rta');
            }
        });
    });

});