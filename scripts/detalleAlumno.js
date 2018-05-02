jQuery(document).ready(function() {
	$('.opEnDetalle').on('mouseenter', function(){
	//	alert('fired mouseenter');
	$(this).children('.textOpDetalle').css('display','inline-block');
});
$('.opEnDetalle').on('mouseleave', function(){
	
	$(this).children('.textOpDetalle').css('display','none');
	

});

$('.opEnDetalleRight').on('mouseenter', function(){
	//	alert('fired mouseenter');
	$(this).children('.textOpDetalle').css('display','inline-block');
});
$('.opEnDetalleRight').on('mouseleave', function(){
	
	$(this).children('.textOpDetalle').css('display','none');
	

});

$('.opEnDetalle').click(function(event) {

	
	$('.opContOculto').toggle('slow');
});

$('.opContOculto').click(function(event) {
	event.stopPropagation();
});

$('#submitNewPass').click(function(event) {
	event.stopPropagation();
	var id =$('#idAlumno').val()
	if ($('#newpass1').val().length<7) {
		alert($('#newpass1').val().length);
		alert('La contraseña debe tener almenos 7 caracteres');
	}else{
		if (!($('#newpass1').val()=== $('#newpass2').val())) {
			alert('las contraseñas no coinciden');
	}else{
		if (confirm('Cambiar la contraseña? La acción no puede deshacerse')) {
			var editarPass=$.ajax({	
				type: "GET",
	        	url: "data/alumnos.php",
	        	dataType: "json",
 			 	data: { action: "update", id:id, campo:'pass', valor:$('#newpass1').val()},
 			 	beforeSend:function(){

 			 		console.log('beforeUpdate');
 			 		
 			 		
 			 		
 			 	},
 			 	error:function(datos){
 			 		rx=datos
 			 		console.log(rx);
 			 		alert('E R R O R , Cambio N O  Realizado');
 			 		
 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		console.log(rx);
 			 		if (rx.cod) {
 			 			alert('Cambio Realizado');
						$('.minicontrol').val('');
						$('.opEnDetalle').trigger('click');

							 			 			
 			 		}else{
 			 			alert('Cambio N O  Realizado');
 			 		}	
 			 	
 			 	

 			 	},//fin del success

	});//fin ajax
		}
	}

	}
	
});


$('.editinfo').click(function(event) {

	var spanInfo=$(this).parent().children('.infoParValor');
	var spanValue=$(spanInfo).text();
	
	$(spanInfo).css('display', 'none');
	var inputInfo=$(this).parent().children('.iedit');
	$(inputInfo).css('display', 'inline');
	$(inputInfo).focus();
	
	$(inputInfo).val(spanValue);
	$(this).parent().children('.saveinfo').css('display', 'inline');
	$(this).css('display', 'none');
});



$('.saveinfo').click(function(event) {
	var id =$('#idAlumno').val()
	var btn=$(this);
	var inputInfo=$(this).parent().children('.iedit');
	var inputValue= $(inputInfo).val();
	var inputCampo=$(inputInfo).attr('id');

	var editarAlumno=$.ajax({	
				type: "GET",
	        	url: "data/alumnos.php",
	        	dataType: "json",
 			 	data: { action: "update", id:id, campo:inputCampo, valor:inputValue.toUpperCase()},
 			 	beforeSend:function(){

 			 		console.log('beforeUpdate');
 			 		
 			 		$(btn).css({
 			 			'background': 'url(style/img/wait.png)',
 			 			'background-size': ' 100% 100%',
 			 			'background-repeat': 'no-repeat'
 			 		});
 			 		
 			 	},
 			 	error:function(datos){
 			 		rx=datos
 			 		console.log(rx);
 			 		$(btn).css({
 			 			'background': 'url(style/img/error.png)',
 			 			'background-size': ' 100% 100%',
 			 			'background-repeat': 'no-repeat'
 			 		});
 			 	},
 			 	success:function(datos){
 			 		rx=datos;
 			 		console.log(rx);
 			 		if (rx.cod) {
 			 			console.log('oki');
						

							 			 			
 			 		}else{
 			 			console.log('no oki');
 			 		}	
 			 	
 			 	

 			 	},//fin del success

	});//fin ajax
						var spanInfo=$(this).parent().children('.infoParValor');
						$(spanInfo).text(inputValue.toUpperCase());

						$(btn).css({
 			 			'background': 'url(style/img/save.png)',
 			 			'background-size': ' 70% 70%',
 			 			'background-repeat': 'no-repeat',
 			 			'background-position': 'center center'
 			 		});
	
						$(spanInfo).css('display', 'inline');
						$(inputInfo).css('display', 'none');
						
						$(this).parent().children('.editinfo').css('display', 'inline');
						$(this).css('display', 'none');

	
});
$('.infoParValor').dblclick(function(event) {

	$(this).parent().children('.editinfo').trigger('click');

});

$('.iedit').keyup(function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13){
			$(this).parent().children('.saveinfo').trigger('click');
		}
});


});