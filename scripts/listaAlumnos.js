$(document).ready(function() {
	$("div[role='dialog']").remove();
	$("#dialogos").empty();
	var dialogUI='<div id="dialog" title="Autenticarse" ><span>Confirmar la operacion introduciendo sus datos</span><br><input type="hidden" id="idInstructor"><input type="hidden" id="idAlumno">Instructor	<input type="text" id="userInst" placeholder="Nombre usuario" class="controlDialog"><br>Password	<input type="password" id="userPassw" placeholder="Password"  class="controlDialog"></div>';
	$("#dialogos").append(dialogUI);

$.getScript("scripts/jquery-ui.min.js",function(data, estado){
	if (estado== 'success') {
		$('#dialog').dialog({
			autoOpen: false,
			modal: true,
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
					ConfirmarPagoCuota() ;
					},
				"Cerrar": function () {

				$('#dialog').dialog().dialog("close");
				}
			}
		});

	}
});





	$('.opmenu').removeClass('seleccionada');
	$('#opAlumnos').addClass('seleccionada');

	$('#filtroAlumnos').focus();

	$("#filtroAlumnos").keyup(function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 32){
			var buscarAlum= $.ajax({
							type: "GET",
	        				url: "data/alumnos.php",
	        				dataType: "json",
 			 				data: { action: "findByNombre", nombre:$("#filtroAlumnos").val().trim()},
 			 				beforeSend:function(){
 			 					console.log('before busqueda alumnos');
 			 					cargandoLista();
 			 				},
 			 				error:function(datos){
 			 					rx=datos
 			 					console.log(rx);
 			 					conError(rx.error);

 			 				},
 			 				success:function(datos){
 			 					rx=datos;
 			 					console.log(rx);
 			 					$('tbody').empty();

 			 					if (rx.alumnos) {
 			 						$.each(rx.alumnos, function( i, item ) {

									fila="<tr class='resultado'><td data='"+item.id+"' class='opresultado'>...";
									fila+=" <div class='nav-menu'><div class='op-navmenu'>Modificar Datos</div><div class='op-navmenu'  data='"+item.id+"' id='opPagoCuota'>Registrar Pago</div><div class='op-navmenu' id='opdetalle' data='"+item.id+"'>Detalles</div><div class='op-navmenu'>Restablecer Contraseña</div>"

									fila+="</div></td>";
									fila+="<td class='resultado'>"+item.nombre+"</td><td class='resultado'>"+item.telefono+"</td><td class='resultado'>"+item.user+"</td><td class='resultado'>"+item.fechavencimiento+"</td> </tr>";

		       							$('tbody').append(fila);
		       						});

 			 					}else{
 			 						if (rx.error) {
 			 							conError(rx.error)
 			 						}else{
 			 							Sinresultados(rx.text);
 			 						}

 			 					}



 			 				},//fin del success

						});//fin ajax

		}
		if(code == 8){
			restablecerLista();
		}
	});

$('#listaAlumnos').on('click','td.opresultado',function(){
	$('.nav-menu').css('display','none');
	var id=$(this).attr('data');
	var fila=$(this).parent();
	var menu=$(this).children('.nav-menu ').css('display','inline-block');

});

$('#listaAlumnos').on('mouseleave','.nav-menu',function(){
	$(this).css('display','none');


});

$('#listaAlumnos').on('mouseenter','td.resultado',function(){

	/*trigger*/
	$('.nav-menu').trigger('mouseleave');
	var fila=$(this).parent().children();
	$(fila).css('background-color','orange')
			.css('cursor','pointer');

});
$('#listaAlumnos').on('mouseleave','td.resultado',function(){
	//alert('fired');
	var fila=$(this).parent().children();
	$(fila).css('background-color','#130153')
			.css('cursor','pointer');

});
$('#listaAlumnos').on('mouseenter','td.opresultado',function(){
	//alert('fired');

	var fila=$(this).parent().children();
	$(fila).css('background-color','orange')
			.css('cursor','pointer');

});
$('#listaAlumnos').on('mouseleave','td.opresultado',function(){

	var fila=$(this).parent().children();
	$(fila).css('background-color','#130153')
			.css('cursor','pointer');


});

$('.btnRegistrar').on('mouseenter', function(){
	$('.infobtn').css('display','inline');
});
$('.btnRegistrar').on('mouseleave', function(){
	$('.infobtn').css('display','none');
});


$('.btnRegistrar').click(function(){
	$("#contenedor").load('includes/altaAlumnos.html');
});

$('#listaAlumnos').on('click','.op-navmenu#opdetalle',function(){
	var id = $(this).attr('data');
	$('.contenidoModal').load('includes/detallesAlumno.html',
		function(){

			$('#idAlumno').val(id);
			var getInfoAlumno=$.ajax({
				type: "GET",
	        	url: "data/alumnos.php",
	        	dataType: "json",
 			 	data: { action: "detalle", id:id },
 			 	beforeSend:function(){
 			 		console.log('beforeDetalle');
 			 		console.log()
 			 	},
 			 	error:function(datos){
 			 		rx=datos
 			 		console.log(rx);

 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		console.log(rx);
 			 		if (rx.cod) {
 			 			console.log('oki');
 			 			$('#spanNombre').text(rx.detalle.nombre);
 			 			$('#spanTelefono').text(rx.detalle.telefono);
 			 			$('#spanUser').text(rx.detalle.user);
 			 			$('#spanVencimiento').text(formatoFecha(rx.detalle.fechavencimiento));
 			 			$('#spanLastSesion').text(formatoFecha(rx.detalle.ultimaclase));
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

    			 	$('#FotoDetalleAlumno').css({
    			 		height: rh,
    			 		width: rw,
    			 		'background': valorPropiedad,
 			 			'background-size': ' 100% 100%',
 			 			'background-repeat': 'no-repeat'

    			 	});


    		});


 			 			/*$('#FotoDetalleAlumno').css({
 			 				'background': valorPropiedad,
 			 				'background-size': ' 100% 100%',
 			 				'background-repeat': 'no-repeat'
 			 			});*/
 			 		}else{
 			 			console.log('no oki');
 			 		}



 			 	},//fin del success

	});//fin ajax
			restablecerLista();
			$('.modal10').css('display','inline');

	});//end callback



});//end click


$('#listaAlumnos').on('click','.op-navmenu#opPagoCuota',function(){



	var id = $(this).attr('data');
	$('#idAlumno').val(id);

	var opts={
		autoOpen: false,
		modal: true,
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


			ConfirmarPagoCuota() ;

			},
			"Cerrar": function () {

			$('#dialog').dialog().dialog("close");
			}
		}

	}


	$('#dialog').dialog(opts).dialog("open");

});

$('#listaAlumnos').on('click','td.resultado',function(){
	$(this).parent().children('td.opresultado').trigger('click');
});




})//end ready

function restablecerLista(){


	var tblbody="<tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td></td><td>Escriba el nombre del alumno a buscar</td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>";
	$('tbody').empty();

	$('tbody').append(tblbody);
}
function cargarLista(){

}
function cargandoLista(){
	var tblbody="<tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td>Realizando busqueda, espere... <span class='espere'></span> </td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>";

	$('tbody').empty();

	$('tbody').append(tblbody);

}
function Sinresultados(){
	var tblbody="<tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td>Lo sentimos, no hay resultados <span class='noMatches'></span> </td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>";

	$('tbody').empty();

	$('tbody').append(tblbody);

}
function conError(error){
	var tblbody="<tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td></td><td></td><td></td><td></td><td></td></tr> <tr><td>Error, "+error+" <span class='noMatches'></span> </td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>	<tr><td></td><td></td><td></td><td></td><td></td></tr>";

	$('tbody').empty();

	$('tbody').append(tblbody);

}

function formatoFecha(fecha){
	if (!(fecha==null)) {
	a=fecha.substring(0,4);
	m=fecha.substring(5,7);
    d=fecha.substring(8,10);
  	retorno= d+'-'+m+'-'+a;

	}else{
		retorno='No especificado';
	}
	return retorno;

}
function ConfirmarPagoCuota() {


	var resultLogin=false;
	var thrPagoCuota= $.ajax({
		url: 'data/instructores.php',
		type: 'GET',
		dataType: 'json',
		data: {action: 'checkLogin',username:$('#userInst').val(),pass: $('#userPassw').val()},

		beforeSend:function(){


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

				$('#idInstructor').val(rx.detalle.id);
				resultLogin= true;
			}else{
				alert(rx.text);
				resultLogin= false;
			}
		},

});


$.when(thrPagoCuota).then(function () {


		if (resultLogin) {

			var actual= new Date();
    		actual.setMonth(actual.getMonth()+1);

    		var strDiaA= (actual.getDate()<10)?'0'+actual.getDate():actual.getDate().toString();
    		var strMesA= (actual.getMonth()<10)?'0'+actual.getMonth():actual.getMonth().toString();
    		//fecha de vencimiento, mismo dia del mes siguiente
				console.log('year before'+actual.getFullYear());
    		actual.setMonth(actual.getMonth()+1);


    		var strMes2= (actual.getMonth()<10)?(actual.getMonth()==0)?'12':'0'+actual.getMonth():actual.getMonth().toString();
				if (strMes2=='12') {
					actual.setFullYear(actual.getFullYear-1);

				}
    		//		console.log(strFechaA);
				console.log('year after'+actual.getFullYear());

    		var strYearA=actual.getFullYear().toString();
    		var strHoraA=(actual.getHours()<10)?'0'+actual.getHours():actual.getHours().toString();
    		var strMinutosA=(actual.getMinutes()<10)?'0'+actual.getMinutes():actual.getMinutes().toString();

    		var strFechaA=strYearA+strMesA+strDiaA;
    		var strHoraActual=strHoraA+strMinutosA;
    		var strFecha2=strYearA+strMes2+strDiaA;
				console.log('fecha2 '+strFecha2);



				//ajax para confirmar pago

				var thrInsertPago= $.ajax({
					url: 'data/alumnos.php',
					type: 'GET',
					dataType: 'json',
					data: {action: 'pagarCuota',id:$('#idAlumno').val(),fechaactual:strFechaA,horaactual:strHoraActual,instructor:$('#idInstructor').val(),fechavencimiento:strFecha2},

					beforeSend:function(){

						console.log('fecha2',strFecha2);
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
						$("#contenedor").load('includes/listaAlumnos.html');

					},




				});



				$('#dialog').dialog().dialog("close");
			}else{
				alert('Error en la autenticacion, revise los datos');
			}

			$('.controlDialog').val('');

	});


}
