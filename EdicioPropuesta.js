$(document).ready(function() {


    // ==============================
    // OCULTAR BLOQUE DE ADJUNTOS SI NO HAY ARCHIVOS
    // ==============================


    function controlarAdjuntos() {

        var $notesControl = $("#notescontrol");
        if (!$notesControl.length) return;

        var cantidadAdjuntos = $notesControl.find(".note").length;
        var $contenedorAdjuntos = $notesControl.closest("td.notes-cell");

        console.log("Cantidad de adjuntos detectados:", cantidadAdjuntos);

        if (cantidadAdjuntos === 0) {
            $contenedorAdjuntos.hide();
            console.log("No hay adjuntos → bloque ocultado");
        } else {
            $contenedorAdjuntos.show();
            console.log("Hay adjuntos → bloque visible");
        }
    }

    // ejecutar varias veces porque Power Pages carga esto después
    setTimeout(controlarAdjuntos, 800);
    setTimeout(controlarAdjuntos, 1500);
    setTimeout(controlarAdjuntos, 2500);

    function crearBotonLink(idCampo, textoBoton) {

        var $link = $("#" + idCampo)
            .closest(".control")
            .find("a");

        if (!$link.length) return;

        var url = $link.attr("href");

        var $button = $("<button>", {
            type: "button", // evita enviar el formulario
            text: textoBoton,
            class: "btn-link-personalizado",
            click: function (e) {
                e.preventDefault();
                window.open(url, "_blank");
            }
        });

        $link.replaceWith($button);
    }

    if (!document.getElementById("estilo-boton-link")) {
        $("<style id='estilo-boton-link'>\
            .btn-link-personalizado{\
                display:inline-block;\
                padding:10px 18px;\
                background:#0d9488;\
                color:white !important;\
                border:none;\
                border-radius:6px;\
                font-size:14px;\
                font-weight:600;\
                cursor:pointer;\
                transition:all .2s ease;\
            }\
            .btn-link-personalizado:hover{\
                background:#0f766e;\
            }\
        </style>").appendTo("head");
    }

    //Boton de vista sharepoint
    crearBotonLink("cre0b_linksharepoint", "Aquí");

  // ===============================
  // 1) Copiar Código Interno -> ID
  // ===============================
  $("#cre0b_codigointerno").on('change', function() {
    var codigoInterno = $(this).val();
    $("#cre0b_id").val(codigoInterno);
  });

  // ==========================================
  // 2) Mostrar/Ocultar Justificación: Alcance
  // ==========================================
  var selectedValueAlcance = $("input[name*='cre0b_alcance']:checked").val();

  var $tdAlcance = $("#cre0b_justificacionf1").closest("td");


  if (selectedValueAlcance === "0") {
    //$("table.section tr:eq(16)").show();
    $tdAlcance.find(".table-info").show();
    $tdAlcance.find(".control").show();
  } else if (selectedValueAlcance === "1") {
    //$("table.section tr:eq(16)").hide();
    $tdAlcance.find(".table-info").hide();
    $tdAlcance.find(".control").hide();
    $("#cre0b_justificacionf1").val("");
  }

  $("input[name*='cre0b_alcance']").change(function() {
    var selectedValueAlcance = $("input[name*='cre0b_alcance']:checked").val();

    var $tdAlcance = $("#cre0b_justificacionf1").closest("td");

    if (selectedValueAlcance === "0") {
      //$("table.section tr:eq(16)").show();
      $tdAlcance.find(".table-info").show();
      $tdAlcance.find(".control").show();
    } else if (selectedValueAlcance === "1") {
      //$("table.section tr:eq(16)").hide();
      $tdAlcance.find(".table-info").hide();
      $tdAlcance.find(".control").hide();
      $("#cre0b_justificacionf1").val("");
    }
  });

  // ==============================================
  // 3) Mostrar/Ocultar Justificación: Compromiso
  // ==============================================
  var selectedValueCompromiso = $("input[name*='cre0b_compromisosalineados']:checked").val();

  var $tdAlcance = $("#cre0b_justificacionf2").closest("td");

  if (selectedValueCompromiso === "0") {
    //$("table.section tr:eq(18)").show();
    $tdAlcance.find(".table-info").show();
    $tdAlcance.find(".control").show();
  } else if (selectedValueCompromiso === "1") {
    //$("table.section tr:eq(18)").hide();
    $tdAlcance.find(".table-info").hide();
    $tdAlcance.find(".control").hide();
    $("#cre0b_justificacionf2").val("");
  }

  $("input[name*='cre0b_compromisosalineados']").change(function() {
    var selectedValueCompromiso = $("input[name*='cre0b_compromisosalineados']:checked").val();

    var $tdAlcance = $("#cre0b_justificacionf2").closest("td");

    if (selectedValueCompromiso === "0") {
      //$("table.section tr:eq(18)").show();
      $tdAlcance.find(".table-info").show();
      $tdAlcance.find(".control").show();
    } else if (selectedValueCompromiso === "1") {
      //$("table.section tr:eq(18)").hide();
      $tdAlcance.find(".table-info").hide();
      $tdAlcance.find(".control").hide();
      $("#cre0b_justificacionf2").val("");
    }
  });

  // ===============================
  // 4) Ocultar filas internas
  // ===============================



    $("table.section tr:eq(1)").hide(); //Oculta estado, etapa y fecha
    //$("table.section tr:eq(7)").hide();
    //$("table.section tr:eq(9)").hide();
    //$("table.section tr:eq(10)").hide();
    $("table.section tr:eq(11)").hide();
    $("table.section tr:eq(12)").hide();
    $("table.section tr:eq(13)").hide(); 
    $("table.section tr:eq(14)").hide(); 
    $("table.section tr:eq(15)").hide();
    $("table.section tr:eq(16)").hide();
    $("table.section tr:eq(17)").hide();
    $("table.section tr:eq(18)").hide();
    $("table.section tr:eq(19)").hide();

  // ===============================
  // 5) Botón Guardar
  // ===============================
  var enviarButtonName = $("input[type='button'][value='Enviar']").attr('name');

  var guardarButton = $('<input>', {
    type: 'button',
    id: 'btnGuardar',
    value: 'Guardar',
    class: 'submit-btn btn btn-primary form-action-container-left',
    click: function() {
      guardarDatos();
    }
  });

  $('.actions').prepend(guardarButton);
  $("input#btnGuardar").first().hide();

  function guardarDatos() {

    $("#cre0b_estado").val("277010005"); // Guardado
    $("#cre0b_etapa").val("277010000");  // Nota Conceptual

    if (typeof entityFormClientValidate === 'function' && entityFormClientValidate()) {
      if (typeof Page_ClientValidate === 'function' && Page_ClientValidate('')) {
        clearIsDirty();
        disableButtons();
        $("#btnGuardar").val('Procesando...');

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

  // ===============================
  // 6) Reglas de Botones
  // ===============================
  function reglasBotones() {
    var estado = $("#cre0b_estado").val();
    var etapa  = $("#cre0b_etapa").val();

    $('.submit-btn.btn.btn-primary.form-action-container-left').hide();
    $("#UploadButton").hide();

    if (estado === "277010002" || estado === "277010005") {
      $('.submit-btn.btn.btn-primary.form-action-container-left').show();
      $("input#btnGuardar").first().hide();
      $("#UploadButton").show();
    } else if (estado === "277010003" && etapa === "277010000") {
      $('.submit-btn.btn.btn-primary.form-action-container-left').show();
      $("input#btnGuardar").first().hide();
      $("#UploadButton").show();
    }
  }

  reglasBotones();


  var intervaloEstado = null;

  function controlarEstadoEtapa() {

      var estado = $("#cre0b_estado").val();
      var etapa  = $("#cre0b_etapa").val();

      // Si está subsanado y en etapa revision tecnica
      if ((estado === "277010002" && etapa === "277010002")|| (estado === "277010002" && etapa === "277010001")) {
      $("input#btnGuardar").last().hide();
          if (intervaloEstado !== null) {
              clearInterval(intervaloEstado);
              intervaloEstado = null;
          }

      } else {
          
          if (intervaloEstado === null) {

              intervaloEstado = setInterval(function () {
                  $("#cre0b_etapa").val("277010001");
                  $("#cre0b_estado").val("277010000");
              }, 500);
          }
      }
  }

  controlarEstadoEtapa();

  // ==========================================================
  // 7) FUNCIÓN ÚNICA: Bloquear/Habilitar + EXCEPCIÓN CODIGO
  // ==========================================================
  function aplicarReglasEdicionFormulario() {

    var estado = $("#cre0b_estado").val();
    var etapa  = $("#cre0b_etapa").val();

    var etapaNotaConceptual = "277010000"; // Nota Conceptual
    var estadoSubsanado     = "277010002"; // Subsanado

    // ✅ Editable si:
    // - Etapa = Nota Conceptual (cualquier estado) O
    // - Estado = Subsanado (cualquier etapa)
    var permitirEdicion = (etapa === etapaNotaConceptual) || (estado === estadoSubsanado);

    //Bloquear si NO cumple ninguna
    var bloquear = !permitirEdicion;

    var $form = $(".entity-form, #EntityFormPanel, #EntityFormView").first();
    if (!$form.length) $form = $(document);

    // (Opcional) campos que siempre quieres dejar editables incluso cuando bloquear=true
    var allowIds = [
      // "cre0b_puntaje",
      // "cre0b_recomendacionee",
    ];

    //Campos que SIEMPRE deben quedar bloqueados (aunque permitirEdicion=true)
    var alwaysBlockedIds = [
      "cre0b_codigointerno"
    ];

    function estaPermitido(id) {
      return allowIds.indexOf(id) !== -1;
    }

    function siempreBloqueado(id) {
      return alwaysBlockedIds.indexOf(id) !== -1;
    }

    function setBloqueo($el, debeBloquear) {
      if (debeBloquear) $el.addClass("campo-bloqueado");
      else $el.removeClass("campo-bloqueado");
    }

    // ====== TEXTBOX / TEXTAREA ======
    $form.find("input[type='text'], input[type='number'], input[type='email'], input[type='tel'], textarea")
      .each(function () {
        var id = this.id || "";
        if (!id || estaPermitido(id)) return;

        var bloquearFinal = bloquear || siempreBloqueado(id);

        $(this).prop("readonly", bloquearFinal);
        setBloqueo($(this), bloquearFinal);
      });

    // ====== SELECT ======
    $form.find("select").each(function () {
      var id = this.id || "";
      if (!id || estaPermitido(id)) return;

      var bloquearFinal = bloquear || siempreBloqueado(id);

      $(this).css({ "pointer-events": bloquearFinal ? "none" : "" });
      setBloqueo($(this), bloquearFinal);
    });

    // ====== RADIO / CHECKBOX ======
    $form.find("input[type='radio'], input[type='checkbox']").each(function () {
      var id = this.id || "";
      if (id && estaPermitido(id)) return;

      // Radios/checkbox casi nunca son cre0b_codigointerno, pero queda robusto:
      var bloquearFinal = bloquear || (id && siempreBloqueado(id));

      $(this).css({ "pointer-events": bloquearFinal ? "none" : "" });
      setBloqueo($(this), bloquearFinal);
      $(this).closest("label").css({ "pointer-events": bloquearFinal ? "none" : "" });
    });

    // ====== LOOKUP ======
    $form.find(".lookup, .input-group, .entity-lookup").each(function () {
      var $inp = $(this).find("input[type='text']");
      if (!$inp.length) return;

      var id = $inp.attr("id") || "";
      if (id && estaPermitido(id)) return;

      var bloquearFinal = bloquear || (id && siempreBloqueado(id));

      $inp.prop("readonly", bloquearFinal);
      $(this).css({ "pointer-events": bloquearFinal ? "none" : "" });

      setBloqueo($inp, bloquearFinal);
      setBloqueo($(this), bloquearFinal);
    });

    // ====== CSS bloqueado ======
    if (!document.getElementById("estilo-campo-bloqueado")) {
      $("<style id='estilo-campo-bloqueado'>\
        .campo-bloqueado{\
          background:#f3f4f6 !important;\
          color:#6b7280 !important;\
          border-color:#d1d5db !important;\
        }\
      </style>").appendTo("head");
    }

    // Extra: asegurar codigointerno SIEMPRE readonly aunque algún script lo cambie
    $("#cre0b_codigointerno").prop("readonly", true).addClass("campo-bloqueado");
  }

  // Ejecutar al cargar
  aplicarReglasEdicionFormulario();

  // Si cambian etapa/estado, reaplicar
  $("#cre0b_etapa, #cre0b_estado").on("change", aplicarReglasEdicionFormulario);

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
            mensaje = "Para subvención Mediana el monto debe estar entre $100.001,00 y $500.000,00";
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

});