$(document).ready(function() {
	$("div[role='dialog']").remove();

	var dialogUI='<div id="dialogLogin" title="Autenticarse" class="dialogUI">Instructor	<input type="text" id="usernameI" placeholder="Nombre usuario" class="controlDialogLogin"><br>Password	<input type="password" id="passI" placeholder="Password"  class="controlDialogLogin"></div>';
	$("#dialogos").append(dialogUI);
	$('#dialogLogin').dialog({
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
			
		
			instructorLogin(usernameI.value,passI.value) ;

			
			},
			"Cerrar": function () {

			$('#dialogLogin').dialog().dialog("close");
			}
		}

	});

$('.opmenu').removeClass('seleccionada');
$('#opAlumnos').addClass('seleccionada');

$('.control').attr('autocomplete','off');
$('#msgaltaalum').hide();

var files=[];

$("#usernamealumno").focusout(function(){
nuser=$(this).val();
if (nuser.length<7) {
	$("#infoUser").css('background','url(style/img/warning.png)');
	$("#infoUser").css('background-size','100% 100%');
	$("#infoUser").css('background-repeat','no-repeat');

	$('#msgaltaalum').html('<span>El nombre de usuario debe tener almenos 7 caracteres</span>');
	$('#msgaltaalum').show();

}else{
	validarusername(nuser,0);
}


});
$('.control').focusin(function(){
	$(this).next().css('background','transparent');
	/*$('#msgaltaalum').html('<span></span>');*/
});

$("#registrarAlumno").click(function(){

	

	$('.control').next().css('background','transparent');
	$('#msgaltaalum').html('<span></span>');
	$('#msgaltaalum').hide();	
	var nya=$('#nombrealumno').val();
	var tel=$('#telefonoalumno').val();
	var user=$('#usernamealumno').val();
	var pass1=$('#passalumno1').val();
	var pass2=$('#passalumno2').val();

	if (nya==""|| user==""|| pass1==""||pass2=="") {
		$('#msgaltaalum').html('<span>Los campos resaltados son requeridos</span>');
		$('#msgaltaalum').show();
		if (nya=="") {
			$("#infoNombre").css('background','url(style/img/error.png)');
			$("#infoNombre").css('background-size','100% 100%');
			$("#infoNombre").css('background-repeat','no-repeat');
		}
		if (user=="") {
				$("#infoUser").css('background','url(style/img/error.png)');
				$("#infoUser").css('background-size','100% 100%');
				$("#infoUser").css('background-repeat','no-repeat');
		}
		if (pass1=="") {
					$("#infoPass1").css('background','url(style/img/error.png)');
					$("#infoPass1").css('background-size','100% 100%');
					$("#infoPass1").css('background-repeat','no-repeat');

		}
			
		
		if (pass2=="") {
						$("#infoPass2").css('background','url(style/img/error.png)');
						$("#infoPass2").css('background-size','100% 100%');
						$("#infoPass2").css('background-repeat','no-repeat');
		}
		
	}else{
		console.log('campos completos');
		//todos los campos estan completos
		if (pass1 == pass2) {
			if (pass1.length<7) {
				$("#infoPass1").css('background','url(style/img/warning.png)');
				$("#infoPass1").css('background-size','100% 100%');
				$("#infoPass1").css('background-repeat','no-repeat');
				$('#msgaltaalum').html('<span>La contraseña debe tener almenos 7 caracteres</span>');
				$('#msgaltaalum').show();
			}else{
				//volver a verificar el username
				nuser=$("#usernamealumno").val();
				if (nuser.length<7) {
					$("#infoUser").css('background','url(style/img/warning.png)');
					$("#infoUser").css('background-size','100% 100%');
					$("#infoUser").css('background-repeat','no-repeat');
					$('#msgaltaalum').html('<span>El nombre de usuario debe tener almenos 7 caracteres</span>');
					$('#msgaltaalum').show();

				}else{
					if(!(files.length==0)){

						$("#dialogLogin").dialog().dialog("open");
						
					}
					else{
						$('#msgaltaalum').html('<span>La foto del alumno no ha sido selecionada</span>');
						$('#msgaltaalum').show();
					}
					
				}
		}

			
			
		}else{
						$("#infoPass1").css('background','url(style/img/warning.png)');
						$("#infoPass1").css('background-size','100% 100%');
						$("#infoPass1").css('background-repeat','no-repeat');
						$("#infoPass2").css('background','url(style/img/warning.png)');
						$("#infoPass2").css('background-size','100% 100%');
						$("#infoPass2").css('background-repeat','no-repeat');
						$('#msgaltaalum').html('<span>Las contraseñas no coinciden</span>');
						$('#msgaltaalum').show();
		}
	}
});

$('#usernamealumno').keydown(function(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 32){
		return false;
	}
});



$('#imgAlumno').on('click',function(){
	$('#msgaltaalum').html('<span></span>');
	$('#msgaltaalum').hide();

    $('#findFile').trigger('click');
  });

 $("#findFile").on("change",function(evt){
   var finds = evt.target.files; // FileList object

   
 for (var i = 0, f; f = finds[i]; i++) {

       ext = f.name.substring(f.name.lastIndexOf('.') + 1);
     if (isImage(ext) && isNotWeight(f.size)) {

        var reader = new FileReader();
        reader.onload= function(e){
        	//var imagen0= "<img src='"+e.target.result+"' id='getRatio'>";
        	
        	 var image  = new Image();
        	 image.src=e.target.result;
    		image.addEventListener("load", function () {

    				var sizeContainer=$('.contieneImgPicker').width();
    				
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
    			 	
    			 	var mleft= ((sizeContainer-rw)/2)-40;
    			 	var wc=rw-25;
    			 	var atMleft=mleft+'px';
    			 	var atWc=wc+'px';
    			 	$('#imgAlumno').css({
    			 		height: rh,
    			 		width: rw,
    			 		'margin-left':  atMleft
    			 	});
    			 	$('#cambiarImg').css('width', atWc);
    			 
    		});
        		
       	  $('#imgAlumno').empty() ;
          $('#imgAlumno').append("<div class='fileIn' ><img class='imgFile' src='"+e.target.result+"' height='100%' width='100%'><div id='cambiarImg'>Cambiar Imagen</div></div>");
          
          $('#cambiarImg').hide();
          files.length=0;
          files.push(e.target.result);
          //console.log(reader.readAsDataURL(f));
          }
        console.log(reader.readAsDataURL(f));
		console.log(reader.result);
     }
    }
        
      

        
  });
 $("#imgAlumno").on("mouseenter",".fileIn", function(event) {
	//console.log('mouseover');
	 $('#cambiarImg').show();

});//end mouseenter
$("#imgAlumno").on("mouseleave ",".fileIn", function(event) {
	//console.log('mouseover');
	 $('#cambiarImg').hide();
});//end mouseleave

function instructorLogin(user, pass){
	var resultLogin=false;
	var thrInstructorLogin= $.ajax({
		url: 'data/instructores.php',
		type: 'GET',
		dataType: 'json',
		data: {action: 'checkLogin', username: user, pass:pass},
		
		beforeSend:function(){
			console.log('before login' );
			console.log("pass", pass);
			console.log("user", user);

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

	$.when(thrInstructorLogin).then(function () {
		

		if (resultLogin) {
				nuser=$("#usernamealumno").val();
				validarusername(nuser,1);

				$('#dialogLogin').dialog().dialog("close");
				
			}else{
				alert('Error en la autenticacion, revise los datos');
			}

			$('.controlDialog').val('');

	});
	
	





	
}

function validarusername(username, origen){
	
	var retorno=0;

	var matches= username.match(/[0-9]/g);
	if (!(matches== null)) {
		if (matches.length>1) {
			var checknusuario=$.ajax({	
				type: "GET",
	        	url: "data/alumnos.php",
	        	dataType: "json",
 			 	data: { action: "checkusername", username:username},
 			 	beforeSend:function(){
 			 		console.log('before');
 			 		$("#infoUser").css('background','url(style/img/wait.png)');
					$("#infoUser").css('background-size','100% 100%');
					$("#infoUser").css('background-repeat','no-repeat');
					$('#msgaltaalum').html('<span>Cargando</span>');
					$('#msgaltaalum').show();
 			 	},
 			 	error:function(datos){
 			 		rx=datos
 			 		console.log(rx);
 			 			$("#infoUser").css('background','url(style/img/warning.png)');
						$("#infoUser").css('background-size','100% 100%');
						$("#infoUser").css('background-repeat','no-repeat');
						$('#msgaltaalum').html('<span>Se produjo un error al intentar verificar el nombre de usuario</span>');
 			 			$('#msgaltaalum').show();
 			 			retorno=0;
 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		if (rx.cod) {
 			 			$("#infoUser").css('background','url(style/img/checkok.png)');
						$("#infoUser").css('background-size','100% 100%');
						$("#infoUser").css('background-repeat','no-repeat');
						$('#msgaltaalum').html('<span></span>');
 			 			$('#msgaltaalum').hide();
 			 			retorno=1;
 			 		}else{
 			 			$("#infoUser").css('background','url(style/img/checkblock.png)');
						$("#infoUser").css('background-size','100% 100%');
						$("#infoUser").css('background-repeat','no-repeat');
						$('#msgaltaalum').html('<span>El nombre de usuario esta en uso</span>');
 			 			$('#msgaltaalum').show();
 			 			retorno=0;
 			 		}	
 			 	
 			 	

 			 },//fin del success

	});//fin ajax
		}else{
			$("#infoUser").css('background','url(style/img/checkblock.png)');
			$("#infoUser").css('background-size','100% 100%');
			$("#infoUser").css('background-repeat','no-repeat');
			$('#msgaltaalum').html('<span>El nombre de usuario debe tener al menos 2 numeros</span>');
			$('#msgaltaalum').show();
 			retorno=0;
		}
		
	}else{
		$("#infoUser").css('background','url(style/img/checkblock.png)');
		$("#infoUser").css('background-size','100% 100%');
		$("#infoUser").css('background-repeat','no-repeat');
		$('#msgaltaalum').html('<span>El nombre de usuario debe tener al menos 2 numeros</span>');
		$('#msgaltaalum').show();	
 		retorno=0;
	}
	


	
	$.when(checknusuario).then(function(){
		console.log(retorno);
	 if (retorno) {
	 	if (origen) {
	 		//console.log('inserto');
	 		var fecha = new Date();
   			fecha.setMonth(fecha.getMonth()+1);
    	//	fecha.setDate(fecha.getDate()-1);
    		fecha.setDate(fecha.getDate());

    		var diav=fecha.getDate()+1;
    		var dia=fecha.getDate();
    		var m=fecha.getMonth();
    		var mesv=fecha.getMonth()+1;
    		var yearv=fecha.getFullYear().toString();
    		

    		if (diav.toString().length==1) {
                diav='0'+diav;  }
                

            if (dia.toString().length==1) {
                dia='0'+dia;   }   
             
        	if (mesv.toString().length==1) {
                 mesv='0'+mesv;   }
             
            if (m.toString().length==1) {
                 m='0'+m;   }

            var strFechav=yearv.concat(mesv).concat(diav);
            var strFecha=yearv.concat(m).concat(dia);   
           
    		//console.log(strFechav);


    		var actual= new Date();
    		actual.setMonth(actual.getMonth()+1);
    		var strDiaA= (actual.getDate()<10)?'0'+actual.getDate():actual.getDate().toString();
    		var strMesA= (actual.getMonth()<10)?'0'+actual.getMonth():actual.getMonth().toString();
    		var strYearA=actual.getFullYear().toString();
    		var strHoraA=(actual.getHours()<10)?'0'+actual.getHours():actual.getHours().toString();
    		var strMinutosA=(actual.getMinutes()<10)?'0'+actual.getMinutes():actual.getMinutes().toString();

    		var strFechaA=strYearA+strMesA+strDiaA;
    		var strHoraActual=strHoraA+strMinutosA;



    	var insertusuario=$.ajax({	
				type: "POST",
	        	url: "data/alumnos.php",
	        	dataType: "json",
 			 	data: { action: "insercion", nombre:$('#nombrealumno').val().toUpperCase(),telefono:$('#telefonoalumno').val(), fechavencimiento:strFechav,username:$('#usernamealumno').val().toUpperCase(),pass:$('#passalumno1').val(), ultimaclase:strFecha, foto:files, instructor:$('#idInstructor').val(), fechaactual:strFechaA, horaactual:strHoraActual},
 			 	beforeSend:function(){
 			 		console.log('beforeInsert');
 			 		console.log(files)
 			 	},
 			 	error:function(datos){
 			 		rx=datos
 			 		console.log(rx);
 			 			
 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		console.log(rx);
 			 		if (rx.cod) {
 			 			alert('Ahora el alumno debe iniciar sesion en "Asistencia"');
 			 			$('.control').val('');
 			 			$('.imgPicker').css({
 			 				height: '120px',
 							width: '120px'
 			 			});
 			 			$('.infoControl').css('background','transparent');
 			 			$('#imgAlumno').empty() ;
 			 		}else{
 			 			console.log('no oki');
 			 		}	
 			 	
 			 	

 			 },//fin del success

	});//fin ajax

	 	}else{
	 		//console.log('no inserto');
	 	}
	 	

	 }else{
	 	console.log(' no inserto');
	 }
	});
	

}

})
function isImage(extension){
	switch(extension.toLowerCase()) 
    {
        case 'jpg': 
            return true;
        break;
        default:
            return false;
        break;
    }
}
function isNotWeight(peso){// verificar que el archivo no pese mas de 30mb aproximadamente
	if (peso<=30000000) 
		return true;
		else
		return false;
	

} 