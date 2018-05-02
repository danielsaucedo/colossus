/*	$('#VerificInformacion').animate({width:"hide"})*/
//$('.banner').animate({ width: 0}, 'slow');

//$('.banner').slideUp('1000');

//fadein-out
//slideup, slidedown

jQuery(document).ready(function() {

	$('.opmenu').removeClass('seleccionada');
	$('#opAsistencia').addClass('seleccionada');

var getInstructores=$.ajax({	
				type: "GET",
	        	url: "data/instructores.php",
	        	dataType: "json",
 			 	data: { action: "lista"},
 			 	beforeSend:function(){

 			 		console.log('getInstructores');
 			 		
 			 		
 			 		
 			 	},
 			 	error:function(datos){
 			 		console.log('error');
 			 		
 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		
 			 		$.each(rx.instructores, function( i, item ) {
 			 			console.log(item.nombre);
 			 			console.log(item.id);
 			 			var opcionInstructor="<div class='optionInst' id='"+item.id+"'><span>"+item.nombre+"</span></div>"
 			 			$('#listaDesplegable').append(opcionInstructor);
 			 		});

 			 		
 			 	
 			 	

 			 	},//fin del success

	});//fin ajax



$('#listaDesplegable').hide();


$('#VerificInformacion').hide();

$('#instructorSeleccionado ').click(function(event) {
	$('#listaDesplegable').slideToggle();
});
$('#InstructorTurno').on('mouseleave',  function(event) {
	$('#listaDesplegable').slideUp();
});

	$("#userName-loginAlum").keyup(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13){
			$('#pass-loginAlum').focus();
		}
	});

	$("#pass-loginAlum").keyup(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13){
			$('#sendLoginData').trigger('click');
		}
	});

	$('#sendLoginData').click(function(event) {

		

		var checkSesionData=$.ajax({	
							type: "GET",
	        				url: "data/alumnos.php",
	        				dataType: "json",
 			 				data: { action: "checkSesionData", username:$("#userName-loginAlum").val().trim(), pass:$("#pass-loginAlum").val().trim()},
 			 				beforeSend:function(){
 			 					console.log('before checkSesionData');
 			 					
 			 				},
 			 				error:function(datos){
 			 					rx=datos
 			 					console.log(rx.error);
 			 					
 			 				},
 			 				success:function(datos){
 			 					rx=datos;
 			 					console.log(rx);
 			 					if (!(rx.cod)) {
 			 						alert(rx.text);
 			 					}else{
 			 						$('#idAlumno').val(rx.detalle.id)
 			 						$('#nombreA').text(rx.detalle.nombre);
 			 						$('#ultimaClase').text(rx.detalle.ultimaclase);
 			 						$('#vencimiento').text(rx.detalle.fechavencimiento);
 			 						$('#msg-checkInfo').html('');
 			 						$('#confirmValores').show();
 			 						
 			 						//convertimos la fecha de vencimiento a date (rx.detalle la tiene en formato string)
 			 						var venc=rx.detalle.fechavencimiento;
 			 						a=venc.substring(0,4);
  									m=venc.substring(5,7);
 									d=venc.substring(8,10);
 									var dateVenc= new Date(a,m-1,d);
 									console.log("dateVenc", dateVenc);

 									//obtener la fecha actual en formato date (enero =0)
 									var today= new Date();
 			 						today.setHours(0,0,0);

 			 						//comprobar vencimiento cuota{
 			 						if (today<dateVenc) {

 			 							console.log('cuota N O  vencida');
									//obtener la fecha actual en formato string
 			 							var hoy= new Date();
 			 						
 			 							hoy.setMonth(hoy.getMonth()+1);
 			 							hoy.setHours(0,0,0);
										console.log("hoy", hoy);
 			 							//convertir la fecha actual a string
 			 							var srtYear= hoy.getFullYear();
 			 							var srtMonth=(hoy.getMonth()<10)? '0'+hoy.getMonth():hoy.getMonth();
 			 							var srtDate= (hoy.getDate()<10)? '0'+hoy.getDate():hoy.getDate();
 			 							var srtHoy= srtYear+'-'+srtMonth+'-'+srtDate;
    								    								
 			 							if (!(rx.detalle.ultimaclase==null)) {
 			 							
 			 								if (rx.detalle.ultimaclase==srtHoy) {

 			 							    console.log("ultimaclase hoy, no se registra asistencia");
 			 							    $('#msg-checkInfo').html('Este alumno ya entreno el dia de hoy');
 			 							    $('#confirmValores').hide();
 			 								}
 			 							}

 			 						}else{
 			 							$('#msg-checkInfo').html('Cuota Vencida');
 			 							$('#confirmValores').hide();
 			 							console.log('cuota vencida');
 			 						}

 			 						//}

 			 						
 			 						var valorPropiedad= "url(data/"+rx.detalle.ruta+")";
 			 						var srcImg='data/'+rx.detalle.ruta;
 			 						var image  = new Image();
        	 						image.src=srcImg;
    								image.addEventListener("load", function () {

    				
    								var naturalh=image.height;
    								var naturalw=image.width;

    			 					if (naturalh>naturalw) {
    			 						var rh=200;
    			 						var ratio=naturalh/200;
    			 						var rw= naturalw/ratio; 
    			 					}else{
    			 						var rw=200;
    			 						var ratio= naturalw/200;
    			 						var rh= naturalh/ratio;
    			 					}
    			 	
    			 					$('#foto-checkInfo').css({
    			 						height: rh,
    			 						width: rw,	
    			 						'background': valorPropiedad,
 			 							'background-size': ' 100% 100%',
 			 							'background-repeat': 'no-repeat'
    			 		
    			 					});
    			 	
    			 
    								});

 			 						$('#loginAlumno').animate({'margin-left': '2%',
 			 													'margin-right': '0.5%'},
 			 													'slow', function() {
 			 															$('#VerificInformacion').fadeIn();
 			 																		});		
									
 			 					}
 			 					
 			 					},//fin del success

						});//fin ajax


		
	});


	$('#listaDesplegable').on('click', '.optionInst', function(event) {
		var nombreI=$(this).children('span').text();
		var idI=$(this).attr('id');
		$('#instructorSeleccionado').html(nombreI+' <span>&#9660</span>')
									.attr('data', idI);
		$('#InstructorTurno').trigger('mouseleave');

	});

	$('#confirmValores').click(function(event) {

			var idInstructor= $('#instructorSeleccionado').attr('data');
			if (idInstructor>0) {

				var idAlum=$('#idAlumno').val();

				var today= new Date();
				var strhora=(today.getHours()<10)?'0'+today.getHours():today.getHours();
				var strmin= (today.getMinutes()<10)?'0'+today.getMinutes():today.getMinutes();
				var milHora=""+strhora+strmin;
				
				today.setMonth(today.getMonth()+1);//enero=0
				//convertir la fecha actual a string
 				var srtYear= today.getFullYear();
 				var srtMonth=(today.getMonth()<10)? '0'+today.getMonth():today.getMonth();
 				var srtDate= (today.getDate()<10)? '0'+today.getDate():today.getDate();
 				var srtHoy= srtYear+'-'+srtMonth+'-'+srtDate;


			var thrAsistencia =$.ajax({
				url:  "data/asistencia.php",
				type: "GET",
				dataType: 'json',
				data: {action: 'registrar',alumno:idAlum, fecha:srtHoy, hora:milHora, instructor:idInstructor},
			
				success:function(datos){
					rx=datos;
					console.log( rx);
					console.log("success");
					alert("Informacion registrada correctamente");
					if (rx.cod) {
						$("#contenedor").load('includes/asistenciaAlumnos.html');
					}

				},
				error:function(datos){
					rx=datos;
					console.log(rx);
					alert(rx.text);
					console.log("error");
				}
			});
					
			
		}else{
			alert("Seleccionar Instructor de turno");
		}
		
		

	});
});