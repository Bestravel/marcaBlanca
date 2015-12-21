<?php
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Marca Blanca                                                                    
                                             
@package Marcablanca
@author Gabriel España - Negocios Electrónicos - Bestravel  <dir.online@bestravel.travel>                                                                             
@description Plataforma de marca blanca, se ató a plataforma de travel net,esta solo para revisar disponibilidad, se alimentan con 5 
             planes de mercadeo y se entrega la posibilida dde cargar solo 3 planes.   

Fecha-ini:05-nov-2015                                                           
Fecha-fin:21-dic-2015                                                           
Cliente: People Pass                                                            
                                                                                 
Estructura: /
             index.php                  (redirector a vuelos.php)
             datos.json                 (datos del cliente)
             planes.json                (datos de los planes que traen desde bestravel)
             propios.json               (datos de los planes propios, se alimenta por plataforma)
             version.json               (datos de la version de los planes)
			 template.html              (plantilla de la página de ingreso)
             theme-bloque.html          (plantilla de los cuadros de planes propios)
             content.php                (libreria carga de encabezado y pie personalizado en planes bestravel *)
             getplans.php               (programa de carga de los planes al json, genera los archivos plan#.html *)
             send.php                   (programa envía las solicitud de cotización desde marca blanca a mayoreo *) 
             viajes.php                 (programa de carga de los planes en viajes.html, verifica version *)
             ajaxloader.gif             (imagen de carga)
             flecha-btn.png             (imagen de flecha a la derecha de los botones)
             imagen1.jpg                (imagen generada para vuelos.html)
             box/                       (directorio de programas para las cajas de busqueda)    
                 css/                   (directorio de hojas de estilo)
                     estilosFlights.css (hoja de estilos caja de vuelos)
                     estilosHotels.css  (hoja de estilos caha de hoteles)
                     {otros archivos}   (no modificar sin hacer la referencia en este archivo)
                 js/                    (directorio de programas en javascript)
                    box_hotels.js       (programa de carga de funcionalidades para hoteles)
                    box_vuelos.js       (programa de carga de funcionalidades para vuelos)
                    {otros archivos}    (no modificar sin hacer la referencia en este archivo)
             headFoot/                  (directorio con estilos, programas de javascript y fuentes de encabezado y pie de paginas)
					 css/               (directorio de hojas de estilo)
                     js/                (directorio de programas en javascript)
                     fonts/             (tipos de letra para encabezados y pies de página)
             css/                       (directorio de hojas de estilo)
                fonts/					(tipos de letra para la página)
                fonts.css               (hoja de estilo que carga las letras que se usan para la pagina)
                style.css               (hoja maestra donde se hacen los cambios de estilos)
                styles.css              (hoja de estilos heredada de wp)
                template_style.css      (hoja de estilos de las cajas del home)
                bootstrap.css           (libreria)
                venobox.css             (libreria de ajuste para responsive)
                {otros archivos}        (no modificar sin hacer la referencia en este archivo)
             js/                        (directorio de programas en javascript para la página)
             login/                     (directorio con la plataforma de carga de los planes propios)
                  index.html            (pantalla de ingreso de usuario y contraseña)
                  log-in.php            (programa para revisión de credenciales *)
                  changedata.php        (programa para mostrar el formulario de carga de los planes propios *)
                  savePlans.php         (programa para guardar el anterior json y cambiar propios.json con los datos ingresados *)
			      bestravel.png         (logo de bestravel transparente)
                  user-icon.png         (icono de usuario)
                  lock-icon.png         (icono de password)
             	  css/                  (directorio de hojas de estilo)
                     fonts/             (tipos de letra para encabezados y pies de página)
                     demo.css           (hoja maestra de estilos de la pagina de login)
                     style#.css         (hojas de estilos de alternativas del paradox)
                  images/               (directorio con las imagenes del paradox, cargarlo a mano)
                  js/                   (directorio de programas en javascript para la página)
++
++
 (*) todos los elementos con asterisco tienen documentación en cada archivo
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
?>