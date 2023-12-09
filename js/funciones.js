document.addEventListener("DOMContentLoaded", principal);

function principal(){
    const $tiempoTranscurrido = document.querySelector("#tiempoTranscurrido");
    const $btnIniciar = document.querySelector("#btnIniciar");
    const $btnMarca = document.querySelector("#btnMarca");
    const $btnDetener = document.querySelector("#btnDetener");
    const $contenedorMarcas = document.querySelector("#contenedorMarcas");

    const $regataIniciada = document.getElementById("regataIniciada");
    const $regataFinalizada = document.getElementById("regataFinalizada");

    const $btnDescargarFichero = document.getElementById("descargarFichero");
    

    let marcas = [],
        cronometro,
        tiempoInicio = null;
    let diferenciaTemporal = 0;



    // funcion mostrar y ocultar elementos

    const mostrarElemento = (elemento) => {
        elemento.style.display = "";
    };

    const ocultarElemento = (elemento) => {
        elemento.style.display = "none";
    };

    //funcion que inicia el cronometro

    const iniciar = () => {
        const ahora = new Date();
        tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal);// no tengo muy claro para que
        cronometro = setInterval(cronometrar, 100);
        ocultarElemento($btnIniciar);
        mostrarElemento($btnMarca);
        mostrarElemento($btnDetener);
        mostrarElemento($contenedorMarcas);

        $regataIniciada.innerHTML = "Regata iniciada a las " + new Date(ahora.getTime()).toString().slice(16,21) + " horas<hr/>";

    };

    const cronometrar = () => {
        const ahora = new Date();
        const diferencia = ahora.getTime() - tiempoInicio.getTime();
        $tiempoTranscurrido.textContent = new Date(diferencia).toISOString().slice(11,21);

    };

    // funcion que anota las marcas

    // const ponerMarca = () => {
    //     marcas.unshift(new Date()-tiempoInicio.getTime()); // añadimos una marca de tiempo al comienzo del array
    //     $contenedorMarcas.innerHTML = "";
    //     for ( let[indice, tiempoPiraguista] of marcas.entries()){
    //         const $p = document.createElement("p");
    //         $p.innerHTML = "<strong>" + (marcas.length - indice) + ". </strong>" + new Date(tiempoPiraguista).toISOString().slice(11,21);
    //         $contenedorMarcas.append($p);

    //     }
    // };

    // funcion que anota marcas dentro de una tabla

    const ponerMarca = () => {
        marcas.unshift(new Date() - tiempoInicio.getTime()); // añadimos una marca de tiempo al comienzo del array
        
    
        // Obtener la referencia de la tabla y su cuerpo
        const $tabla = document.querySelector("#contenedorMarcas table");
        const $tbody = $tabla.querySelector("tbody");

         // Limpiar el contenido actual del cuerpo de la tabla
            $tbody.innerHTML = "";

    
        // Cuerpo de la tabla
        for (let [indice, tiempoPiraguista] of marcas.entries()) {
            const $tr = document.createElement("tr");
            const $tdIndice = document.createElement("td");
            const $tdMarca = document.createElement("td");
            $tdIndice.textContent = marcas.length - indice;
            $tdMarca.textContent = new Date(tiempoPiraguista).toISOString().slice(11, 21);
            $tr.appendChild($tdIndice);
            $tr.appendChild($tdMarca);
            $tbody.appendChild($tr);
            
        }
    };
    
    
    ///-------------------------
    // funcion finalizar cronometro

    const finalizar = () => {
        const horaFinalizacion = new Date();
        $regataFinalizada.innerHTML = "Regata finalizada a las " + new Date(horaFinalizacion.getTime()).toString().slice(16,21) + " horas<hr/>";
        ocultarElemento($btnMarca);
        ocultarElemento($btnDetener);
        clearInterval(cronometro);
        mostrarElemento($btnDescargarFichero);
        
        $tiempoTranscurrido.innerHTML="CRONOMETRO DETENIDO <hr/>";

    };

    // funcion de como esta todo al comienzo

    const init = () => {
        $tiempoTranscurrido.innerHTML = "00h:00min:00sg";
        ocultarElemento($btnDetener);
        ocultarElemento($btnMarca);
        ocultarElemento($contenedorMarcas);
        ocultarElemento($btnDescargarFichero);
    };

    init();


    // funcion para descargar fichero con tiempos

    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
        return function(table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
          window.location.href = uri + base64(format(template, ctx))
        }
      })()

      ///--------

    $btnIniciar.onclick = iniciar;
    $btnMarca.onclick = ponerMarca;
    $btnDetener.onclick = finalizar;
    $btnDescargarFichero.onclick = function() {
        tableToExcel('testTable', 'W3C Example Table');
    };
    

    
} 