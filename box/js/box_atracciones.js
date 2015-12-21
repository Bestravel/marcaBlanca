/**
 * AutocompleteboxjsonpController
 * 
 * @author Ing. Juan Garfias Vázquez
 * @email jgarfias@travelnet.com.mx
 * @version 2.0
 * @date 05/May/20014
 */

$(function($){
		$.datepicker.regional['es'] = {
				closeText : 'Cerrar',
				prevText : '<Ant',
				nextText : 'Sig>',
				currentText : 'Hoy',
				monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
						'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
						'Diciembre' ],
				monthNamesShort : [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul',
						'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
				dayNames : [ 'Domingo', 'Lunes', 'Martes', 'Mi\u00E9rcoles', 'Jueves',
						'Viernes', 'S\u00E1bado' ],
				dayNamesShort : [ 'Dom', 'Lun', 'Mar', 'Mi\u00E9', 'Juv', 'Vie', 'S\u00E1b' ],
				dayNamesMin : [ 'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S\u00E1' ],
				weekHeader : 'Sm',
				dateFormat : 'dd-mm-yy',
				firstDay : 0,
				isRTL : false,
				showMonthAfterYear : false,
				yearSuffix : ''
			};
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
									$("#endDate").datepicker({
										defaultDate : "+1d",
										changeMonth : true,
										numberOfMonths : 2,
										onClose : function(selectedDate) {
										}
									});
									}		
									$("#warningDate").hide("slow");
									$("#endDate").datepicker("option", "minDate",selectedDate);
									var arrayDate = selectedDate.split("-");
									var fecha = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
									var fechaMas30 = new Date(arrayDate[2],(arrayDate[1] - 1), arrayDate[0]);
									fecha.setDate(fecha.getDate() + 1);
									fechaMas30.setDate(fechaMas30.getDate() + 29);
									$("#endDate").datepicker("setDate", fecha);
									$("#endDate").datepicker("option", "maxDate",fechaMas30);			
								}
							});
		// Finaliza configuracion y control de calendarios
			//Caja de texto que muestra la leyenda de la edad de los menores cuando esta aplica.
			$( "#r1k" ).change(function() {
				var r1k=$( "#r1k" ).val();
				if(r1k>0){$( "#textr1k" ).show("blind");}else{$( "#textr1k" ).hide("blind");}
				 
				for(var i=r1k;i<=8;i++){
					$( "#child_age_"+i).val(0);
					$( "#child_age_"+i).hide("blind");
				}
				for(var i=0;i<r1k;i++){
					$( "#child_age_"+i).show("blind");
				}
			});
		//Boton que lanza el mensaje de dialogo siempre y cuando cumpla la regla de tener ya una fecha seleccionada.
		$("#searchActivities").click(function(e) {
			e.preventDefault();		
			var startDate = $("#startDate").val();
			var rowID = $("#rowID").val();
			if (startDate == "dd-mm-yyyy" || rowID=="") {
				if(startDate=="dd-mm-yyyy"){$("#warningDate").show("slow");}else{$("#warningDate").hide("slow");}
				if(rowID==""){$("#warningCity").show("slow");}else{$("#warningCity").hide("slow");}
			} else {
				var msg=$("#searchingLabel").val();
				var img=$("#searchingImg").val();
				 $.blockUI({ 
			            message: "<center><h2>"+msg+"</h2><img src='"+img+"'><br></center> "
			        }); 
				$("#form1").submit();
			}
		});
		var lang=$("#lang").val();
		var limit=$("#limit").val();
		$("#destino").autocomplete({
			source : function(request, response) {
				$.ajax({
					//url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/ciudadesv2?callback=?",
					url : "https://www.travelnet.com.mx/Autocompleteboxjsonp/ciudadesv2?callback=?",
					//url : "http://192.168.20.17/Autocompleteboxjsonp/ciudadesv2?callback=?",
							dataType : "jsonp",
							data : {
								q : request.term,
								lang : lang,
								limit : limit
							},
							success : function(data) {
								$("#rowID").val("");
								response($.map(data,function(item) {
													var ciudad=item.split("|");
													return {
														label : ciudad[0] + ", "+ciudad[1]+"",
														value : ciudad[0],
														citycode : ciudad[2]
													};
												}));
							}
						});
			},
			minLength : 2,
			maxLength : 5,
			select : function(event, ui) {	
				$("#rowID").val(ui.item.citycode);
				$("#warningCity").hide("slow");
			},
			open : function() {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close : function(event, ui) {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
				
				if($("#rowID").val()==""){
					$("#warningCity").show("slow");
				}	
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
		textSearch($("#destino"),$("#destino").val());		
	});
