<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>
@description programa generador de archivos planes#.html e imagen1.jpg para los planes propuestos por 
             bestravel

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                                                                             

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
error_reporting(E_ERROR); 
$version = 'version.json';
$respuesta=verifyVersion($version);


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function verifyVersion
@param varchar nombre_fichero ruta del archivo version.json para revision de la versión
@description funcion que verifica de el archivo con respecto a http://e-reservasweb.com/version.json si el 
             archivo tiene versión diferente lo trae y reemplaza el archivo version.json
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function verifyVersion($nombre_fichero,$debug=0){
	if (file_exists($nombre_fichero)) {$action="review";} else {$action="create";}
	if ($action=="review"){
		$gestor = fopen($nombre_fichero, "r");$contenido = fread($gestor, filesize($nombre_fichero));fclose($gestor);
		$array_version=json_decode($contenido,true);
		$ch = curl_init();curl_setopt($ch, CURLOPT_URL,"http://e-reservasweb.com/version.json");curl_setopt($ch, CURLOPT_TIMEOUT, 30);	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);	$resultado = curl_exec ($ch);$array_externo=json_decode($resultado,true);
		if ($debug==1){print_r($array_version);echo "hr";	print_r($array_externo);}
		if ($array_version[0][version]!=$array[0][version]){unlink($nombre_fichero);$action="create";}else{echo "datos actualizados";}
	}
	if ($action=="create"){
		$gestor=fopen("version.json","a+");fwrite($gestor, $resultado);
		getPlans($nombre_fichero);
	}
	if ($debug==0){print_r($nombre_fichero);}

}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function getPlans
@param varchar nombre_fichero ruta del archivo version.json 
@description funcion que genera los archivos planes#.html con respecto a lo que existe en el archivo version.json
             tambien crea el archivo planes.json para la alimentación del archivo viajes.html. Llama las librerias
             para encabezado y pies de página de acuerdo con la marca blanca.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function getPlans($nombre_fichero){
	include 'content.php';
	$gestor = fopen($nombre_fichero, "r");$contenido = fread($gestor, filesize($nombre_fichero));fclose($gestor);$array_version=json_decode($contenido,true);$max=6;
    echo "Planes a Mostrar:";
	for ($i=1;$i<$max;$i++){
		$plan="plan".$i; $url=$array_version[0][$plan];
		$data=getOne($url);$cabecera=HEAD();$pie=FOOT();$contenido=explode("|",$data);
		if (file_exists($plan.".html")) {unlink($plan.".html");}
		$fp=fopen($plan.".html", "a+");fwrite($fp, $cabecera);fwrite($fp, $contenido[1]);fwrite($fp,"\n</div></div\n");fwrite($fp, $pie);fclose($fp);
		if ($i==1){
			$acumulador=uneJson($i,$contenido[0]);//echo $acumulador;
			traeImg($contenido[0]);
		}else{$acumulador=uneJson($i,$contenido[0],$acumulador);}
		echo "<br><a href='".$plan.".html'>".$url."</a>";
	}
	if (file_exists("planes.json")) {unlink("planes.json");}
	$fp=fopen("planes.json", "a+");fwrite($fp, $acumulador);fclose($fp);
	echo "<br><a href='planes.json'>json</a><br>Sistema Activo.";
} 

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function getOne
@param varchar URL dirección de donde traer la información del plan
@param int debug bandera para activar funcion de debug 
@description funcion que trae la información desde la URL, aqui se trae trae la data desde la página y se alimenta
             el archivo como fuente de información para getplans.
@return varchar regresa la cadena de json del plan y el texto de la página en formato html

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function getOne($URL, $debug=0){
	$guion =stripos($URL, "-");$guion++;$$guion=0-$guion; $id=substr($URL, $guion);if ($debug==1){echo $URL."|".$id."<br>";}
	//antes de salir a produccion
	$path="http://www.bestravel.travel/new/detalle_plan.php?id_prd=";
	if(function_exists('curl_init')){
		$ch = curl_init();curl_setopt($ch, CURLOPT_URL,$path.$id);curl_setopt($ch, CURLOPT_TIMEOUT, 30);curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		$resultado = curl_exec ($ch);$resultado=mb_convert_encoding($resultado, "UTF-8");if ($debug==1){echo $resultado."<br>";}
		$ini=strpos($resultado, "<!--//top right navigation-->");	$fin=strpos($resultado, "<!--footer-->");$plan='';
		for($i=$ini;$i<$fin;$i++){$plan.=$resultado[$i];}
		$plan=str_replace('<li>          ','<li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;">',$plan);
		$plan=str_replace("..", "http://bestravel.travel", $plan);$plan=decodificar_utf8($plan);$plan=str_replace('<div style="display: none;" class="span12 plan_booking">', '<div class="span12 plan_booking">', $plan);
        $plan=str_replace('<form id="booking-form">', '<form id="booking-form" action="send.php">', $plan);
        $plan=str_replace('<input name="Reservar el plan" type="button"','<input name="Reservar el plan" type="submit"',$plan);
        $plan=str_replace('C?N','CUN',$plan);$plan=str_replace('D?A','DIA',$plan);$plan=str_replace('src="images/bgr/ok.png"', 'src="headFoot/img/ok.png"', $plan);
        
        $mio=fopen("propios.json", "r");$json_plan=fread($mio, filesize("planes.json"));fclose($mio);        
        if ($json_planes!="[{}]"){
            $array_plan=json_decode($json_plan,true);
            $plan=str_replace("<!--Popular hotels in the area-->","<plan><!--Popular hotels in the area--><div style='display:none;'>",$plan);
            $plan=str_replace("<plan>","<article class='default clearfix'><h2>Otros destinos de interes</h2><ul class='popular-hotels'><plan>",$plan);
            $linea1="<li><a href='".$array_plan[1][url]."'><h3>".$array_plan[1][title]."<br>".$array_plan[1][duracion]."</h3><p>Desde <span class='price'>".$array_plan[1][costo]."</span></p></a></li>";
            $linea2="<li><a href='".$array_plan[2][url]."'><h3>".$array_plan[2][title]."<br>".$array_plan[2][duracion]."</h3><p>Desde <span class='price'>".$array_plan[2][costo]."</span></p></a></li>";
            $linea3="<li><a href='".$array_plan[0][url]."'><h3>".$array_plan[0][title]."<br>".$array_plan[0][duracion]."</h3><p>Desde <span class='price'>".$array_plan[0][costo]."</span></p></a></li>";
            $plan=str_replace("<!--//Popular hotels in the area-->","</div><!--//Popular hotels in the area-->",$plan);
            $cierre="</article><!--//Popular hotels in the area-->";
            $plan=str_replace("<plan>", $linea1.$linea2.$linea3.$cierre, $plan);
        }
        $plan=str_replace("<!--Deal of the day-->","<!--Deal of the day--><div style='display:none;'>",$plan);
        $plan=str_replace("<!--//Deal of the day-->","</div><!--//Deal of the day-->",$plan);

        $data=fopen("datos.json","r");$json_data=fread($data,filesize("datos.json"));fclose($data);$array_data=json_decode($json_data,true);
        $plan =str_replace("+57 1-2840001", $array_data[0][tel], $plan);$plan =str_replace("018000 128004", $array_data[0][pbx], $plan);


		if ($debug==1){echo $plan."<br>";}
		//imagen
		$ini_img=strpos($plan, "<img src=");	$fin_img=strpos($plan, '" width="');	
		if ($debug==1){echo $ini_img."|".$fin_img."<br>";}$img='';$ini_img+=10;
		for($i=$ini_img;$i<$fin_img;$i++){$img.=$plan[$i]; if ($plan[$i]=="\""){$fin_img=$i;}}$img=substr($img, 0,-1); if ($debug==1){echo $img."<br>";}
		//titulo
		$ini_tit=strpos($plan, "<h1>");	$fin_tit=strpos($plan, '<BR>',$ini_tit);	
		if ($debug==1){echo $ini_tit."|".$fin_tit."<br>";}$title='';$ini_tit+=4;
		for($i=$ini_tit;$i<$fin_tit;$i++){$title.=$plan[$i]; }if ($debug==1){echo $title."<br>";}
		//duracion
		$ini_dur=strpos($plan, "<p><strong>");	$fin_dur=strpos($plan, '</strong>',$ini_dur);	
		if ($debug==1){echo $ini_dur."|".$fin_dur."<br>";}$duracion='';$ini_dur+=11;
		for($i=$ini_dur;$i<$fin_dur;$i++){$duracion.=$plan[$i]; }if ($debug==1){echo $duracion."<br>";}
		//fecha
		$ini_fec=strpos($plan, "<p><strong>",$fin_dur);$ini_fec=strpos($plan, "</strong>",$ini_fec);$fin_fec=strpos($plan, '</p>',$ini_fec);	
		if ($debug==1){echo $ini_fec."|".$fin_fec."<br>";}$fecha='';$ini_fec+=9;
		for($i=$ini_fec;$i<$fin_fec;$i++){$fecha.=$plan[$i]; }if ($debug==1){echo $fecha."<br>";}
		//valor
		$ini_cost=strpos($plan, " <strong>",$fin_fec);$fin_cost=strpos($plan, '<span style',$ini_cost);	
		if ($debug==1){echo $ini_cost."|".$fin_cost."<br>";}$cost='';$ini_cost+=9;
		for($i=$ini_cost;$i<$fin_cost;$i++){$costo.=$plan[$i]; }$costo=str_replace(' ', '', $costo);$costo=str_replace('</strong></span>', '', $costo);$costo = eregi_replace("[\n|\r|\n\r]", '', $costo);if ($debug==1){echo $costo."<br>";}
		//forma json		$debug=1;
		$json='[{"id":"'.$id.'","img":"'.$img.'","title":"'.$title.'","duracion":"'.$duracion.'","fecha":"'.$fecha.'","costo":"'.$costo.'"}]';	
	}
	return $json."|".$plan;
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function uneJson
@param int i indicador de numero de la posición del json en el arreglo.
@param varchar original bandera para identificar que es el primer archivo del json o su ubicacion, default=''
@param int debug bandera para activar funcion de debug 
@description funcion que une cadenas de json en un archivo, con un orden específico.
@return json regresa la cadena de json unida.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function uneJson($i,$json,$original='',$debug=0){
 if ($debug==1) { echo $json ."|" . $original; }
	if ($original==''){
		if ($debug==1){echo "un solo parametro <br>";}
		$json=str_replace("[{", '[{"sq":"'.$i.'","url":"plan'.$i.'.html",', $json);
		$finalJsonString = $json;
	}else{ 
		if ($debug==1){echo "dos parametros <br>";}
		$json=str_replace("[{", '[{"sq":"'.$i.'","url":"plan'.$i.'.html",', $json);
		$json=substr($json,1);$json=substr($json, 0,-1);if ($debug==1){echo "arreglado ".$json."<br>";}
		$original=substr($original,1);$original=substr($original,0,-1);if ($debug==1){echo "arreglado ".$original."<br>";}
		$finalJsonString="[".$json.",".$original."]";
    }
	return $finalJsonString;
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function traeImg
@param json json cadena de donde extraer la imagen
@description funcion que trae la imagen y solicita el cambio de tamaño de la imagen inicial de viajes.html al tamaño  

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function traeImg($json){
	$array=json_decode($json,true);$img=$array[0][img]; 
    cambiartam($img, "imagen1.jpg", 1230);
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function cambiarTam
@param varchar nombre URL de la ubicación del archivo a ajustar
@param varchar archivo nombre del archivo de salida a generar
@param int ancho Número en pixeles del ancho del archivo a generar
@param int debug bandera para activar funcion de debug 
@description función para generar el archivo de imagen al tamaño solicitado desde una URL indicada.
@return img imagen1.jpg crea el archivo

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function cambiartam($nombre,$archivo,$ancho, $debug=0){
    if ($debug==0){echo $nombre;}
    $tmp=explode(".", $nombre);
    if (file_exists($archivo)) {unlink($archivo);}
    if ($debug==1){print_r($tmp);}
    $tmp=$tmp[2]; if (preg_match('/jpg|jpeg|JPG/',$tmp)){$ext="jpg";}if (preg_match('/png|PNG/',$tmp)){$ext="png";}if (preg_match('/gif|GIF/',$tmp)){$ext="gif";}
	if ($debug==1){echo $ext;}
    switch ($ext) {
        case 'jpg':
            $imagen=imagecreatefromjpeg($nombre);
            break;
        case 'png':
            $imagen=imagecreatefrompng($nombre);
            break;
        case 'gif':
            $imagen=imagecreatefromgif($nombre);
            break;
        default:
            echo "extension no valida";
            break;
    }
    $x=imagesx($imagen);$y=imagesy($imagen);
//$x=800;$y=600;
    $alto=round(($ancho*$y)/$x);
    if ($x > $y) { $w=$ancho; $h=$y*($alto/$x); }
    if ($x < $y) { $w=$x*($ancho/$y); $h=$alto; }
    if ($x == $y){ $w=$ancho; $h=$alto; }

  //  $w=$ancho;$h=($w*$y)/$x;$h=round($h);
    if ($debug==1){echo "orgX:".$x.",orgY:".$y.",newX:".$w.",newY:".$h;}

    $destino=ImageCreateTrueColor($w,$h);
    if ($debug==1){echo $destino;echo ",".$imagen.",0,0,0,0,".$w.",".$h.",".$x.",".$y;}
    imagecopyresampled($destino,$imagen,0,0,0,0,$w,$h,$x,$y); 

    if (preg_match("/png/",$tmp))  {imagepng($destino,$archivo); } 
    if (preg_match("/gif/",$tmp))  {imagegif($destino,$archivo); }
    else {imagejpeg($destino,$archivo); }

    imagedestroy($destino); imagedestroy($imagen); 
}

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Function decodificar_utf8
@param varchar cadena texto a cambiar a utf-8
@description función para cambiar codificaciones de ISO8859-1 a UTF-8
@return varchar cadena de texto modificada

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function decodificar_utf8($cadena){
 
    $buscar = array(
        'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ă', 'Ą',
        'Ç', 'Ć', 'Č', 'Œ',
        'Ď', 'Đ',
        'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ă', 'ą',
        'ç', 'ć', 'č', 'œ',
        'ď', 'đ', 'È', 'É', 'Ê', 'Ë', 'Ę', 'Ě',
        'Ğ',
        'Ì', 'Í', 'Î', 'Ï', 'İ',
        'Ĺ', 'Ľ', 'Ł',
        'è', 'é', 'ê', 'ë', 'ę', 'ě',
        'ğ',
        'ì', 'í', 'î', 'ï', 'ı',
        'ĺ', 'ľ', 'ł',
        'Ñ', 'Ń', 'Ň',
        'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ő',
        'Ŕ', 'Ř',
        'Ś', 'Ş', 'Š',
        'ñ', 'ń', 'ň',
        'ò', 'ó', 'ô', 'ö', 'ø', 'ő',
        'ŕ', 'ř',
        'ś', 'ş', 'š',
        'Ţ', 'Ť',
        'Ù', 'Ú', 'Û', 'Ų', 'Ü', 'Ů', 'Ű',
        'Ý', 'ß',
        'Ź', 'Ż', 'Ž',
        'ţ', 'ť',
        'ù', 'ú', 'û', 'ų', 'ü', 'ů', 'ű',
        'ý', 'ÿ',
        'ź', 'ż', 'ž',
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'р',
        'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
        'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'
        );
 
    $remplazar = array(
        'A', 'A', 'A', 'A', 'A', 'A', 'AE', 'A', 'A',
        'C', 'C', 'C', 'CE',
        'D', 'D',
        'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'a', 'a',
        'c', 'c', 'c', 'ce',
        'd', 'd',
        'E', 'E', 'E', 'E', 'E', 'E',
        'G',
        'I', 'I', 'I', 'I', 'I',
        'L', 'L', 'L',
        'e', 'e', 'e', 'e', 'e', 'e',
        'g',
        'i', 'i', 'i', 'i', 'i',
        'l', 'l', 'l',
        'N', 'N', 'N',
        'O', 'O', 'O', 'O', 'O', 'O', 'O',
        'R', 'R',
        'S', 'S', 'S',
        'n', 'n', 'n',
        'o', 'o', 'o', 'o', 'o', 'o',
        'r', 'r',
        's', 's', 's',
        'T', 'T',
        'U', 'U', 'U', 'U', 'U', 'U', 'U',
        'Y', 'Y',
        'Z', 'Z', 'Z',
        't', 't',
        'u', 'u', 'u', 'u', 'u', 'u', 'u',
        'y', 'y',
        'z', 'z', 'z',
        'A', 'B', 'B', 'r', 'A', 'E', 'E', 'X', '3', 'N', 'N', 'K', 'N', 'M', 'H', 'O', 'N', 'P',
        'a', 'b', 'b', 'r', 'a', 'e', 'e', 'x', '3', 'n', 'n', 'k', 'n', 'm', 'h', 'o', 'p',
        'C', 'T', 'Y', 'O', 'X', 'U', 'u', 'W', 'W', 'b', 'b', 'b', 'E', 'O', 'R',
        'c', 't', 'y', 'o', 'x', 'u', 'u', 'w', 'w', 'b', 'b', 'b', 'e', 'o', 'r'
        );
 
    return str_replace($buscar, $remplazar, $cadena);
    
}
?>