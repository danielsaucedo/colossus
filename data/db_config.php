<?php
 
/*
 * All database connection variables
 */
 
define('DB_USER', "root"); // db user
define('DB_PASSWORD', ""); // db password (mention your db password here)
define('DB_DATABASE', "colossus"); // database name
define('DB_SERVER', "localhost"); // db server
error_reporting(E_ERROR);//oculta los avisos DEPRECATED
mysql_query ("SET NAMES 'utf8'");//idioma
?>