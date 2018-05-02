<?php 
require_once __DIR__ . '/db_connect.php';
$db = new DB_CONNECT();


$horarios=  array('0815','0830','0845','0905','0915','0945','0955','1005','1025','1031','1035','1105','1115','1125','1205','1208','1214','1216','1242','1245','1310','1315','1321','1324','1423','1509','1522','1620','1633','1750','1815','1825','1915','1932','2005','2036','2108','2122','2150','2143','2201','1922','2115','2015','2033','1940');

$alumnos= array();
$qalumnosid="SELECT id FROM alumnos";
$ralumnos=mysql_query($qalumnosid) or die(mysql_error());
while ($row=mysql_fetch_assoc($ralumnos)) {
	array_push($alumnos, $row['id']);
}

$instructores= array();
$qempleadosid="SELECT id FROM empleado";
$rempleados=mysql_query($qempleadosid) or die(mysql_error());
while ($row=mysql_fetch_assoc($rempleados)) {
	array_push($instructores, $row['id']);
}



$years=array("2016","2017");
$monthsFullYear=array('01','02','03','04','05','06','07','08','09','10','11','12');
$monthsThisYear=array('01','02','03','04','05');

$daysFullMonth=array('01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28');

$daysThisMonth=array('01','02','03','04','05','06','07','08','09','10','11','12','13');

for ($i=0; $i <100 ; $i++) { 
	generateValues();
}


function generateValues(){
	global $horarios,$alumnos,$instructores,$years,$monthsFullYear,$monthsThisYear,$daysFullMonth,$daysThisMonth;

	$lenHorarios=count($horarios);
	$lenAlumnos=count($alumnos);
	$lenInstructores=count($instructores);

	$lenyears=count($years);
	$lenmonthsFullYear=count($monthsFullYear);
	$lenmonthsThisYear=count($monthsThisYear);
	$lendaysFullMonth=count($daysFullMonth);
	$lendaysThisMonth=count($daysThisMonth);


	$hora= $horarios[rand(0,$lenHorarios-1)];
	$alumno= $alumnos[rand(0,$lenAlumnos-1)];
	$instructor= $instructores[rand(0,$lenInstructores-1)];

	$year = $years[rand(0,$lenyears-1)];

	if ($year=="2016") {
		$month = $monthsFullYear[rand(0,$lenmonthsFullYear-1)];
		$day = $daysFullMonth[rand(0,$lendaysFullMonth-1)];
	}else{
		$month = $monthsThisYear[rand(0,$lenmonthsThisYear-1)];
		if ($month=='05') {
			$day=$daysThisMonth[rand(0,$lendaysThisMonth-1)];
		}else{
			$day = $daysFullMonth[rand(0,$lendaysFullMonth-1)];
		}
	}


$fecha= $year.$month.$day;
$q="INSERT INTO asistencia(alumno, fecha, Hora, instructor) VALUES ($alumno,'$fecha', '$hora',$instructor)";
$r=mysql_query($q) or die(mysql_error());

}
