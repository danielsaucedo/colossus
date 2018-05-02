<?php 
require_once __DIR__ . '/db_connect.php';
$db = new DB_CONNECT();
$filename="instructores.php";
$respuesta = array();
$r=0;
$notif="";
$error="";

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
if (isset($_GET['id'])) {
		$id=($_GET['id']);
	}
if (isset($_GET['fecha'])) {
		$fecha=($_GET['fecha']);
	}
if (isset($_GET['hora'])) {
		$hora=($_GET['hora']);
	}
if (isset($_GET['pagados'])) {
		$pagados=($_GET['pagados']);
	}
if (isset($_GET['monto'])) {
		$monto=($_GET['monto']);
		if ($monto=='') {
			$monto=0;
		}
	}
if (isset($_GET['cuponesA'])) {
		$cuponesA=($_GET['cuponesA']);
	}
if (isset($_GET['cuponesB'])) {
		$cuponesB=($_GET['cuponesB']);
	}
if (isset($_GET['instructor'])) {
		$instructor=($_GET['instructor']);
	}
if (isset($_GET['encargado'])) {
		$encargado=($_GET['encargado']);
	}

if (isset($_GET['action'])) {

	$action=$_GET['action'];

	switch ($action) {
		case 'insercion':
			insercion($nombre,$telefono,$username,$pass);
			break;
		case 'checkusername':
			checkusername($username);
			break;
		case 'lista':
			lista();
			break;
		case 'detalle':
			detalle($id);
			break;
		case 'checkLogin':
			checkLogin($username, $pass);
			break;
		case 'checkEncargado':
			checkEncargado($username, $pass);
			break;
		case 'pagoCupones':
			pagoCupones($fecha, $hora,$pagados,$cuponesA, $cuponesB, $monto, $instructor,$encargado );
			break;	
		default:
			echo "action no definida";
			break;
	}
}else{
	echo "action sin especificar";
}

function checkusername($username){

	$i=0;
	$q="SELECT COUNT(id) as cantuser FROM empleado WHERE user ='$username'";


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


function insercion($nombre,$telefono,$username,$pass){


	$q="INSERT INTO empleado (nombre, telefono, user, pass,cupon) VALUES ('$nombre','$telefono','$username',	'$pass',0)";

	$r=mysql_query($q) or ($error= $filename." - insercion - ".mysql_error());

	if (mysql_affected_rows()>0) {
		$r=1;
		$notif="Insercion Exitosa";

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

function lista(){
	$q="SELECT id,nombre,telefono,user,cupon FROM empleado ";
	$r=mysql_query($q) or ($error= $filename." - lista - ".mysql_error());
	if(mysql_num_rows($r)){
		$cod=1;
		$i=0;
		$instructores=array();
		while ($row=mysql_fetch_assoc($r)) {
			$instructores[$i]=$row;
			
			$i++;
		}
	}else{
		$cod=0;
		$notif="no hay resultados";
	
	}
	$respuesta['instructores']=$instructores;
	$respuesta['text']=$notif;
	$respuesta['cod']=$cod;
	$respuesta['error']=$error;
	echo json_encode($respuesta);
}

function detalle($id){
	$q="SELECT id,nombre,telefono,user,cupon FROM empleado WHERE id=$id";
	$r=mysql_query($q) or ($error= $filename." - update - ".mysql_error());
	$detalle=array();
	$detalle=mysql_fetch_assoc($r);
	echo json_encode($detalle);

}
function checkLogin($username, $pass)
{
	$q=" SELECT id FROM empleado WHERE user='$username' AND pass='$pass'";
	$r=mysql_query($q) or ($error= $filename." - checkLogin - ".mysql_error());
	if (mysql_num_rows($r)>0) {
		$detalle=array();
		$row=mysql_fetch_assoc($r);
		$detalle['id']=$row['id'];
		$cod=1;
		$text="Datos correctos";

	}else{
		$cod=0;
		$text="Datos incorrectos";

	}

	$respuesta['detalle']=$detalle;
	$respuesta['cod']=$cod;
	$respuesta['text']=$text;
	$respuesta['error']=$error;
	$respuesta['consulta']=$q;
	echo json_encode($respuesta);
}

function checkEncargado($username, $pass)
{
	$q=" SELECT id FROM empleado WHERE user='$username' AND pass='$pass' AND encargado=1";
	$r=mysql_query($q) or ($error= $filename." - checkLogin - ".mysql_error());
	if (mysql_num_rows($r)>0) {
		$detalle=array();
		$row=mysql_fetch_assoc($r);
		$detalle['id']=$row['id'];
		$cod=1;
		$text="Datos correctos";

	}else{
		$cod=0;
		$text="Datos incorrectos o Sin permisos para la operacion";

	}

	$respuesta['detalle']=$detalle;
	$respuesta['cod']=$cod;
	$respuesta['text']=$text;
	$respuesta['error']=$error;
	$respuesta['consulta']=$q;
	echo json_encode($respuesta);
}

function pagoCupones($fecha, $hora,$pagados,$cuponesA, $cuponesB, $monto, $instructor,$encargado ){


	$q=" INSERT INTO pagocupones (fecha, hora, pagados, monto, cuponesA, cuponesB, instructor, encargado) VALUES( '$fecha', '$hora', $pagados, $monto, $cuponesA, $cuponesB, $instructor, $encargado)";

	$r=mysql_query($q) or ($error= $filename." - pagoCupones INSERT- ".mysql_error());

	if (mysql_affected_rows()>0) {
		$cod=1;
		$text="pago  registrado";

		$q0=" UPDATE empleado SET cupon= $cuponesB WHERE id=$instructor";
		$r0=mysql_query($q0) or ($error= $error." - pagoCupones UPDATE - ".mysql_error());

		if (mysql_affected_rows()>0) {
			$cod=1;
			$text=$text." Cupones Actualizados";
		}else{
			$cod=0;
			$text=$text." Cupones NO Actualizados";
			$consulta=$consulta." ".$q0;

		}

	}else{
		$cod=0;
		$text="pago N O  registrado";
		$consulta=$q;

	}

	
	$respuesta['cod']=$cod;
	$respuesta['text']=$text;
	$respuesta['error']=$error;
	$respuesta['consulta']=$consulta;
	echo json_encode($respuesta);

}

?>