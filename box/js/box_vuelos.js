/**
 * AutocompleteboxjsonpController
 * 
 * @author Ing. Juan Garfias Vázquez
 * @email jgarfias@travelnet.com.mx
 * @version 2.0
 * @date 05/May/20014
 * 
 */
	$(function($) {

		// Traducción al español calendario.
		$.datepicker.regional['es'] = {
			closeText : 'Cerrar',
			prevText : '<Ant',
	        nextText: 'Sig>',
			currentText : 'Hoy',
			monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
					'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
					'Noviembre', 'Diciembre' ],
			monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
					'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
			dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
					'Viernes', 'Sábado' ],
			dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb' ],
			dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá' ],
			weekHeader : 'Sm',
			dateFormat : 'dd-mm-yy',
			firstDay : 0,
			isRTL : false,
			showMonthAfterYear : false,
			yearSuffix : '',

		};
		$.datepicker.setDefaults($.datepicker.regional['es']);

		// Inicia configuracion de calendario From - To
		$("#flight0startDate").datepicker(
				{
					minDate : 0,
					//defaultDate: "+1w",
					changeMonth : true,
					numberOfMonths : 2,
					onClose : function(selectedDate) {
						$("#flight0endDate").datepicker("option", "minDate",selectedDate);
						var arrayDate = selectedDate.split("-");
						//alert(arrayDate[2]+'-'+ arrayDate[0]+'-'+ (arrayDate[1] - 1));
						var fecha = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
						fecha.setDate(fecha.getDate() + 1);

						$("#flight0endDate").datepicker("setDate", fecha);
						
						$("#flight1startDate").datepicker("option", "minDate",selectedDate);
						var arrayDate = selectedDate.split("-");
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate() + 1);

						$("#flight1startDate").datepicker("setDate", fecha);
						
						$("#advertenciaFechaIda0").hide("fast");
						$("#advertenciaFechaRegreso0").hide("fast");
					}
				});
		
		$("#flight0endDate").datepicker({
			//defaultDate: "+1w",
			changeMonth : true,
			numberOfMonths : 2,
			onClose : function(selectedDate) {
				$("#flight0startDate").datepicker("option", "maxDate", selectedDate);
			}
		});
		
		
		$("#flight1startDate").datepicker(
				{
					minDate : 0,
					//defaultDate: "+1w",
					changeMonth : true,
					numberOfMonths : 2,
					onClose : function(selectedDate) {
						$("#flight2startDate").datepicker("option", "minDate",selectedDate);
						var arrayDate = selectedDate.split("-");
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate() + 1);
						$("#advertencia13").hide("fast");
						$("#flight2startDate").datepicker("setDate", fecha);
					}
				});
		
		$("#flight2startDate").datepicker(
				{
					minDate : 0,
					//defaultDate: "+1w",
					changeMonth : true,
					numberOfMonths : 2,
					onClose : function(selectedDate) {
						$("#flight3startDate").datepicker("option", "minDate",
								selectedDate);
						var arrayDate = selectedDate.split("-");
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate() + 1);
						$("#advertencia23").hide("fast");
						$("#flight3startDate").datepicker("setDate", fecha);
					}
				});
		
		$("#flight3startDate").datepicker(
				{
					minDate : 0,
					//defaultDate: "+1w",
					changeMonth : true,
					numberOfMonths : 2,
					onClose : function(selectedDate) {
						$("#flight4startDate").datepicker("option", "minDate",
								selectedDate);
						var arrayDate = selectedDate.split("-");
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate() + 1);
						$("#advertencia33").hide("fast");
						$("#flight4startDate").datepicker("setDate", fecha);
					}
				});
		
		$("#flight4startDate").datepicker(
				{
					minDate : 0,
					//defaultDate: "+1w",
					changeMonth : true,
					numberOfMonths : 2,
					onClose : function(selectedDate) {
						$("#flight5startDate").datepicker("option", "minDate",
								selectedDate);
						var arrayDate = selectedDate.split("-");
						var fecha = new Date(arrayDate[2], arrayDate[1]-1,arrayDate[0]);
						fecha.setDate(fecha.getDate() + 1);
						$("#advertencia43").hide("fast");
						$("#flight5startDate").datepicker("setDate", fecha);
					}
				});
		
		
		//Termina configuracion de calendario From - To

		$("#r1k").val(0);
		$("#flight0startDate").val("dd-mm-yyyy");
		$("#flight0endDate").val("dd-mm-yyyy");
		$("#flight1startDate").val("dd-mm-yyyy");
		$("#flight2startDate").val("dd-mm-yyyy");
		$("#flight3startDate").val("dd-mm-yyyy");
		$("#flight4startDate").val("dd-mm-yyyy");

		//Mostramos / ocultamos el texto por defecto si es necesario
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
		
		//Caja de texto que muestra la leyenda de la edad de los menores cuando esta aplica.
		$("#r1k").change(function() {


			var r1k = $("#r1k").val();
			if (r1k > 0) {
				$("#textr1k").show("slow");
			} else {
				$("#textr1k").hide("slow");
			}
			switch (r1k) {
			case "0":

				for( var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}

			break;
			case "1":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "2":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "3":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "4":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "5":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "6":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "7":
				for(var i=r1k ; i<=8 ; i++ ){
					$("#child_age_"+i).hide("slow");
					j=parseInt(i)+1;
					$("#r1k"+j+"a").val("");$("#s1k"+j).prop("checked",false);
					$("input[name=s1k"+j+"]").val(0);
				}
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			case "8":
				for(var i=0 ; i<r1k ; i++ ){
					$("#child_age_"+i).show("slow");
				}
			break;
			default:
			}
			if(r1k!=0){
				validar();
			}
		});

		textSearch($("#flight0from"), "Buscar Origen...");
		textSearch($("#flight0to"), "Buscar Destino...");
		textSearch($("#flight1from"), "Buscar Origen...");
		textSearch($("#flight1to"), "Buscar Destino...");
		textSearch($("#flight2from"), "Buscar Origen...");
		textSearch($("#flight2to"), "Buscar Destino...");
		textSearch($("#flight3from"), "Buscar Origen...");
		textSearch($("#flight3to"), "Buscar Destino...");
		textSearch($("#flight4from"), "Buscar Origen...");
		textSearch($("#flight4to"), "Buscar Destino...");
		textSearch($("#flight5from"), "Buscar Origen...");
		textSearch($("#flight5to"), "Buscar Destino...");
		
		//$("#flightType-roundtrip").attr("checked",true);

		$('#flightType-roundtrip').prop('checked', true);

		$("input[name=flightType]").click(function() {
			var tipo = $('input[name=flightType]:checked', '#formVuelos').val();
			switch (tipo) {

			case 'roundtrip':
				$("#fechaRegreso").show("slow");
				$("#relojRegresa").show("slow");
				$("#multiplesDestinos").hide("slow");
				//$( "#endDate").css("color","#a3a3a3");
				multiplesVuelosDisabled(1);
				multiplesVuelosDisabled(2);
				multiplesVuelosDisabled(3);
				multiplesVuelosDisabled(4);
				$("#destino2").hide("slow");
				 $("#destino3").hide("slow");
				 $("#destino4").hide("slow");
				break;
			case 'oneway':
				$("#fechaRegreso").hide("slow");
				$("#relojRegresa").hide("slow");
				$("#multiplesDestinos").hide("slow");
				//$( "#endDate").css("color","red");
				multiplesVuelosDisabled(1);
				multiplesVuelosDisabled(2);
				multiplesVuelosDisabled(3);
				multiplesVuelosDisabled(4);
				 $("#destino2").hide("slow");
				 $("#destino3").hide("slow");
				 $("#destino4").hide("slow");
				 
				break;
			case 'multiple':
				$("#fechaRegreso").hide("slow");
				$("#relojRegresa").hide("slow");
				$("#multiplesDestinos").show("slow");
				$("#agregarDestino").show("slow");
				$("#eliminarDestino").hide("slow");
				multiplesVuelosDisabledRemove(1);
				
				break;
			default:

				break;
			}
		});

		//var jsonpurl="http://192.168.20.17/tnw/html/Autocompleteboxjsonp/vuelosv2?callback=?";
		var jsonpurl="https://www.travelnet.com.mx/Autocompleteboxjsonp/vuelosv2?callback=?";
		var jsonpaerolineas="https://www.travelnet.com.mx/Autocompleteboxjsonp/aerolineas?callback=?";
		
		var limit=$("#limit") .val();
		
		
		
		$("#flight0from").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
							
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {
				
				$("#cFrom").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertenciaOrigen1").hide("fast");

				
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});

		$("#flight0to").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cTo").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertenciaDestino1").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		///////////////////////////////////
		
		$("#flight1from").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cFrom1").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia11").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});

		$("#flight1to").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cTo1").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia12").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		//////////////////////////
		///////////////////////////////////
		
		$("#flight2from").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cFrom2").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia21").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});

		$("#flight2to").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cTo2").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia22").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
		//////////////////////////
		
		$("#flight3from").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cFrom3").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia31").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});

		$("#flight3to").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cTo3").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia32").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		/////////////////////////////
		
		$("#flight4from").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cFrom4").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia41").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});

		$("#flight4to").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpurl,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							
							var ciudad=item.split("|");
							return ({
								label : ciudad[0] + ", "+ciudad[1]+"",
								value : ciudad[0],
								cFrom : ciudad[2]
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#cTo4").val(ui.item.cFrom);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */
				$("#advertencia42").hide("fast");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
		
/////////////////////////////////////////////////////////////////////////////////
		
		$("#airline").autocomplete({
			source : function(request, response) {
				$.ajax({
					url : jsonpaerolineas,
					dataType : "jsonp",
					data : {
						q : request.term,
						limit:limit
					},
					success : function(data) {
						response($.map(data, function(item) {
							return ({
								label : item.aerolinea,
								airline_code : item.code
							});
						}));
					}
				});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {

				$("#airline_code").val(ui.item.airline_code);
				/*
				log( ui.item ?
				"Selected: " + ui.item.label :
				"Nothing selected, input was " + this.value);
				 */

			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function() {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			}
		});
///////////////////////////////////////////////////////////////////////////////		
		 $( "#radioVuelos" ).buttonset();
		 
		 $( "button:first" ).button({
			 icons: {
			 primary: "ui-icon-plusthick"
			 },
			 text: false
			 }).next().button({
			 icons: {
			 primary: "ui-icon-minusthick"
			 },text: false
			});
		 
		 $( "#agregarDestino" ).click(function(e) {
			 e.preventDefault();
			 var d2=0;
			 var d3=0;
			 var d4=0;
			 if($("#destino2").css("display")!="none"){ d2 = 1; }
			 if($("#destino3").css("display")!="none"){ d3 = 1; }
			 if($("#destino4").css("display")!="none"){ d4 = 1; }

			 if(d2==0){
				 $("#destino2").show("slow");
				 multiplesVuelosDisabledRemove(2);
				 $("#eliminarDestino").show("slow");
			 }else{
				 if( d3 == 0 ){
					 $("#destino3").show("slow");
					 multiplesVuelosDisabledRemove(3);
				 }else{
					 if(d4== 0){
						 $("#agregarDestino").hide("slow");
						 $("#destino4").show("slow");
						 multiplesVuelosDisabledRemove(4);
					 }
				 }
			 }
		 });
		 
		 $( "#eliminarDestino" ).click(function(e) {
			 e.preventDefault();
			 var d2=0;
			 var d3=0;
			 var d4=0;
			 if($("#destino2").css("display")!="none"){ d2 = 1; }
			 if($("#destino3").css("display")!="none"){ d3 = 1; }
			 if($("#destino4").css("display")!="none"){ d4 = 1; }

			 if(d4!=0){
				 $("#destino4").hide("slow");
				 $("#agregarDestino").show("slow");
				 multiplesVuelosDisabled(4);
			 }else{
				 if( d3 != 0 ){
					 $("#destino3").hide("slow");
					 multiplesVuelosDisabled(3);
				 }else{
					 $("#destino2").hide("slow");
					 multiplesVuelosDisabled(2);
					 $("#eliminarDestino").hide("slow");
					 
				 	}
			 }

			 });

		function multiplesVuelosDisabled(k){
		 $("#flight"+k+"from").attr('disabled', 'disabled');
		 $("#cFrom"+k).attr('disabled', 'disabled');
		 $("#flight"+k+"to").attr('disabled', 'disabled');
		 $("#cTo"+k).attr('disabled', 'disabled');
		 $("#flight"+k+"startDate").attr('disabled', 'disabled');
		 $("#sh"+k).attr('disabled', 'disabled');
	 
		}
		
		function multiplesVuelosDisabledRemove(k){
			 $("#flight"+k+"from").removeAttr('disabled'); 
			 $("#cFrom"+k).removeAttr('disabled'); 
			 $("#flight"+k+"to").removeAttr('disabled'); 
			 $("#cTo"+k).removeAttr('disabled'); 
			 $("#flight"+k+"startDate").removeAttr('disabled'); 
			 $("#sh"+k).removeAttr('disabled'); 
		
			 //textSearch($("#flight"+k+"from"), "Buscar Origen...");
				//textSearch($("#flight"+k+"to"), "Buscar Destino...");
				 //$("#flight"+k+"from").val("Buscar Origen...");
				 //textSearch($("#flight"+k+"from"), "Buscar Origen...");
				 //$("#flight"+k+"to").val(""); 
			 
			 //$("#cFrom"+k).val("");
			 
			 //$("#cTo"+k).val("");
			 $("#flight"+k+"startDate").val("dd-mm-yyyy");
			 $("#sh"+k).val("NA");
			 
			}

		for(var k=1;k<5;k++){
			 multiplesVuelosDisabled(k);
		}
		
			$("#ver_precios").click(function(e) {
				e.preventDefault();
				var validador=validar();
				var validadorfechas=0;
				var validadordestinos=0;
				var tipo = $('input[name=flightType]:checked', '#formVuelos').val();

				switch (tipo) {
				case 'roundtrip':
					///////// evaluacion fechas
					if(($("#flight0startDate").val())=="dd-mm-yyyy"){ 
							$("#advertenciaFechaIda0").show("fast");
							validadorfechas++;
						}else{ 
							$("#advertenciaFechaIda0").hide("fast");
						}
					if(($("#flight0endDate").val())=="dd-mm-yyyy"){
							$("#advertenciaFechaRegreso0").show("fast");
						}else{ 
							$("#advertenciaFechaRegreso0").hide("fast");
						}
					
					///////////////// evaluacion destinos
					
					if(($("#cFrom").val())==""){
						$("#advertenciaOrigen1").show("fast");
						validadordestinos++;
					}else{ 
						$("#advertenciaOrigen1").hide("fast");
					}
					
					if(($("#cTo").val())==""){
						$("#advertenciaDestino1").show("fast");
						validadordestinos++;
					}else{ 
						$("#advertenciaDestino1").hide("fast");
					}
					
					if(($("#cFrom").val())!="" && $("#cTo").val()!=""){
						
					}
					
					break;
				case 'oneway':
					///////// evaluacion fechas
					if(($("#flight0startDate").val())=="dd-mm-yyyy"){ 
							$("#advertenciaFechaIda0").show("fast"); 
							validadorfechas++;
						}else{ 
							
							$("#advertenciaFechaIda0").hide("fast");
						}

					///////////////// Evaluacion de destinos.
					
					if(($("#cFrom").val())==""){
						$("#advertenciaOrigen1").show("fast");
						validadordestinos++;
					}else{ 
						$("#advertenciaOrigen1").hide("fast");
						
					}
					
					if(($("#cTo").val())==""){
						$("#advertenciaDestino1").show("fast");
						validadordestinos++;
					}else{ 
						$("#advertenciaDestino1").hide("fast");
						
					}
					

					if(($("#cFrom").val())!="" && $("#cTo").val()!=""){
						
					}
					break;
				case 'multiple':
					
					///////////////// Evaluacion de destinos.
					
					if(($("#cFrom").val())==""){
						$("#advertenciaOrigen1").show("fast");
						validadordestinos++;
					}else{ 
						$("#advertenciaOrigen1").hide("fast");
					}
					
					if(($("#cTo").val())==""){
						$("#advertenciaDestino1").show("fast");
						validadordestinos++;
					}else{ 
						$("#advertenciaDestino1").hide("fast");
					}
					if(($("#flight0startDate").val())=="dd-mm-yyyy"){ 
						$("#advertenciaFechaIda0").show("fast"); 
						 validadorfechas++;
					}else{ 
						$("#advertenciaFechaIda0").hide("fast");
					}
					
					 var d2=0;
					 var d3=0;
					 var d4=0;
					 if($("#destino2").css("display")!="none"){ d2 = 1; }
					 if($("#destino3").css("display")!="none"){ d3 = 1; }
					 if($("#destino4").css("display")!="none"){ d4 = 1; }

					 var evalMulti=parseInt(d2+d3+d4+1);
					 for(var k=0;k<evalMulti;k++){
						 if ($("#cFrom" + (k + 1)).val() == "") {
							$("#advertencia" + (k + 1) + "1").show("fast");
							validadordestinos++;
						} else {
							$("#advertencia" + (k + 1) + "1").hide("fast");
						}
		
						if ($("#cTo" + (k + 1)).val() == "") {
							$("#advertencia" + (k + 1) + "2").show("fast");
							validadordestinos++;
						} else {
							$("#advertencia" + (k + 1) + "2").hide("fast");
						}
						
						if ($("#flight" + (k + 1) + "startDate").val() == "dd-mm-yyyy") {
							$("#advertencia" + (k + 1) + "3").show("fast");
							 validadorfechas++;
						} else {
							$("#advertencia" + (k + 1) + "3").hide("fast");
						}

					 }
					
					break;
				default:
					break;
				}
				
				if (validador==1 && validadorfechas==0 && validadordestinos==0 ) {
					var msg=$("#searchingLabel").val();
					var img=$("#searchingImg").val(); 
					$.blockUI({ 
				            message: "<center><h2>"+msg+"</h2><img src='"+img+"'><br></center> "
				        }); 
					$("#formVuelos").submit();
				
				} 
			});

			$( "#adulto" ).change(function() {
				validar();
			});
			$("#flights[1]").attr('disabled','disabled');
			$("#flights[2]").attr('disabled','disabled');
			$("#flights[3]").attr('disabled','disabled');
			$("#flights[4]").attr('disabled','disabled');
			
	});
		
	 function muestraBotonAsiento(valor,divAsiento,checkAsiento){
		 if(valor<2 && valor!=""){
			 $("#"+divAsiento).show("fast");
			 
		 }else{
			 $("#"+checkAsiento).prop("checked",false);
			 $("#"+divAsiento).hide("fast");
			 
		 }
		 validar();
	 }
		 
		 function fnSetValInfants(id){
			 if($("#"+id).is(':checked')) {
				 	$("input[name="+id+"]").val("1");
					validar();
		        } else {         	
		        	$("input[name="+id+"]").val("0");
		        	validar();
		        }
		 }
	 
		 function validar(){
					var validador=0;
					var ninos=$("#r1k").val();
					
					for(var i=1;i<=ninos;i++){
						var valAux=parseInt($("input[name=s1k"+i+"]").val());
						valAux==0 ? valAux=1 : valAux=0;
						var edadninos=parseInt($("#r1k"+i+"a").val());
						
						 if(isNaN(edadninos)){
							 console.log("es numero raro");
						 }
						console.log(edadninos);
						
						if(edadninos < 2 ){
						validador=validador+valAux;
						}
					}
						if(validador>parseInt($("#adulto").val())){
							$("#error").show("fast");
							return 0;
						}else{
							$("#error").hide("fast");
							return 1;
						}
		 }

