$(document).ready(function() {
	$('.control').attr('autocomplete','off');

	$("#usernameinstructor").focusout(function(){

		nuser=$(this).val();
		if (nuser<7) {
			$("#infoUser").css('background','url(style/img/warning.png)');
			$("#infoUser").css('background-size','100% 100%');
			$("#infoUser").css('background-repeat','no-repeat');

	$('#msgaltainstrc').html('<span>El nombre de usuario debe tener almenos 7 caracteres</span>');
		}

else{
		validarusername(nuser,0);
}


	});//fin validacion nombre de usuario

$('.control').focusin(function(){
	$(this).next().css('background','transparent');
	/*$('#msgaltaalum').html('<span></span>');*/
});//esto es para esconder los iconos de los costados

$("#registrarInstructores").click(function(){

	$('.control').next().css('background','transparent');
	$('#msgaltainstrc').html('<span></span>');

	var nya=$('#nombreinstructor').val();
	var tel=$('#Telefonoinstructor').val();
	var user=$('#usernameinstructor').val();
	var pass1=$('#passinstructor1').val();
	var pass2=$('#passinstructor2').val();
	if (nya==""|| user==""|| pass1==""||pass2=="") {
		$('#msgaltainstrc').html('<span>Los campos resaltados son requeridos</span>');
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
				$('#msgaltainstrc').html('<span>La contraseña debe tener almenos 7 caracteres</span>');
			}else{
				//volver a verificar el username
				nuser=$("#usernameinstructor").val();
				if (nuser.length<7) {
					$("#infoUser").css('background','url(style/img/warning.png)');
					$("#infoUser").css('background-size','100% 100%');
					$("#infoUser").css('background-repeat','no-repeat');
					$('#msgaltainstrc').html('<span>El nombre de usuario debe tener almenos 7 caracteres</span>');


				}else{
					validarusername(nuser,1);
				}
		}

		}else{
						$("#infoPass1").css('background','url(style/img/warning.png)');
						$("#infoPass1").css('background-size','100% 100%');
						$("#infoPass1").css('background-repeat','no-repeat');
						$("#infoPass2").css('background','url(style/img/warning.png)');
						$("#infoPass2").css('background-size','100% 100%');
						$("#infoPass2").css('background-repeat','no-repeat');
						$('#msgaltainstrc').html('<span>Las contraseñas no coinciden</span>');
		}
	}
});//fin del click

$('#usernameinstructor').keydown(function(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 32){
		return false;
	}
});


})//fin del ready
function validarusername(username, origen){
	
	var retorno=0;

	var matches= username.match(/[0-9]/g);
	if (!(matches== null)) {
		if (matches.length>1) {
			var checknusuario=$.ajax({	
				type: "GET",
	        	url: "data/instructores.php",
	        	dataType: "json",
 			 	data: { action: "checkusername", username:username},
 			 	beforeSend:function(){
 			 		console.log('before');
 			 		$("#infoUser").css('background','url(style/img/wait.png)');
					$("#infoUser").css('background-size','100% 100%');
					$("#infoUser").css('background-repeat','no-repeat');
					$('#msgaltainstrc').html('<span>Cargando</span>');
 			 	},
 			 	error:function(datos){
 			 		rx=datos
 			 		console.log(rx);
 			 			$("#infoUser").css('background','url(style/img/warning.png)');
						$("#infoUser").css('background-size','100% 100%');
						$("#infoUser").css('background-repeat','no-repeat');
						$('#msgaltainstrc').html('<span>Se produjo un error al intentar verificar el nombre de usuario</span>');
 			 			retorno=0;
 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		if (rx.cod) {
 			 			$("#infoUser").css('background','url(style/img/checkok.png)');
						$("#infoUser").css('background-size','100% 100%');
						$("#infoUser").css('background-repeat','no-repeat');
						$('#msgaltainstrc').html('<span></span>');
 			 			retorno=1;
 			 		}else{
 			 			$("#infoUser").css('background','url(style/img/checkblock.png)');
						$("#infoUser").css('background-size','100% 100%');
						$("#infoUser").css('background-repeat','no-repeat');
						$('#msgaltainstrc').html('<span>El nombre de usuario esta en uso</span>');
 			 			retorno=0;
 			 		}	
 			 	
 			 	

 			 },//fin del success

	});//fin ajax
		}else{
			$("#infoUser").css('background','url(style/img/checkblock.png)');
			$("#infoUser").css('background-size','100% 100%');
			$("#infoUser").css('background-repeat','no-repeat');
			$('#msgaltainstrc').html('<span>El nombre de usuario debe tener al menos 2 numeros</span>');
 			retorno=0;
		}
		
	}else{
		$("#infoUser").css('background','url(style/img/checkblock.png)');
		$("#infoUser").css('background-size','100% 100%');
		$("#infoUser").css('background-repeat','no-repeat');
		$('#msgaltainstrc').html('<span>El nombre de usuario debe tener al menos 2 numeros</span>');
 		retorno=0;
	}
	


	
	$.when(checknusuario).then(function(){
		console.log(retorno);
	 if (retorno) {
	 	if (origen) {
	 		//console.log('inserto');
	 		
    		

    		var insertusuario=$.ajax({	
				type: "GET",
	        	url: "data/instructores.php",
	        	dataType: "json",
 			 	data: { action: "insercion", nombre:$('#nombreinstructor').val().toUpperCase(),telefono:$('#Telefonoinstructor').val(),username:$('#usernameinstructor').val().toUpperCase(),pass:$('#passinstructor1').val()},
 			 	beforeSend:function(){
 			 		console.log('beforeInsert');
 			 		
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
 			 			$('.control').val('');
 			 			$('.infoControl').css('background','transparent');
 			 		}else{
 			 			console.log('no oki');
 			 		}	
 			 	
 			 	

 			 },//fin del success

	});//fin ajax

	 	}
	 	

	 }
	});
	

}