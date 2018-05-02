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
		case 'asistenciaxdia':
			consultarAsistenciaxdia($fecha);
			break;
		case 'asistenciaxmes':
			consultarAsistenciaxmes($fecha);
			break;
		case 'asistenciaxaño':
			consultarAsistenciaxaño($fecha);
			break;
		case 'asistenciaxsemana':
			consultarAsistenciaxsemana($fecha);
			break;
		default:
			echo "action no definida";
			break;
	}

}else{
	echo "action sin especificar";
}



function consultarAsistenciaxdia($fecha){
	
		
		
	$q=	"SELECT 'm' as t, COUNT(id) as cant FROM `asistencia` WHERE fecha=$fecha AND Hora BETWEEN 0800 AND 1300 UNION SELECT 't' as t, COUNT(id) as cant FROM `asistencia` WHERE fecha=$fecha AND Hora BETWEEN 1300 AND 1800 UNION SELECT 'n'  as t,COUNT(id) as cant FROM `asistencia` WHERE fecha=$fecha AND Hora BETWEEN 1800 AND 2300";
	//$respuesta['consulta']=$q;
	$r=mysql_query($q) or ($error= $filename." - consulta por dia - ".mysql_error());
		$i=0;
		while ($row=mysql_fetch_assoc($r)) {
				$respuesta[$i]=$row;
                   $i++;
		}

		echo json_encode($respuesta);
}

function consultarAsistenciaxmes($fecha){
	$q="SELECT 'M' as t, COUNT(id) as cant FROM asistencia WHERE MONTH(fecha)=MONTH('$fecha') and YEAR(fecha)=YEAR('$fecha') and Hora BETWEEN 0800 and 1200 union SELECT 'T' as t, COUNT(id) as cant FROM asistencia WHERE MONTH(fecha)=MONTH('$fecha') and YEAR(fecha)=YEAR('$fecha') and Hora BETWEEN 1200 and 1800 union SELECT 'N' as t, COUNT(id) as cant FROM asistencia WHERE MONTH(fecha)=MONTH('$fecha') and YEAR(fecha)=YEAR('$fecha') and Hora BETWEEN 1800 and 2300  ";
		$r=mysql_query($q) or ($error= $filename." - consulta por dia - ".mysql_error());
		$i=0;
		while ($row=mysql_fetch_assoc($r)) {
				$respuesta[$i]=$row;
                   $i++;
		}

		echo json_encode($respuesta);
}


function consultarAsistenciaxaño($fecha){
	$q="SELECT COUNT(id) as cant  FROM asistencia WHERE YEAR(fecha)=YEAR(fecha) and Hora BETWEEN 0800 AND 1200 union SELECT COUNT(id) as cant FROM asistencia WHERE YEAR(fecha)=YEAR(fecha) and Hora BETWEEN 1200 AND 1800 union SELECT COUNT(id) as cant  FROM asistencia WHERE YEAR(fecha)=YEAR(fecha) and Hora BETWEEN 1800 AND 2300";
	$r=mysql_query($q) or ($error= $filename." - consulta por dia - ".mysql_error());
		$i=0;
		while ($row=mysql_fetch_assoc($r)) {
				$respuesta[$i]=$row;
                   $i++;
		}

		echo json_encode($respuesta);
}

function consultarAsistenciaxsemana($fecha){
	$q="SELECT 'm' as turno, COUNT(id) as cantidad FROM `asistencia` WHERE YEAR(fecha)=YEAR($fecha)and week(fecha)=week($fecha) and Hora BETWEEN 0800 and 1200 UNION SELECT 't' as turno, COUNT(id) as cantidad FROM `asistencia` WHERE YEAR(fecha)=YEAR($fecha)and week(fecha)=week($fecha) and Hora BETWEEN 1200 and 1800 UNION SELECT 'n' as turno,COUNT(id) as cantidad FROM `asistencia` WHERE YEAR(fecha)=YEAR($fecha)and week(fecha)=week($fecha) and Hora BETWEEN 1800 and 2300 ";
         $r=mysql_query($q) or ($error= $filename." - consulta por dia - ".mysql_error());
		$i=0;
		while ($row=mysql_fetch_assoc($r)) {
				$respuesta[$i]=$row;
                   $i++;
		}

		echo json_encode($respuesta);

}












?>