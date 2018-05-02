$(document).ready(function () {
	
$("div[role='dialog']").remove();
var dialogUI='<div id="cuponesPago" title="Pago a Instructores"><input type="hidden" id="idEmpleado"><input type="hidden" id="cuponesA">Cupones a pagar <input type="number" min="1" step="1" class="controlDialog" id="cuponesPagar">Monto	<input type="number" min="0" step="0.1" class="controlDialog" id="montoPagar"></div>';
var dialogUI2='<div id="encargadoLogin" title="Verificacion de Permisos"><input type="hidden" id="idEncargado" value="0">Usuario		<input type="text" id="encargadoUser" placeholder="Nombre usuario" class="controlDialog"><br>Password	<input type="password" id="encargadoPass" placeholder="Password"  class="controlDialog"></div>';

$("#dialogos").append(dialogUI);
$("#dialogos").append(dialogUI2);

		$('#cuponesPago').dialog({
		autoOpen: false,
		modal: true,
		
		show: {
			effect: "blind",
			duration: 900
		},
		hide: {
			effect: "explode",
			duration: 500
		},
		buttons: {
			"Aceptar": function () {

				pagarCupones();			
			
			},
			"Cerrar": function () {

			$('#cuponesPago').dialog().dialog("close");
			$('.controlDialog').val('');
			}
		}

	});


	$('#encargadoLogin').dialog({
		autoOpen: false,
		modal: true,
		width       :   335,
        heigth      :   105,
		show: {
			effect: "blind",
			duration: 900
		},
		hide: {
			effect: "explode",
			duration: 900
		},
		buttons: {
			"Aceptar": function () {
			
		encargadoLogin($('#encargadoUser').val(),$('#encargadoPass').val());
			},
			"Cerrar": function () {

			$('#encargadoLogin').dialog().dialog("close");
			$('.controlDialog').val('');
			}
		}

	});

	$('.opmenu').removeClass('seleccionada');
	$('#opInstructores').addClass('seleccionada');	   
	    	$.ajax({
							type: "GET",
	        				url: "data/instructores.php",
	        				dataType: "json",
 			 				data: { action: "lista"},
 			 				beforeSend:function(){
 			 					console.log('lista instructores');
 			 					
 			 				},
 			 				error:function(datos){
 			 					rx=datos
 			 					
 			 					
 			 				},
 			 				success:function(datos){
 			 					rx=datos;
 			 					console.log(rx);
 			 					
								
 			 					if (rx.instructores) {
 			 						$.each(rx.instructores, function( i, item ) {
		       			
		       							fila="<div class='datosinstructor'><div class='titulo'></div><div class='datosinstructores' id='nombreinstructor'>"+item.nombre+"</div><div class='datosinstructores' id='userinstructor'>"+item.user+"</div><div class='datosinstructores' id='telefonoinstructor'>"+item.telefono+"</div><div class='datosinstructores' id='cuponinstructor'>"+item.cupon+"</div>"
		       							fila+="<div class='opstarjeta'><div class='opt' id='optupdate' data='"+item.id+"'><span class='tooltiptext'>Modificar</span></div><div class='opt' id='optcash' cupones='"+item.cupon+"' data='"+item.id+"'><span class='tooltiptext'>Pagar</span></div><div class='opt' id='optmore' data='"+item.id+"'><span class='tooltiptext'>Opciones</span></div></div></div>";
		       							$('#tarjeta1').append(fila);
		       						});
	
 			 					}else{
 			 						
 			 						
 			 					}	
 			 	
 			 			
		
 			 				},//fin del success

						});//fin ajax
      
$('.btnRegistrar').on('mouseenter', function(){
	$('.infobtn').css('display','inline');
});
$('.btnRegistrar').on('mouseleave', function(){
	$('.infobtn').css('display','none');
});


$('.btnRegistrar').click(function(){
	$("#contenedor").load('includes/alta_instructores.html');
});	               
	
$('#tarjeta1').on('click','#optupdate',function(){
	$('.divmodal').css('display','inline');
	$('.updateconteiner').load("includes/updateinstructores.html")
	id=$(this).attr('data')
	
	$.ajax({
		type: "GET",
	  	url: "data/instructores.php",
	  	dataType: "json",
 	  	data: { action: "detalle",$id:id},
 	  	beforeSend:function(){
 	  		console.log('detalle voy');

 	  	},
 	  	error:function(datos){
 	  		console.log('error');
 	  		rx=datos;
 	  		console.log(rx);
 	  	},
 	  	success:function(datos){
 	  		console.log('success');
 	  		rx=datos;
 	  		console.log(rx);

 	  	}



	});//fin del ajax

});


$('#tarjeta1').on('click', '#optcash', function(event) {

	var cupones= $(this).attr('cupones');
	var idEmple= $(this).attr('data');
	if (cupones>0) {
		$('#cuponesPagar').attr('max', cupones);
		$('#idEmpleado').val(idEmple);
		$('#cuponesPagar').val(cupones);
		$('#cuponesA').val(cupones);
				


		$('#encargadoLogin').dialog().dialog("open");

	}else{
		alert('El instructor no posee cupones que cobrar');
	}

});

});//fin ready
function encargadoLogin(encargadoUser, encargadoPass){

var resultLogin=false;
		var thrInstructorLogin= $.ajax({
			url: 'data/instructores.php',
			type: 'GET',
			dataType: 'json',
			data: {action: 'checkEncargado', username:encargadoUser , pass:encargadoPass},
			beforeSend:function(){
			 console.log('before Encargado Login');
			
			},
			error:function(datos){
				rx=datos;
				console.log( rx);
				console.log("error");
				resultLogin= false;



			},
			success:function(datos){
				rx=datos;
				console.log('success');
				console.log(rx);

				if (rx.cod==1) {
				
					$('#idEncargado').val(rx.detalle.id);
					resultLogin= true;
				}else{
					alert(rx.text);
					resultLogin= false;
				}
			},
	
		});
		$.when(thrInstructorLogin).then(function () {

		if (resultLogin==true) {
			$('#encargadoLogin').dialog().dialog("close");
			$('#cuponesPago').dialog().dialog("open");

		}
	});






}
function pagarCupones(){
	var actual= new Date();
    		actual.setMonth(actual.getMonth()+1);

    		var strDiaA= (actual.getDate()<10)?'0'+actual.getDate():actual.getDate().toString();
    		var strMesA= (actual.getMonth()<10)?'0'+actual.getMonth():actual.getMonth().toString();
    		var strYearA=actual.getFullYear().toString();
    		var strHoraA=(actual.getHours()<10)?'0'+actual.getHours():actual.getHours().toString();
    		var strMinutosA=(actual.getMinutes()<10)?'0'+actual.getMinutes():actual.getMinutes().toString();

    		var strFechaA=strYearA+strMesA+strDiaA;
    		var strHoraActual=strHoraA+strMinutosA;
    		
			
			var cuponesB= parseInt($('#cuponesA').val())- parseInt($('#cuponesPagar').val());		
			var thrInstructorLogin= $.ajax({
			url: 'data/instructores.php',
			type: 'GET',
			dataType: 'json',
			data: {action: 'pagoCupones', fecha:strFechaA, hora:strHoraActual, pagados:$('#cuponesPagar').val(), monto:$('#montoPagar').val(), cuponesA:$('#cuponesA').val(), cuponesB: cuponesB, instructor:$('#idEmpleado').val(), encargado:$('#idEncargado').val()},
			beforeSend:function(){
			 
			
			},
			error:function(datos){
				rx=datos;
				console.log( rx);
				console.log("error");
				



			},
			success:function(datos){
				rx=datos;
				console.log('success');
				alert(rx.text);
				console.log(rx);
				if (rx.cod==1) {
					
					$('#cuponesPago').dialog().dialog("close");
					$('.controlDialog').val('');

					$("#contenedor").load('includes/lista_instructores.html');
					
				}
			},
	
		});
				

}

