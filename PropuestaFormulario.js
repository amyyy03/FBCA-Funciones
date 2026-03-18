$(document).ready(function() {

    // Detecta el cambio en el campo "ID/Código de la propuesta" usando el ID
    $("#cre0b_codigointerno").on('change', function() {
        // Copiar el valor de "cre0b_codigointerno" al campo "cre0b_id"
        var codigoInterno = $(this).val();
        $("#cre0b_id").val(codigoInterno);  // Usamos el id del campo de destino
    });
  

    var enviarButtonName = $("input[type='button'][value='Enviar']").attr('name');


    // Crear el botón de "Guardar" dinámicamente dentro del formulario
    var guardarButton = $('<input>', {
        type: 'button',
        id: 'btnGuardar',
        value: 'Guardar',
        class: 'submit-btn btn btn-primary form-action-container-left',
        click: function() {
            // Llamada a la función guardarDatos al hacer clic en el botón
            guardarDatos();
        }
    });

    // Insertamos el botón al final del formulario o donde lo necesites
    $('.actions').prepend(guardarButton); // Asegúrate de que .actions es el div correcto

    // Función para guardar los datos
    function guardarDatos() {
        // Cambiar el valor del campo estado a "Guardado"
        $("#cre0b_estado").val("277010005");
        $("#cre0b_etapa").val("277010000");


        // Validación de cliente antes de enviar el formulario
        if (typeof entityFormClientValidate === 'function' && entityFormClientValidate()) {
            if (typeof Page_ClientValidate === 'function' && Page_ClientValidate('')) {
                clearIsDirty();
                disableButtons();
                $("#btnGuardar").val('Procesando...'); // Cambia el texto del botón mientras se procesa
                // Enviar el formulario
                WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(
                     enviarButtonName,
                    "", 
                    true, 
                    "", 
                    "", 
                    false, 
                    true
                ));
            }
        } else {
            alert("Por favor, complete los campos requeridos antes de enviar.");
        }
    }

    $("#cre0b_id").closest("td").hide();
    $("#cre0b_linksharepoint").closest("td").hide();
    $("#cre0b_estado").closest("td").hide();
    $("#cre0b_etapa").closest("td").hide();

    $("table.section tr:eq(9)").hide();
    $("table.section tr:eq(10)").hide();
    $("table.section tr:eq(11)").hide();


    // Ocultar justificaciones alcance y compromisos
    function setFieldVisibleByLabel(fieldId, visible) {
      const $input = $(fieldId);
      if (!$input.length) {
        console.warn("No existe el campo:", fieldId);
        return;
      }

      const id = $input.attr("id");
      const $label = $("label[for='" + id + "']").first();

      const $tdLabel = $label.closest("td");
      const $tdControl = $input.closest("td");

      const $tr = $tdControl.closest("tr");
      const $zeroCells = $tr.find("td.zero-cell"); // <- clave

      if (visible) {
        $tdLabel.show();
        $tdControl.show();
        $zeroCells.show(); // restituye
      } else {
        $tdLabel.hide();
        $tdControl.hide();
        $zeroCells.hide(); // elimina el hueco
      }
    }

    function toggleAlcance() {
      const v = $("input[name*='cre0b_alcance']:checked").val();
      setFieldVisibleByLabel("#cre0b_justificacionf1", v === "0");
    }

    function toggleCompromiso() {
      const v = $("input[name*='cre0b_compromisosalineados']:checked").val();
      setFieldVisibleByLabel("#cre0b_justificacionf2", v === "0");
    }

    // Al cargar
    toggleAlcance();
    toggleCompromiso();

    // Delegación
    $(document).on("change", "input[name*='cre0b_alcance']", toggleAlcance);
    $(document).on("change", "input[name*='cre0b_compromisosalineados']", toggleCompromiso);



    //Funcion de linksharepoint
    $("#cre0b_codigointerno").on("change keyup", function () {

        var codigoInterno = $(this).val().trim();

        //Copiar al campo ID
        $("#cre0b_id").val(codigoInterno);

        //Si está vacío, limpiar el link
        if (!codigoInterno) {
            $("#cre0b_linksharepoint").val("");
            return;
        }

        //Construir URL de SharePoint
        var baseUrl = "https://fondobiocorredoramazonico.sharepoint.com/rea%20Tcnica/Forms/AllItems.aspx?id=%2Frea%20Tcnica%2FUso%20Interno%2FSOLICITUDES%20SUBVENCIONES%2F";

        var linkFinal = baseUrl + encodeURIComponent(codigoInterno) + "%2FNOTA%20CONCEPTUAL";

        //Asignar al campo LinkSharepoint
        $("#cre0b_linksharepoint").val(linkFinal);
    });    
    
    // Establece el valor de "Etapa" como "Evaluación Administrativa" al inicio
    $("#cre0b_etapa").val("277010001");

    // Actualiza el valor cada 1.5 segundos (1500 milisegundos)
    setInterval(function() {
        $("#cre0b_etapa").val("277010001"); //etapa Evaluación Administrativa
        $("#cre0b_estado").val("277010000");
    }, 1500); // 1500 milisegundos = 1.5 segundos




  const friendly = "El ID/Código de la propuesta ya existe. Debe ser único.";

  function reemplazarMensaje() {
    // Caso principal (tu captura): <span id="MessageLabel"><p class="text-danger">Error desconocido...</p>
    const $msg = $("#MessageLabel, #MessagePanel, .validation-summary, #ValidationSummaryEntityFormView, .alert-danger");
    if (!$msg.length) return;

    const texto = $msg.text();

    if (/Error desconocido|Unknown error/i.test(texto)) {
      // Si hay lista <ul>, la reemplazamos por un <li>
      const $ul = $msg.find("ul");
      if ($ul.length) {
        $ul.html("<li>" + friendly + "</li>");
      } else {
        // Si no hay <ul>, reemplazamos el texto del párrafo (o del contenedor)
        const $p = $msg.find("p.text-danger");
        if ($p.length) $p.text(friendly);
        else $msg.text(friendly);
      }
    }
  }

  // Ejecuta una vez al cargar
  reemplazarMensaje();

  // Observa cambios (cuando el portal inyecta el error luego de enviar)
  const observer = new MutationObserver(function () {
    reemplazarMensaje();
  });

  observer.observe(document.body, { childList: true, subtree: true });


// =======================================================
// FORMATEO EUROPEO EN VIVO (miles con . y decimales con ,)
// =======================================================

// Convierte lo que escribe el usuario en formato europeo
function formatearMontoEuropeo(valor) {
    // Mantener solo números
    valor = valor.replace(/\D/g, "");

    if (valor === "") return "";

    // Convertir a número entero (centavos)
    let numero = parseInt(valor, 10);

    // Convertir a valor real dividiendo para 100
    let real = numero / 100;

    // Formatear con miles "." y decimales ","
    return real.toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Aplicar formateo en vivo
$("#cre0b_financiamientosolicitado").on("input", function () {
    const input = this;

    // Valor original antes de formatear
    let raw = $(this).val() || "";

    // Si no hay nada o solo 1 dígito → formatear simple y mandar cursor al final
    const soloDigitos = raw.replace(/\D/g, "");
    if (soloDigitos.length <= 1) {
        let formateadoSimple = formatearMontoEuropeo(raw);
        $(this).val(formateadoSimple);

        const len = formateadoSimple.length;
        input.setSelectionRange(len, len);

        validarMontoPorTipo();
        return;
    }

    // --------- desde aquí, lógica con preservación de cursor ---------

    // Guardar posición del cursor
    let start = input.selectionStart;

    // Contar cuántos dígitos había antes del cursor
    let antes = raw.slice(0, start).replace(/\D/g, "").length;

    // Formatear
    let formateado = formatearMontoEuropeo(raw);
    $(this).val(formateado);

    // Reconstruir la posición del cursor
    let nuevoCursor = 0;
    let contador = 0;

    for (let i = 0; i < formateado.length; i++) {
        if (/\d/.test(formateado[i])) contador++;
        if (contador === antes) {
            nuevoCursor = i + 1;
            break;
        }
    }

    // Si no se encontró posición razonable, mandar al final como fallback
    if (!nuevoCursor) {
        nuevoCursor = formateado.length;
    }

    input.setSelectionRange(nuevoCursor, nuevoCursor);

    validarMontoPorTipo();
});



// =======================================================
// CONVERTIR FORMATO EUROPEO A NÚMERO REAL PARA VALIDACIÓN
// =======================================================

function getMontoNumerico() {
    let raw = $("#cre0b_financiamientosolicitado").val() || "";

    // Quitar puntos de miles
    raw = raw.replace(/\./g, "");

    // Cambiar coma decimal por punto
    raw = raw.replace(/,/g, ".");

    let n = parseFloat(raw);
    return isNaN(n) ? 0 : n;
}


// =======================================================
// MENSAJES Y ESTILOS
// =======================================================

function mostrarMensaje(texto) {
    const $monto = $("#cre0b_financiamientosolicitado");

    if ($("#montoErrorMsg").length === 0) {
        $("<div id='montoErrorMsg' style='color:#dc3545; font-size:13px; margin-top:5px; font-weight:500;'></div>")
            .insertAfter($monto);
    }

    $("#montoErrorMsg").text(texto).show();
}

function ocultarMensaje() {
    $("#montoErrorMsg").hide();
}

function marcarMontoEnRojo(rojo) {
    const $monto = $("#cre0b_financiamientosolicitado");

    if (rojo) {
        $monto.css({
            "border": "2px solid #dc3545",
            "background": "#fff5f5"
        });
    } else {
        $monto.css({
            "border": "",
            "background": ""
        });
    }
}


// =======================================================
// VALIDACIÓN SEGÚN TIPO DE SUBVENCIÓN
// =======================================================

function validarMontoPorTipo() {

    const tipo = $("#cre0b_categoriasubvencion").val();
    const monto = getMontoNumerico();

    let rojo = false;
    let mensaje = "";

    // PEQUEÑA
    if (tipo === "277010000") {
        if (monto > 100000) {
            rojo = true;
            mensaje = "Para subvención Pequeña el monto no puede ser mayor a $100.000,00";
        }
    }

    // MEDIANA
    else if (tipo === "277010001") {
        if (monto <= 100000 || monto > 500000) {
            rojo = true;
            mensaje = "Para subvención Mediana el monto debe estar entre $100.000,01 y $500.000,00";
        }
    }

    // GRANDE
    else if (tipo === "277010002") {
        if (monto < 500000) {
            rojo = true;
            mensaje = "Para subvención Grande el monto debe ser mayor o igual a $500.000,00";
        }
    }

    marcarMontoEnRojo(rojo);

    if (rojo) {
        mostrarMensaje(mensaje);
    } else {
        ocultarMensaje();
    }
}


// =======================================================
// EJECUTAR VALIDACIÓN AL CARGAR
// =======================================================

validarMontoPorTipo();

// Revalidar cuando cambia la categoría
$("#cre0b_categoriasubvencion").on("change", validarMontoPorTipo);



    // =======================================================
    // SOLO DESHABILITAR BOTONES + MENSAJE EXPLICATIVO
    // =======================================================

    function norm(v){
      return (v || "").trim().toLowerCase();
    }

    function existeDuplicado(){
      const val = norm($("#cre0b_codigointerno").val());
      if(!val) return false;
      return (window.existingCodigos || []).includes(val);
    }

    // Detectar botón Enviar
    var enviarButtonName = $("input[type='button'][value='Enviar']").attr('name');
    var $btnEnviar = enviarButtonName ? $("input[name='" + enviarButtonName + "']") : $();

    // Detectar botón Guardar
    var $btnGuardar = $("#btnGuardar");

    // Crear mensaje si no existe
    if ($("#btnErrorMsg").length === 0) {
      $("<span id='btnErrorMsg' style='display:none; margin-left:15px; color:#dc3545; font-weight:600; font-size:13px;'></span>")
        .insertAfter($btnEnviar.length ? $btnEnviar : $btnGuardar);
    }

    function actualizarEstadoBotones(){

      if(existeDuplicado()){
        
        $btnEnviar.prop("disabled", true);
        $btnGuardar.prop("disabled", true);

        $("#btnErrorMsg")
          .text("No puede continuar: el ID/Código ya existe. Debe ser único.")
          .show();

      } else {

        $btnEnviar.prop("disabled", false);
        $btnGuardar.prop("disabled", false);

        $("#btnErrorMsg").hide();
      }
    }

    // Validación en vivo
    $("#cre0b_codigointerno").on("input change blur", function(){
      actualizarEstadoBotones();
    });

    // Ejecutar al cargar
    actualizarEstadoBotones();

});