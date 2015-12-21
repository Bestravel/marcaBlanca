<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@subpackage login
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>
@description Libreria que se llama para evaluar usuario y contraseña, si es valido, crea un token para 
             acceder.

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                         

@param varchar user  usuario
@param varchar pass  clave en claro                                                  
@return varchar tk token para ack de la pagina de ingreso

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
if ($_POST['user']=='CAGUDELO'){
	if(md5($_POST['pass'])=='0743e6c36f472241c78ac2f5b5bbfc34'){
		$var=rand(78999999,90000000);
		$str=rand(97,122);$str=chr($str);para
		$fin=rand(0,9);$tk=$var.$str.$fin;
		header('location:changedata.php?tk='.$tk);
	}else{
		$msg='clave incorrecta';
		echo '<!DOCTYPE html><html><head><script>function inicio(){ alert("'.$msg.'");window.location.replace("http://e-reservasweb.com/estarbien/login/"); }</script></head><body onload="inicio()"></body></html>';
	}
}else{
	$msg='usuario no autorizado';
	echo '<!DOCTYPE html><html><head><script>function inicio(){ alert("'.$msg.'");window.location.replace("http://e-reservasweb.com/estarbien/login/"); }</script></head><body onload="inicio()"></body></html>';
}
?>