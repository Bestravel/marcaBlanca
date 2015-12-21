<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>
@description programa consolidador de todos los planes en una sola pagina viajes.html

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                                                                             

@param json version.json archivo con la versión de los planes provistos por Bestravel
@param json planes.json archivo con los datos de los planes para alimentar el archivo viajes.html
@param json propios.json archivo con los datos de los planes propios cargados por el cliente
@param html templates.html archivo con la plantilla del archivo de salida
@param html theme_bloque.html archico con la plantilla de los bloques propios
@return html viajes.html página de salida.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    

	$nombre_fichero="viajes";$logfile=$nombre_fichero.".log";$landing=$nombre_fichero.".html";
	if (file_exists($log)) {$action="review";} else {$action="create";}
	if ($action =="review"){
		$fp=fopen($log, "r");$version_archivo=fread($fp, filesize($log));fclose($fp);
		$jp=fopen("version.json", "r");$version_planes=fread($jp, filesize("version.json"));$array_json=json_decode($version_planes,true);$version_planes_data=$array_json[0][version];fclose($jp);
		if ($version_archivo==$version_planes_data){$action="redir";}else{unlink($log);unlink($landing);$action="create";}
	}
	if ($action =="create"){
		$jp=fopen("version.json", "r");$version_planes=fread($jp, filesize("version.json"));$array_json=json_decode($version_planes,true);$version_planes_data=$array_json[0][version];fclose($jp);
		$log=$version_planes_data;$wp=fopen($logfile, "a+");fwrite($wp, $log);fclose($wp);
		$fp=fopen("template.html", "r");$template=fread($fp, filesize("template.html"));fclose($fp);
		$jp=fopen("planes.json", "r");$json_planes=fread($jp, filesize("planes.json"));$array_planes=json_decode($json_planes,true);fclose($jp);
		//titulos
		$template=str_replace("TITULO1", $array_planes[4][title], $template);$template=str_replace("TITULO2", $array_planes[3][title], $template);
		$template=str_replace("TITULO3", $array_planes[2][title], $template);$template=str_replace("TITULO4", $array_planes[1][title], $template);$template=str_replace("TITULO5", $array_planes[0][title], $template);
		//duracion
		$template=str_replace("dias1", $array_planes[4][duracion], $template);$template=str_replace("dias2", $array_planes[3][duracion], $template);
		$template=str_replace("dias3", $array_planes[2][duracion], $template);$template=str_replace("dias4", $array_planes[1][duracion], $template);$template=str_replace("dias5", $array_planes[0][duracion], $template);
		//costo
		$template=str_replace("costo1", $array_planes[4][costo], $template);$template=str_replace("costo2", $array_planes[3][costo], $template);
		$template=str_replace("costo3", $array_planes[2][costo], $template);$template=str_replace("costo4", $array_planes[1][costo], $template);$template=str_replace("costo5", $array_planes[0][costo], $template);
		//fecha
		$template=str_replace("fecha1", $array_planes[4][fecha], $template);$template=str_replace("fecha2", $array_planes[3][fecha], $template);
		$template=str_replace("fecha3", $array_planes[2][fecha], $template);$template=str_replace("fecha4", $array_planes[1][fecha], $template);$template=str_replace("fecha5", $array_planes[0][fecha], $template);
		//img
		$template=str_replace("img-1", $array_planes[4][img], $template);$template=str_replace("img-2", $array_planes[3][img], $template);
		$template=str_replace("img-3", $array_planes[2][img], $template);$template=str_replace("img-4", $array_planes[1][img], $template);$template=str_replace("img-5", $array_planes[0][img], $template);
		//url
		$template=str_replace("url1", $array_planes[4][url], $template);$template=str_replace("url2", $array_planes[3][url], $template);
		$template=str_replace("url3", $array_planes[2][url], $template);$template=str_replace("url4", $array_planes[1][url], $template);$template=str_replace("url5", $array_planes[0][url], $template);

		
		$mio=fopen("propios.json", "r");$json_planes=fread($mio, filesize("planes.json"));fclose($mio);
		if ($json_planes!="[{}]"){
			$array_planes=json_decode($json_planes,true);
			$qp=fopen("theme_bloque.html", "r");$tema=fread($qp, filesize("theme_bloque.html"));fclose($qp);
			$tema=str_replace("TITULO1", $array_planes[4][title], $tema);$tema=str_replace("TITULO2", $array_planes[3][title], $tema);
			$tema=str_replace("TITULO3", $array_planes[2][title], $tema);$tema=str_replace("TITULO4", $array_planes[1][title], $tema);$tema=str_replace("TITULO5", $array_planes[0][title], $tema);
			//duracion
			$tema=str_replace("dias1", $array_planes[4][duracion], $tema);$tema=str_replace("dias2", $array_planes[3][duracion], $tema);
			$tema=str_replace("dias3", $array_planes[2][duracion], $tema);$tema=str_replace("dias4", $array_planes[1][duracion], $tema);$tema=str_replace("dias5", $array_planes[0][duracion], $tema);
			//costo
			$tema=str_replace("costo1", $array_planes[4][costo], $tema);$tema=str_replace("costo2", $array_planes[3][costo], $tema);
			$tema=str_replace("costo3", $array_planes[2][costo], $tema);$tema=str_replace("costo4", $array_planes[1][costo], $tema);$tema=str_replace("costo5", $array_planes[0][costo], $tema);
			//fecha
			$tema=str_replace("fecha1", $array_planes[4][fecha], $tema);$tema=str_replace("fecha2", $array_planes[3][fecha], $tema);
			$tema=str_replace("fecha3", $array_planes[2][fecha], $tema);$tema=str_replace("fecha4", $array_planes[1][fecha], $tema);$tema=str_replace("fecha5", $array_planes[0][fecha], $tema);
			//img
			$tema=str_replace("img-1", $array_planes[4][img], $tema);$tema=str_replace("img-2", $array_planes[3][img], $tema);
			$tema=str_replace("img-3", $array_planes[2][img], $tema);$tema=str_replace("img-4", $array_planes[1][img], $tema);$tema=str_replace("img-5", $array_planes[0][img], $tema);
			//url
			$tema=str_replace("url1", $array_planes[4][url], $tema);$tema=str_replace("url2", $array_planes[3][url], $tema);
			$tema=str_replace("url3", $array_planes[2][url], $tema);$tema=str_replace("url4", $array_planes[1][url], $tema);$tema=str_replace("url5", $array_planes[0][url], $tema);			
			$template=str_replace("<!--BLOQUES PROPIOS-->", $tema, $template);
		}
		

		if (file_exists($landing)) {unlink($landing);}
		$lp=fopen($landing, "a+");fwrite($lp, $template);fclose($lp);	
		$action="redir";
	}
	if ($action=="redir"){
		header("location:".$landing);
	}
?>