<?php
//print_r($_POST);
if ($_POST['user']=='CAGUDELO'){
	if($_POST['pass']=='ca.11110'){
		$var=rand(78999999,90000000);
		$str=rand(97,122);$str=chr($str);
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


