/**
 * AutocompleteboxjsonpController
 * 
 * @author Ing. Juan Garfias V醶quez
 * @email jgarfias@travelnet.com.mx
 * @version 2.0
 * @date 06/May/20014
 */	
// Traducci贸n al espa帽ol calendario.
	$(function($){
		$.datepicker.regional['es'] = {
			closeText : 'Cerrar',
			prevText : '<Ant',
			nextText : 'Sig>',
			currentText : 'Hoy',
			monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre' ],
			monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul','Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
			dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Mi\u00E9rcoles', 'Jueves','Viernes', 'S\u00E1bado' ],
			dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mi\u00E9', 'Juv', 'Vie', 'S\u00E1b' ],
			dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\u00E1' ],
			weekHeader : 'Sm',
			dateFormat : 'dd-mm-yy',
			firstDay : 0,
			isRTL : false,
			showMonthAfterYear : false,
			yearSuffix : ''};
		
		$.datepicker.setDefaults($.datepicker.regional['es']);
		// Inicializa configuracion y control de calendarios
		$("#startDate")
				.datepicker(
						{
							minDate : 0,
							changeMonth : true,
							numberOfMonths : 2,
							onClose : function(selectedDate) {
								if($("#startDate").val()!="dd-mm-yyyy"){
									$("#advertencia").hide("blind");
									$("#endDate").datepicker({
										defaultDate : "+1d",
										changeMonth : true,
										numberOfMonths : 2,
										onClose : function(selectedDate) {
										}
									});
									}	
								
								$("#endDate").datepicker("option", "minDate",selectedDate);
								var arrayDate = selectedDate.split("-");
								var fecha = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
								var fechaMas30 = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
								fecha.setDate(fecha.getDate() + 1);
								fechaMas30.setDate(fechaMas30.getDate() + 29);
								$("#endDate").datepicker("setDate", fecha);
								$("#endDate").datepicker("option", "maxDate", fechaMas30);
							}
		});
	// Finaliza configuracion y control de calendarios

	$( "#dialog" ).dialog({
		autoOpen: false,
		modal:true,
		show: {
		effect: "fold",
		duration: 1000
		},
		hide: {
		effect: "fold",
		duration: 1000
		}
	});

	$( "#dialog" ).dialog({ width: 750,height: 120 });
	//Termina configuracion de men

	//Inicializa variables.
	$( "#r1k" ).val(0);
	$( "#round").attr("checked",false);
	$( "#trans").val("");
	$( "#hotel").val("");
	$( "#startDate").val("dd-mm-yyyy");
	$( "#totime").val("00:00");
	$( "#fromtime").val("00:00");
	$( "#totime_horas").val("00");
	$( "#totime_minutos").val("00");
	$( "#fromtime_horas").val("00:00");
	$( "#fromtime_minutos").val("00:00");

	//Caja de texto que muestra la leyenda de la edad de los menores cuando esta aplica.
	$( "#r1k" ).change(function() {
		var r1k=$( "#r1k" ).val();
		if(r1k>0){$( "#textr1k" ).show("blind");}else{$( "#textr1k" ).hide("blind");}
		 
		for(var i=r1k;i<=7;i++){
			$( "#child_age_"+i).val(0);
			$( "#child_age_"+i).hide("blind");
		}
		for(var i=0;i<r1k;i++){
			$( "#child_age_"+i).show("blind");
		}
	});

	//Para indicar que se requiere el viaje de regreso  y muestre el segundo calendario.
	$( "#round" ).click(function() {
		if($(this).is(":checked")) {
			$( "#fechaRegreso").val("dd-mm-yyyy");
			$( "#fechaRegreso").show("blind");
			$( "#horaRegreso").show("blind");
			$( "#minRegreso").show("blind");
			$( "#advertencia").hide("blind");
		}else{
			$( "#fechaRegreso").val("dd-mm-yyyy");
			$( "#fechaRegreso").hide("blind");
			$( "#horaRegreso").hide("blind");
			$( "#minRegreso").hide("blind");
		}
	});

	$( "#pickup" ).change(function(){
		var pickup=$( "#pickup").val();
			if(pickup=="H"){
				$( "#fechaRegreso").val("dd-mm-yyyy");
				$( "#fechaRegreso").hide("blind");
				$( "#horaRegreso").hide("blind");
				$( "#minRegreso").hide("blind");	
				$( "#id_regreso").hide("blind");	
			}else{
				$( "#id_regreso").show("blind");	
				$( "#round").attr("checked",false);
			}
	});
	
	$( "#dropoff" ).change(function(){
		var pickup=$( "#dropoff").val();
			if(pickup=="A"){
				$( "#fechaRegreso").val("dd-mm-yyyy");
				$( "#fechaRegreso").hide("blind");
				$( "#horaRegreso").hide("blind");
				$( "#minRegreso").hide("blind");	
				$( "#id_regreso").hide("blind");	
			}else{
				$( "#id_regreso").show("blind");	
				$( "#round").attr("checked",false);
			}
	});

	//Boton que lanza el mensaje de dialogo siempre y cuando cumpla la regla de tener ya una fecha seleccionada.
	$( "#ver_precios" ).click(function(e) {
	    e.preventDefault();
		var startDate=$( "#startDate").val();
		if(startDate=="dd-mm-yyyy" || $("#destino").val()=="" || $("#destino").val()=="Buscar Ciudad..."){
			
			($("#startDate").val()=="dd-mm-yyyy" ) ? $("#advertencia").show("blind") : $("#advertencia").hide("blind");
			($("#destino").val()=="" || $("#destino").val()=="Buscar Ciudad..." ) ? $("#llegada_required1").show("blind") : $("#llegada_required1").hide("blind");
			($("#llegada").val()=="" || $("#llegada").val()=="Buscar Ciudad..." ) ? $("#llegada_required2").show("blind") : $("#llegada_required2").hide("blind");
			
		}else{
			$("#advertencia").hide();
			$("#llegada_required1").hide();
			$("#llegada_required2").hide();
			var idDC=$("#dc").val();
			var idAC=$("#ac").val();
			var pickup=$("#pickup").val();
			var dropoff=$("#dropoff").val();
			$.ajax({
				url: "https://www.travelnet.com.mx/Autocompleteboxjsonp/trasladohotelaeropuerto?callback=?",
				// the name of the callback parameter, as specified by the YQL service
				jsonp: "callback",
				// tell jQuery we're expecting JSONP
				dataType: "jsonp",
				// tell YQL what we want and that we want JSON
				data: {ac:idDC,dc:idAC,'do':pickup,pu:dropoff},
				// work with the response
				success: function( response ) {
					$( "#trans" ).empty();
					$( "#trans" ).append( "<option value='0'>Seleccione un Aeropuerto...</option>" );
					$( "#hotel" ).empty();
					$( "#hotel" ).append( "<option value='0'>Seleccione un Hotel...</option>" );
					
					$.each( response, function( key, value ) {
	
						$.each( value, function( key2, value2 ) {
						if(key=="hotels"){
							$( "#hotel" ).append( "<option value='"+value2.hotel_code+"'>"+value2.name+"</option>" );
						}else{
							$( "#trans" ).append( "<option value='"+value2.terminal+"'>"+value2.name+"</option>" );
						}
						});
					});
	
				}
			});
			$( "#dialog" ).dialog( "open" );
			$( "#dialog" ).css("width","800px");
		}
	});

	//Funci贸n que se asegura que el traslado se de A-H o H-A
	$( "#pickup" ).change(function(){
		var pickup=$( "#pickup").val();
		if(pickup=="H"){
			$( "#dropoff").val("A");
		}else{
			$( "#dropoff").val("H");
		}
	});
	$( "#dropoff" ).change(function(){
		var pickup=$( "#dropoff").val();
		if(pickup=="H"){
			$( "#pickup").val("A");
		}else{
			$( "#pickup").val("H");
		}
	});

	//Boton de continuar y que envia la peticion a travelnet siempre y cuando cumpla con la seleccion de hotel y aeropuerto.
	$( "#continuar" ).click(function() {
		var trasEval=$( "#trans").val();
		var hotelEval=$( "#hotel").val();
		if(trasEval!=0 && hotelEval!=0){
			var msg=$("#searchingLabel").val();
			var img=$("#searchingImg").val();
			 $.blockUI({ 
		            message: "<center><h2>"+msg+"</h2><img src='"+img+"'><br></center> "
		        }); 
	   		$( "#form1" ).submit();
		}else{

			if(trasEval==0){ $("#errorAirport").show("blind");}
			if(hotelEval==0){ $("#errorHotel").show("blind");}
			
		}
	});

	//Llena los campos invisibles de la hora completa de ida y regreso "00:00"
	$( "#fromtime_horas" ).change(function(){
		var fromtime_horas=$( "#fromtime_horas").val();
		var fromtime_minutos=$( "#fromtime_minutos").val();
		$( "#fromtime").val(fromtime_horas+":"+fromtime_minutos);
	});

	$( "#fromtime_minutos" ).change(function(){
		var fromtime_horas=$( "#fromtime_horas").val();
		var fromtime_minutos=$( "#fromtime_minutos").val();
		$( "#fromtime").val(fromtime_horas+":"+fromtime_minutos);
	});

	$( "#totime_horas" ).change(function(){
		var fromtime_horas=$( "#totime_horas").val();
		var fromtime_minutos=$( "#totime_minutos").val();
		$( "#totime").val(fromtime_horas+":"+fromtime_minutos);
	});

	$( "#totime_minutos" ).change(function(){
		var fromtime_horas=$( "#totime_horas").val();
		var fromtime_minutos=$( "#totime_minutos").val();
		$( "#totime").val(fromtime_horas+":"+fromtime_minutos);
	});

	//Funcion que crea el UniqID
	function uniqid() {
	    var ts=String(new Date().getTime()), i = 0, out = '';
	    for(i=0;i<ts.length;i+=2) {        
	       out+=Number(ts.substr(i, 2)).toString(36);    
	    }
	    return ('d'+out);
	}
	var idUniq=uniqid();
	$( "#idUniq").val(idUniq);

	//Funci贸n que asigna los valores de la selecci贸n de Hotel y Aeropuerto a sus campos invis铆bles.
	$( "#trans" ).change(function(){
		$( "#trans_name").val($( "#trans").val());
	});

	$( "#hotel" ).change(function(){
		$( "#hotel_name").val($( "#hotel").val());
	});

});
	
	$(function($) {
		$("#llegada").autocomplete({
			source : function(request, response) {
				$.ajax({
							//url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/traslados?callback=?",
							url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/trasladosv2?callback=?",
							//url : "http://192.168.20.17/Autocompleteboxjsonp/trasladosv2?callback=?",
							dataType : "jsonp",
							data : {
								q : request.term,
								b : "Hotelbeds"
							},
							success : function(data) {
								$("#ac").val("");
								$("#dc").val("");
								response($.map(data,function(item) {
													var ciudad=item.split("|");
													return {
														label : ciudad[0] + ", "+ciudad[1]+"",
														value : ciudad[0],
														code : ciudad[2]
													};
												}));
							}
						});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {
				$("#destino").val(ui.item.value);
				$("#ac").val(ui.item.code);
				$("#dc").val(ui.item.code);
				$("#llegada_required1").hide("blind");
					},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
					},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
				if($("#ac").val()==""){
					$("#llegada_required1").show("blind");
				}	
			}
		});
		
		$("#destino").autocomplete({
			source : function(request, response) {
				$.ajax({
							url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/trasladosv2?callback=?",
							//url : "http://192.168.20.17/Autocompleteboxjsonp/trasladosv2?callback=?",
							dataType : "jsonp",
							data : {
								q : request.term,
								b : "Hotelbeds"
								
							},
							success : function(data) {
								response($.map(data,function(item) {
													var ciudad=item.split("|");
													return {
														label : ciudad[0] + ", "+ciudad[1]+"",
														value : ciudad[0],
														code : ciudad[2]
													};
												}));
							}
						});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {
				$("#dc").val(ui.item.code);
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass(
						"ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass(
						"ui-corner-all");
			}
		});
		
		function textSearch(id, defaultText) {
			id.focus(function() {
				if ($(this).attr("value") == defaultText)
					$(this).attr("value", "");
			});
			id.blur(function() {
				if ($(this).attr("value") == "")
					$(this).attr("value", defaultText);
			});
		}
		textSearch($("#llegada"), $("#llegada").val());
		textSearch($("#destino"), "Buscar Ciudad...");
	});