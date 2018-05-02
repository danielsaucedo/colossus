$(document).ready(function() {

$("#contenedor").load('includes/asistenciaAlumnos.html');


$("#opAlumnos").click(function(){
	$("#contenedor").load('includes/listaAlumnos.html');
});

$("#opInstructores").click(function(){
	$("#contenedor").load('includes/lista_instructores.html');
});


$("#opAsistencia").click(function(){
	$("#contenedor").load('includes/asistenciaAlumnos.html');
});

$("#opInformes").click(function(){
	$("#contenedor").load('includes/informesGeneral.html');
});

$('.cerrarModal').click(function(event) {
	
	$(this).parent().css('display','none');
	if ($('.filtro').length) {
		$('.filtro').val('');
		$('.filtro').focus();
	}
});
})//end ready