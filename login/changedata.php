<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@subpackage login
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>
@description Programa que recibe un token si es el generado abre formulario de carga y verificación sino 
             devuelve

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                         

@param varchar tk  token generado en el log-in.php 
@return array POST arreglo con los datos de (URL de imagen, titulo plan, duración del plan,  fechas, costo y
                   URL del link de destino) x 3

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
$tk=$_GET[tk];
//echo $tk."<br>";
$las=substr($tk, -1);//echo "las:".$las."<br>";
$first=substr($tk, 0,8);//echo "first".$first ."<br>";
$mid=substr($tk, 8,1);//echo "mid".$mid."<hr>";

$verify=0;
if($las>-1){if($las<10){$verify++;/*echo " ok1 ";*/}}
if($first > 78999999 ){/*echo $first ."> 78999999"*/;if($first < 90000000){$verify++;/*echo $first ."< 90000000";echo " ok2 ";*/}}
$midN=ord($mid);if ($midN>96){if($midN<122){$verify++;/*echo " ok3 ";*/}}

if ($verify==3){
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style>
	 body{font-family: Helvetica,Verdana, Arial, sans-serif;font-weight: 200;}
	.overlay-destino{ top:0px;    margin-top: -153px; margin-left: auto;    margin-right: auto;    width: 369px;    position: relative;      background-color: rgba(0, 0, 0, 0.33);    height: 154px;}
	#over1{top:299px;display:none;}#over2{display:none;}#over3{display:none;}
	.h3-blanco {    font-family: 'Oswald', sans-serif;    color: #FFF;    font-size: 30px;    text-align: left;    margin-top: 5px;    margin-bottom: 5px;}
	.datos-destino { width: 75%;    padding-left: 20px;    padding-top: 10px;}
	.datos-destino p {    color: #FFF;    font-size: 12px;    text-align: left;    font-weight: bolder;}
	</style>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
</head>
<body>
 <div id='logo' ><img src='bestravel.png' /></div>
<form action="savePlans.php" method="post" style="margin-left: 25%;">
<table><tr><td>
	<table>
		<tr><th>Dirección de la Imágen</th><td><input type="text" name='img1' id='imagen1' ></td></tr>
		<tr><th>Titulo</th><td><input type="text" name='title1' id='titulo1'></td></tr>
		<tr><th>Duración</th><td><input type="text" id='time1' name='duracion1'></td></tr>		
		<tr><th>Fechas</th><td><input type="text" id='cal1' name='fecha1'></td></tr>
		<tr><th>Costo</th><td><input type="text" id='price1' name='costo1'></td></tr>
		<tr><th>Dirección plan</th><td><input type="text" id='link1' name='url1'></td></tr>
	</table></td><td>
		<div id='test1' style="height:450px;">
			<div class="overlay-destino" id='over1'>
				<div class="datos-destino" style="position:relative;">
				<p class="destinos-fecha" id='Lan_duracion1' style='display:none;'>fecha4</p>
				<h3 class="h3-blanco" id="Lan_title1" style='display:none;'>TITULO4</h3>
				<p class="destinos-description" id='Lan_tiempo1' style='display:none;'>dias4 costo4</p>
			</div></div>
			<img id='Lan_image1'src="" style='display:none;'/>
		</div>
	</td></tr>
	<tr><td><hr></td><td><hr></td></tr>
	<tr><td>
	<table>
		<tr><th>Dirección de la Imágen</th><td><input type="text" name='img2' id='imagen2' ></td></tr>
		<tr><th>Titulo</th><td><input type="text" name='title2' id='titulo2'></td></tr>
		<tr><th>Duración</th><td><input type="text" id='time2' name='duracion2'></td></tr>		
		<tr><th>Fechas</th><td><input type="text" id='cal2' name='fecha2'></td></tr>
		<tr><th>Costo</th><td><input type="text" id='price2' name='costo2'></td></tr>
		<tr><th>Dirección plan</th><td><input type="text" id='link2' name='url2'></td></tr>
	</table></td><td>
		<div id='test2' style="height:300px;">
			<img id='Lan_image2'src="" style='display:none;'/>
			<div class="overlay-destino" id='over2'>
				<div class="datos-destino" >
					<p class="destinos-fecha" id='Lan_duracion2' style='display:none;'>fecha4</p>
					<h3 class="h3-blanco" id="Lan_title2" style='display:none;'>TITULO4</h3>
					<p class="destinos-description" id='Lan_tiempo2' style='display:none;'>dias4 costo4</p>

				</div>
			</div>
		</div>
	</td></tr>
	<tr><td><hr></td><td><hr></td></tr>
	<tr><td>
	<table>
		<tr><th>Dirección de la Imágen</th><td><input type="text" name='img3' id='imagen3' ></td></tr>
		<tr><th>Titulo</th><td><input type="text" name='title3' id='titulo3'></td></tr>
		<tr><th>Duración</th><td><input type="text" id='time3' name='duracion3'></td></tr>		
		<tr><th>Fechas</th><td><input type="text" id='cal3' name='fecha3'></td></tr>
		<tr><th>Costo</th><td><input type="text" id='price3' name='costo3'></td></tr>
		<tr><th>Dirección plan</th><td><input type="text" id='link3' name='url3'></td></tr>
	</table></td><td>
		<div id='test3' style="height:300px;">
			<img id='Lan_image3'src="" style='display:none;'/>
			<div class="overlay-destino" id='over3'>
				<div class="datos-destino" >
					<p class="destinos-fecha" id='Lan_duracion3' style='display:none;'>fecha4</p>
					<h3 class="h3-blanco" id="Lan_title3" style='display:none;'>TITULO4</h3>
					<p class="destinos-description" id='Lan_tiempo3' style='display:none;'>dias4 costo4</p>

				</div>
			</div>
		</div>
	</td></tr>
	<tr><td><hr></td><td><hr></td></tr>
	</table>
	<input type="submit" value="Guardar"><input type="button" value="cancelar" id="atras">
</form>
<script>
$(document).ready(function () {
 $('#titulo1').blur(function(){
    var title = $('#titulo1').val();
    $('#over1').css('display','block');
    $('#Lan_title1').text(title);
    $('#Lan_title1').css('display','block');
 })
$('#imagen1').blur(function(){
    var imagen = $('#imagen1').val();
    $('#Lan_image1').attr("src",imagen);
    $('#Lan_image1').css('width', '370px');
	$('#Lan_image1').css('height', '299px');
    $('#Lan_image1').css('display','block');
 })
 $('#time1').blur(function(){
    var time = $('#time1').val();
    $('#Lan_tiempo1').text(time);
    $('#Lan_tiempo1').css('display','block')
 })
$('#cal1').blur(function(){
    var cal = $('#cal1').val();
    $('#Lan_duracion1').text(cal+", ");
    $('#Lan_duracion1').css('display','inline')
 })
$('#price1').blur(function(){
    var price = $('#price1').val();
    var old= $('#time1').val();
    price= old +' Desde '+ price; 
    $('#Lan_tiempo1').text(price);
    $('#Lan_tiempo1').css('display','inline')
 })
//dos
$('#titulo2').blur(function(){
    var title = $('#titulo2').val();
    $('#over2').css('display','block');
    $('#Lan_title2').text(title);
    $('#Lan_title2').css('display','block')
 })
$('#imagen2').blur(function(){
    var imagen = $('#imagen2').val();
    $("#Lan_image2").attr("src",imagen);
    $('#Lan_image2').css('width', '370px');
	$('#Lan_image2').css('height', '299px');
    $('#Lan_image2').css('display','block');
 })
 $('#time2').blur(function(){
    var time = $('#time2').val();
    $('#Lan_tiempo2').text(time);
    $('#Lan_tiempo2').css('display','block')
 })
$('#cal2').blur(function(){
    var cal = $('#cal2').val();
    $('#Lan_duracion2').text(cal+", ");
    $('#Lan_duracion2').css('display','inline')
 })
$('#price2').blur(function(){
    var price = $('#price2').val();
    var old= $('#time2').val();
    price= old +' Desde '+ price;
    $('#Lan_tiempo2').text(price);
    $('#Lan_tiempo2').css('display','inline')
 })
//tres
$('#titulo3').blur(function(){
    var title = $('#titulo3').val();
    $('#over3').css('display','block');
    $('#Lan_title3').text(title);
    $('#Lan_title3').css('display','block')
 })
$('#imagen3').blur(function(){
    var imagen = $('#imagen3').val();
    $("#Lan_image3").attr("src",imagen);
    $('#Lan_image3').css('width', '370px');
	$('#Lan_image3').css('height', '299px');
    $('#Lan_image3').css('display','block');
 })
 $('#time3').blur(function(){
    var time = $('#time3').val();
    $('#Lan_tiempo3').text(time);
    $('#Lan_tiempo3').css('display','block')
 })
$('#cal3').blur(function(){
    var cal = $('#cal3').val();
    $('#Lan_duracion3').text(cal+", ");
    $('#Lan_duracion3').css('display','inline')
 })
$('#price3').blur(function(){
    var price = $('#price3').val();
    var old= $('#time3').val();
    price= old +' Desde '+ price;
    $('#Lan_tiempo3').text(price);
    $('#Lan_tiempo3').css('display','inline')
 })
$('#atras').click(function() {
    window.history.back();
 })
}); 
</script>
</body>
</html>
<?php
}else{
		echo '<!DOCTYPE html><html><head><script>function inicio(){ alert("ingrese de nuevo por favor");window.location.replace("http://e-reservasweb.com/estarbien/login/"); }</script></head><body onload="inicio()"></body></html>';
}
?>