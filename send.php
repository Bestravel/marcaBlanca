<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>
@description programa de envío de correo electronioc de los planes internos

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                                                                                                                              

@param varchar plan_name Nombre de solicitante de cotizacion
@param varchar plan_lastname Apellido de solicitante de cotizacion
@param varchar plan_email Email del solicitante de cotizacion
@param varchar plant_texto Texto acerca del plan que estan cotizando
@param varchar plan_typeid Tipo de documento del solicitante de cotizacion
@param int plan_id Numero de documento del solicitante de cotizacion
@param int plan_phone Numero de telefono del solicitante de cotizacion
@param varchar plan_city Ciudad de telefono del solicitante de cotizacion
@param varchar plan_address Direccion de telefono del solicitante de cotizacion
@param datetime plan_arrive fecha de salida del solicitante de cotizacion
@param datetime plan_departure fecha de regreso del solicitante de cotizacion
@param int plan_adults Numero de adultos que viajarían para la cotizacion
@param int plan_child Numero de niños que viajarían para la cotizacion
@param int plan_nights Numero de noches que viajarían para la cotizacion

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    



error_reporting(E_ERROR);ini_set('display_errors','1');
$id=$_GET[plan_id_prd];//print_r($_GET);
$gestor = fopen("version.json", "r");$contenido = fread($gestor, filesize("version.json"));fclose($gestor);$array_version=json_decode($contenido,true);//print_r($array_version);
for ($i=1;$i<6;$i++){$plan="plan".$i;$array_id=explode("-", $array_version[0][$plan]);if($id==$array_id[1]){$plan_texto=$array_id[0];}}//echo $plan_texto;
$msg="Nueva cotización:\n<br>\n<br>Pagina : People pass\n<br>Plan : <b>".strtoupper($plan_texto)."</b>\n<br>Nombres : ".$_GET[plan_name]."\n<br>Apellidos : ".$_GET[plan_lastname]."\n<br>Correo : ".$_GET[plan_email];
$msg.="\n<br>Tipo de identificación : ".$_GET[plan_typeid]."\n<br>Identificación : ".$_GET[plan_id]."\n<br>Celular : ".$_GET[plan_phone]."\n<br>Ciudad : ".$_GET[plan_city]."\n<br>Dirección : ".$_GET[plan_address];
$msg.="\n<br>Fecha de ida : ".$_GET[plan_arrive]."\n<br>Fecha de regreso : ".$_GET[plan_departure]."\n<br>Adultos : ".$_GET[plan_adults]."\n<br>Ni&ntilde;os : ".$_GET[plan_child]."\n<br>Noches : ".$_GET[plan_nights];
$subject="Nueva cotización desde marca  blanca: People pass, paquete: ".$plan_texto;
$para      = 'operaciones4@bestravel.travel';
$titulo    = $subject;
$mensaje   = $msg;
$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
$cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$cabeceras .= 'From: notificaciones@bestravel.travel' . "\r\n" .
    'Reply-To: dirmayoreo@bestravel.travel' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
mail($para, $titulo, $mensaje, $cabeceras);
header("location:viajes.html");
?>