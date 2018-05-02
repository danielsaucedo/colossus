<?php
require_once __DIR__ . '/db_connect.php';
$db = new DB_CONNECT();
$filename="alumnos.php";
$respuesta = array();
$r=0;
$notif="";
$error="";

if (isset($_GET['id'])) {
		$id=$_GET['id'];
	}

if (isset($_GET['nombre'])) {
		$nombre=$_GET['nombre'];
	}

if (isset($_GET['telefono'])) {
		$telefono=$_GET['telefono'];
	}else{
		$telefono='';
	}
if (isset($_GET['username'])) {
		$username=$_GET['username'];
	}
if (isset($_GET['pass'])) {
		$pass=sha1($_GET['pass']);
	}
if (isset($_GET['fechavencimiento'])) {
		$fechavencimiento=$_GET['fechavencimiento'];
	}
if (isset($_GET['ultimaclase'])) {
		$ultimaclase=$_GET['ultimaclase'];
	}
if (isset($_GET['campo'])) {
		$campo=$_GET['campo'];
	}
if (isset($_GET['valor'])) {
		$valor=$_GET['valor'];
	}

if (isset($_GET['fechaactual'])) {
	$fechaactual=$_GET['fechaactual'];
}
if (isset($_GET['horaactual'])) {
	$horaactual=$_GET['horaactual'];
}
if (isset($_GET['instructor'])) {
	$instructor=$_GET['instructor'];
}


if (isset($_POST['nombre'])) {
		$nombre=$_POST['nombre'];
	}

if (isset($_POST['telefono'])) {
		$telefono=$_POST['telefono'];
	}else{
		$telefono='';
	}
if (isset($_POST['username'])) {
		$username=$_POST['username'];
	}
if (isset($_POST['pass'])) {
		$pass=sha1($_POST['pass']);
	}
if (isset($_POST['fechavencimiento'])) {
		$fechavencimiento=$_POST['fechavencimiento'];
	}
if (isset($_POST['ultimaclase'])) {
		$ultimaclase=$_POST['ultimaclase'];
	}
if (isset($_POST['foto'])) {
	$foto=$_POST['foto'];
}
if (isset($_POST['fechaactual'])) {
	$fechaactual=$_POST['fechaactual'];
}
if (isset($_POST['horaactual'])) {
	$horaactual=$_POST['horaactual'];
}
if (isset($_POST['instructor'])) {
	$instructor=$_POST['instructor'];
}
if (isset($_GET['action'])) {
	$action=$_GET['action'];
}elseif (isset($_POST['action'])) {
	$action=$_POST['action'];
}else{echo "Action sin especificar";}

	switch ($action) {
		case 'checkusername':
			checkusername($username);
			break;
		case 'insercion':
			insercion($nombre,$telefono, $fechavencimiento,$username,$pass, $ultimaclase,$foto,$instructor,$fechaactual,$horaactual);
			break;
		case 'findByNombre':
			findByNombre($nombre);
			break;

		case 'detalle':
			detalle($id);
			break;
		case 'update':
			update($id, $campo, $valor);
			break;
		case 'checkSesionData':
			checkSesionData($username,$pass);
			break;
		case 'pagarCuota':
			pagarCuota($id,$fechaactual,$horaactual,$instructor,$fechavencimiento);
			break;

		default:
			echo "action no definida";
			break;
	}


function checkusername($username){

	$i=0;
	$q="SELECT COUNT(id) as cantuser FROM alumnos WHERE user ='$username'";


	$r=mysql_query($q) or $error= $filename." - checkusername - ".mysql_error();

	$row = mysql_fetch_assoc($r);
	if ($row['cantuser']>0) {
		//ya existe un usuario con ese username
		$respuesta['cod']=0;
		$respuesta['text']='El nombre de usuario no esta disponible';
	}else{
		$respuesta['cod']=1;
		$respuesta['text']='El nombre de usuario esta disponible';
	}

		$respuesta['consulta']=$q;

	echo json_encode($respuesta);
}


function insercion($nombre,$telefono, $fechavencimiento,$username,$pass, $ultimaclase,$foto, $instructor,$fechaactual,$horaactual){



	$q="INSERT INTO alumnos (nombre, telefono, fechavencimiento, user, pass, instructor) VALUES ('$nombre', '$telefono', '$fechavencimiento', '$username', '$pass', $instructor)";

	$r=mysql_query($q) or ($error= $filename." - insercion - ".mysql_error());

	if (mysql_affected_rows()>0) {
		$r=1;
		$notif="Insercion Exitosa";

		$last_id=mysql_insert_id();

		foreach ($foto as $valor){


			list(, $valor) = explode(';', $valor);
			list(, $valor) = explode(',', $valor);
			$valor = base64_decode($valor);
			$direc='img/profiles/';
			if (!file_exists($direc)) {
				 mkdir($direc, 0777, true);
			}
			$filename='alum'.$last_id.'.jpg';
			file_put_contents($direc.$filename, $valor);
			$href=$direc.$filename;

			$q0="UPDATE alumnos SET ruta='$href' WHERE id =$last_id";
			$r0=mysql_query($q0) or ($error= " - UPDATE ruta foto alumno - ".mysql_error());
				if (mysql_affected_rows()>0) {
					$notif=$notif." Foto actualizada";
					$r=1;
					$q=$q.$q0;


					$q1="INSERT INTO pagocuotas (alumno, fecha, hora, instructor) VALUES ($last_id,'$fechaactual' ,'$horaactual' , $instructor) ";
					$r1=mysql_query($q1) or ($error= " - INSERT pagocuotas - ".mysql_error());

					if (mysql_affected_rows()>0) {
					$notif=$notif." Pago registrado";
					$r=1;
					$q=$q.$q1;
					}else{
						$notif=$notif." Pago NO registrado";
						$r=0;
					}

				}else{
					$notif=$notif." Foto N O actualizada";
					$r=0;
					$q=$q.$q0;

				}

												}

	}	else{
		$r=0;
		$notif="Insercion Fallida";

	}




	$respuesta['text']=$notif;
	$respuesta['cod']=$r;
	$respuesta['error']=$error;
	$respuesta['consulta']=$q;
	echo json_encode($respuesta);
}
function findByNombre($nombre){
	$q="SELECT id, nombre, telefono, fechavencimiento, user FROM alumnos WHERE nombre LIKE '%$nombre%'";

	$r=mysql_query($q) or ($error= $filename." - findByNombre - ".mysql_error());

	if (mysql_num_rows($r)) {
		$cod=1;
		$notif="Registros encontrados";
		$i=0;
		$alumnos=array();
		while ($row=mysql_fetch_assoc($r)) {
			$alumnos[$i]=$row;
			$i++;
		}

	}	else{
		$cod=0;
		$notif="No hay resultados";

	}
	$respuesta['alumnos']=$alumnos;
	$respuesta['text']=$notif;
	$respuesta['cod']=$cod;
	$respuesta['error']=$error;
	$respuesta['consulta']=$q;

	echo json_encode($respuesta);
}

function detalle($id){

	$q="SELECT * FROM alumnos WHERE id =$id";


	$r=mysql_query($q) or $error= $filename." - detalle - ".mysql_error();
	if (mysql_num_rows($r)) {
	 	$cod=1;
	 	$notif="informacion encontrada";

	 	$row = mysql_fetch_assoc($r);
		$respuesta['detalle']=$row;
	}else{
		$cod=0;
	 	$notif="informacion no encontrada";

	}

	$respuesta['text']=$notif;
	$respuesta['cod']=$cod;
	$respuesta['error']=$error;
	$respuesta['consulta']=$q;

	echo json_encode($respuesta);


}

function update($id, $campo, $valor){

	if ($campo=='pass') {
		$valor=sha1($valor);
	}
	$q="UPDATE alumnos SET $campo='$valor' WHERE id=$id";


	$r=mysql_query($q) or $error= $filename." - update - ".mysql_error();


	if (mysql_affected_rows()>0) {
					$notif=" Valor Actualizado";
					$cod=1;

	}else{
					$notif=" Valor N O actualizado";
					$cod=0;


	}

	$respuesta['text']=$notif;
	$respuesta['cod']=$cod;
	$respuesta['error']=$error;
	$respuesta['consulta']=$q;

	echo json_encode($respuesta);


}

function checkSesionData($username,$pass){

$q="SELECT * FROM alumnos WHERE user='$username' AND pass='$pass' ";
$r=mysql_query($q) or $error= $filename." - update - ".mysql_error();



	if (mysql_num_rows($r)>0) {
		//ya existe un usuario con ese username
		$detalle= array();
		$detalle=mysql_fetch_assoc($r);
		$respuesta['cod']=1;
		$respuesta['text']='Datos Correctos';
		$respuesta['detalle']=$detalle;
	}else{
		$respuesta['cod']=0;
		$respuesta['text']='Datos Incorrectos';
	}

		$respuesta['consulta']=$q;

	echo json_encode($respuesta);





}
function pagarCuota($id,$fecha,$hora,$instructor,$fecha2){

	$q="INSERT INTO pagocuotas (alumno, fecha, hora, instructor) VALUES($id,'$fecha','$hora', $instructor)";
	$r=mysql_query($q) or $error= $filename." -pagocuotas -".mysql_error();

	if (mysql_affected_rows()>0) {
		$respuesta['cod']=1;
		$respuesta['text']="Pago Registrado";


		$q0="SELECT fechavencimiento FROM alumnos WHERE id=$id";
		$r0=mysql_query($q0) or $error=$error.' '.$filename.' getVencimientoAnterior- '.mysql_error();
		$row=mysql_fetch_assoc($r0);
		$vencimientoAnterior=$row['fechavencimiento'];




		$dateVencimientoAnterior= new DateTime($vencimientoAnterior);
		$intervalo = new DateInterval('P1M');

		$dateVencimientoAnterior->add($intervalo);
		$vencimientoAnterior=$dateVencimientoAnterior->format('Ymd');




		if ($vencimientoAnterior>$fecha2) {
			$nuevoVencimiento=$vencimientoAnterior;
		}else{
			$nuevoVencimiento=$fecha2;
		}






		$q1=" UPDATE alumnos SET fechavencimiento='$nuevoVencimiento' WHERE id=$id";
		$r1=mysql_query($q1) or $error=$error.' '.$filename.' update VencimientoCuota- '.mysql_error();

		if (mysql_affected_rows()>0) {
			$respuesta['cod']=1;
			$respuesta['text']=$respuesta['text']." Vencimiento Actualizado";
		}else{
			$respuesta['text']=$respuesta['text']." Vencimiento NO Actualizado".$fecha2;
		}


	}else{
		$respuesta['cod']=0;
		$respuesta['text']="No se registro correctamente el pago";
		$respuesta['error']=$error;
		$respuesta['consulta']=$q;

	}








	echo json_encode($respuesta);

}
?>
