<?php 
require_once __DIR__ . '/db_connect.php';
$db = new DB_CONNECT();
$filename="asistencia.php";
$respuesta = array();
$cod=0;
$consulta="";
$notif="";
$error="";

if (isset($_GET['alumno'])) {
	$alumno=$_GET['alumno'];
}
if (isset($_GET['fecha'])) {
	$fecha=$_GET['fecha'];
}
if (isset($_GET['hora'])) {
	$hora=$_GET['hora'];
}
if (isset($_GET['instructor'])) {
	$instructor=$_GET['instructor'];
}


if (isset($_GET['action'])) {
	$action=$_GET['action'];

	switch ($action) {
		case 'registrar':
			registrarAsistencia($alumno,$fecha, $hora,$instructor);
			break;
		
		default:
			echo "action no definida";
			break;
	}

}else{
	echo "action sin especificar";
}


function registrarAsistencia($alumno,$fecha, $hora,$instructor)
{
	$q="INSERT INTO asistencia(alumno, fecha, Hora, instructor) VALUES ($alumno,'$fecha', '$hora',$instructor)";
	$r=mysql_query($q) or ($error= $filename." - resgistrarAsistencia INSERT - ".mysql_error());

	if (mysql_affected_rows()>0) {
		$notif="Asistencia registrada";
		$cod=1;
		$q1="UPDATE alumnos set ultimaclase='$fecha' WHERE id=$alumno";
		$r1=mysql_query($q1) or ($error= $filename." - resgistrarAsistencia UPDATE ultimaclase - ".mysql_error());

		if (mysql_affected_rows()>0) {
			$notif=$notif." Ultima clase actualizada";
			$cod=1;

			$q2="UPDATE empleado set cupon=cupon+1 WHERE id=$instructor";
			$r2=mysql_query($q2) or ($error= $filename." - resgistrarAsistencia UPDATE cupon - ".mysql_error());

			if (mysql_affected_rows()>0) {
				$notif=$notif." cupones actualizados";
				$cod=1;
			}else{
				$notif=$notif." Ultima clase no actualizada";
				$cod=0;
				$consulta=$consulta.$q2;
			}	

		}else{
			$notif=$notif." Ultima clase no actualizada";
			$cod=0;
			$consulta=$consulta.$q1;
		}
	}else{
			$notif=$notif." Asistencia No registrada";
			$cod=0;
			$consulta=$consulta.$q;
	}

	$respuesta['text']=$notif;
	$respuesta['cod']=$cod;
	$respuesta['error']=$error;
	$respuesta['consulta']=$consulta;
	echo json_encode($respuesta);
}


?>