<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@subpackage login
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>
@description Graba el archivo propios.json y deja el anterior archivo como propios-YYYYMMDD.json

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                         

@param arreglo POST arreglo con los datos de (URL de imagen, titulo plan, duración del plan,  fechas, costo 
                    y URL del link de destino) x 3

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
//1. revisar datos en img, title, url
$review=0;$chk='';
if (empty($_POST[img1])){ $review++;$chk.=' imagen 1'; }
if (empty($_POST[img2])){ $review++;$chk.=' imagen 2'; }
if (empty($_POST[img3])){ $review++;$chk.=' imagen 3'; }
if (empty($_POST[title1])){ $review++;$chk.=' titulo 1'; }
if (empty($_POST[title2])){ $review++;$chk.=' titulo 2'; }
if (empty($_POST[title3])){ $review++;$chk.=' titulo 3'; }
if (empty($_POST[url1])){ $review++;$chk.=' direccion de salida 1'; }
if (empty($_POST[url2])){ $review++;$chk.=' direccion de salida 2'; }
if (empty($_POST[url3])){ $review++;$chk.=' direccion de salida 3'; }
if ($review!=0){
	//2. si no esta lleno devolver->go back
	echo '<!DOCTYPE html><html><head><script><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js">
	</script><script>window.alert("Hay '.$review. ' faltas de información importante, \nfavor ingresar '.$chk.'.");window.history.back();</script></head><body></body></html>';
}else{
	//3. si esta lleno almacenar ->index.php
	$script='[{
	"sq":"1",
	"url":"'.$_POST[url1].'",
	"id":"P1",
	"img":"'.$_POST[img1].'",
	"title":"'.$_POST[title1].'",
	"duracion":"'.$_POST[duracion1].'",
	"fecha":"'.$_POST[fecha1].'",
	"costo":"'.$_POST[costo1].'"
},{
	"sq":"2",
	"url":"'.$_POST[url2].'",
	"id":"P2",
	"img":"'.$_POST[img2].'",
	"title":"'.$_POST[title2].'",
	"duracion":"'.$_POST[duracion2].'",
	"fecha":"'.$_POST[fecha2].'",
	"costo":"'.$_POST[costo2].'"
},{
	"sq":"3",
	"url":"'.$_POST[url3].'",
	"id":"P3",
	"img":"'.$_POST[img3].'",
	"title":"'.$_POST[title3].'",
	"duracion":"'.$_POST[duracion3].'",
	"fecha":"'.$_POST[fecha3].'",
	"costo":"'.$_POST[costo3].'"
}]';
//4. cambiar propios.json a _yyyymmdd.log
$fecha=date('Ymd');
if (file_exists("../propios_".$fecha.".log")){unlink("../propios_".$fecha.".log");}
rename("../propios.json", "../propios_".$fecha.".log");
//5. guardar cambios
$fp=fopen('../propios.json','a+');fwrite($fp, $script);fclose($fp);
//6. ir a index.php
header('location:../index.php');
}
?>