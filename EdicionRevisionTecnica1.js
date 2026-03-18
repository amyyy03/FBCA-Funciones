{% if user %}
  {% assign login_email = user.emailaddress1 | default: user.email | default: '' | strip %}

  {% fetchxml q_by_id %}
  <fetch top="1">
    <entity name="contact">
      <attribute name="contactid" />
      <attribute name="emailaddress1" />
      <attribute name="cre0b_grupo" />
      <filter>
        <condition attribute="contactid" operator="eq" value="{{ user.id }}" />
      </filter>
    </entity>
  </fetch>
  {% endfetchxml %}
  
  {% assign c_id = q_by_id.results.entities | first %}
  {% capture grupo_raw_id %}
    {% if c_id and c_id.cre0b_grupo %}
      {% for op in c_id.cre0b_grupo %}
        {{ op.value }}{% unless forloop.last %},{% endunless %}
      {% endfor %}
    {% endif %}
  {% endcapture %}
  {% assign grupo_raw_id = grupo_raw_id | strip | replace: ' ', '' | replace: '\n', '' | replace: '\r', '' %}

  {% assign grupo = grupo_raw_id %}
{% endif %}



$(document).ready(function() {

    //Oculto Estado Interno
    $("#cre0b_estadointernort").closest("td").hide();
        
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

    //Boton de detalles
    crearBotonLink("cre0b_linksharepointea", "Detalles nota conceptual");
    //Boton de sharepoint
    crearBotonLink("cre0b_linksharepointrt", "Aquí");
    
    // ==============================
    // OCULTAR BLOQUE DE ADJUNTOS SI NO HAY ARCHIVOS
    // ==============================

    function controlarAdjuntos() {

        var $notesControl = $("#notescontrol");
        if (!$notesControl.length) return;

        var cantidadAdjuntos = $notesControl.find(".note").length;
        var $contenedorAdjuntos = $notesControl.closest("td.notes-cell");

        //console.log("Cantidad de adjuntos detectados:", cantidadAdjuntos);

        if (cantidadAdjuntos === 0) {
            $contenedorAdjuntos.hide();
            //console.log("No hay adjuntos → bloque ocultado");
        } else {
            $contenedorAdjuntos.show();
            //console.log("Hay adjuntos → bloque visible");
        }
    }

    // ejecutar varias veces porque Power Pages carga esto después
    setTimeout(controlarAdjuntos, 800);
    setTimeout(controlarAdjuntos, 1500);
    setTimeout(controlarAdjuntos, 2500);

    // Retroalimentación 1
    var selectedValueHerramienta1 = $("input[name*='cre0b_ncheramienta1']:checked").val();

    if (selectedValueHerramienta1 === "0") {
        $("#cre0b_retroalimentacion1").closest("td").show();
    } else if (selectedValueHerramienta1 === "1") {
        $("#cre0b_retroalimentacion1").closest("td").hide();
        $("#cre0b_retroalimentacion1").val("");
    }

    $("input[name*='cre0b_ncheramienta1']").change(function() {
        var selectedValueHerramienta1 = $("input[name*='cre0b_ncheramienta1']:checked").val();

        if (selectedValueHerramienta1 === "0") {
            $("#cre0b_retroalimentacion1").closest("td").show();
        } else if (selectedValueHerramienta1 === "1") {
            $("#cre0b_retroalimentacion1").closest("td").hide();
            $("#cre0b_retroalimentacion1").val("");
        }
    });


    // Retroalimentación 2
    var selectedValueLibreHerramienta1 = $("input[name*='cre0b_libresherramienta1']:checked").val();

    if (selectedValueLibreHerramienta1 === "0") {
        $("#cre0b_retroalimentacion2").closest("td").show();
    } else if (selectedValueLibreHerramienta1 === "1") {
        $("#cre0b_retroalimentacion2").closest("td").hide();
        $("#cre0b_retroalimentacion2").val("");
    }

    $("input[name*='cre0b_libresherramienta1']").change(function() {
        var selectedValueLibreHerramienta1 = $("input[name*='cre0b_libresherramienta1']:checked").val();

        if (selectedValueLibreHerramienta1 === "0") {
            $("#cre0b_retroalimentacion2").closest("td").show();
        } else if (selectedValueLibreHerramienta1 === "1") {
            $("#cre0b_retroalimentacion2").closest("td").hide();
            $("#cre0b_retroalimentacion2").val("");
        }
    });


    // Retroalimentación 3
    var selectedValueInconsistencia = $("input[name*='cre0b_inconsistencia']:checked").val();

    if (selectedValueInconsistencia === "1") {
        $("#cre0b_retroalimentacion3").closest("td").show();
    } else if (selectedValueInconsistencia === "0") {
        $("#cre0b_retroalimentacion3").closest("td").hide();
        $("#cre0b_retroalimentacion3").val("");
    }

    $("input[name*='cre0b_inconsistencia']").change(function() {
        var selectedValueInconsistencia = $("input[name*='cre0b_inconsistencia']:checked").val();

        if (selectedValueInconsistencia === "1") {
            $("#cre0b_retroalimentacion3").closest("td").show();
        } else if (selectedValueInconsistencia === "0") {
            $("#cre0b_retroalimentacion3").closest("td").hide();
            $("#cre0b_retroalimentacion3").val("");
        }
    });


    // Retroalimentación 4
    var selectedValueVerificacion30 = $("input[name*='cre0b_verificacion30']:checked").val();

    if (selectedValueVerificacion30 === "0") {
        $("#cre0b_retroalimentacion4").closest("td").show();
    } else if (selectedValueVerificacion30 === "1") {
        $("#cre0b_retroalimentacion4").closest("td").hide();
        $("#cre0b_retroalimentacion4").val("");
    }

    $("input[name*='cre0b_verificacion30']").change(function() {
        var selectedValueVerificacion30 = $("input[name*='cre0b_verificacion30']:checked").val();

        if (selectedValueVerificacion30 === "0") {
            $("#cre0b_retroalimentacion4").closest("td").show();
        } else if (selectedValueVerificacion30 === "1") {
            $("#cre0b_retroalimentacion4").closest("td").hide();
            $("#cre0b_retroalimentacion4").val("");
        }
    });


    // Retroalimentación 5

    var selectedValueVerificacion15 = $("input[name*='cre0b_verificacion15']:checked").val();
    
    if (selectedValueVerificacion15 === "0") {
        // Mostrar el campo de Justificación si es No
        $("#cre0b_retroalimentacion5").closest("td").show();
        //alert("Esta seleccionado no");
    } else if (selectedValueVerificacion15 === "1") {
        // Ocultar el campo de Justificación si es Sí
        $("#cre0b_retroalimentacion5").closest("td").hide();
        //alert("Esta seleccionado si");
        $("#cre0b_retroalimentacion5").val("");
    }

        // Detecta el cambio en la selección de las opciones "Sí" o "No" para el campo de "Alcance"
    $("input[name*='cre0b_verificacion15']").change(function() {
        var selectedValueVerificacion15 = $("input[name*='cre0b_verificacion15']:checked").val();

        if (selectedValueVerificacion15 === "0") {
            // Mostrar el campo de Justificación si es No
            $("#cre0b_retroalimentacion5").closest("td").show();
        } else if (selectedValueVerificacion15 === "1") {
            // Ocultar el campo de Justificación si es Sí
            $("#cre0b_retroalimentacion5").closest("td").hide();
            $("#cre0b_retroalimentacion5").val("");

        }
    });



    var enviarButtonName = $("input[type='button'][value='Enviar']").attr('name');

    // Crear el botón de "Guardar" dinámicamente dentro del formulario
    var guardarButton = $('<input>', {
        type: 'button',
        id: 'btnGuardar',
        value: 'Guardar',
        class: 'submit-btn btn btn-primary form-action-container-left',
        click: function() {
            guardarDatos();
        }
    });

    // Insertamos el botón al final del formulario
    $('.actions').prepend(guardarButton);
    $("input#btnGuardar").first().hide();

    // Función para guardar los datos
    function guardarDatos() {

        //limpiarJustificacionesSiAplica();
        // Cambiar el valor del campo estado interno a "Guardado"
        $("#cre0b_estadointernort").val("277010001");


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


    function setFormularioBloqueado(bloquear) {

    var $form = $(".entity-form, #EntityFormPanel, #EntityFormView").first();
    if (!$form.length) $form = $(document);

    // Si hay campos que NO quieres bloquear, pon sus IDs aquí
    var allowIds = [
        "cre0b_estadointernort" // normalmente este se oculta, pero lo dejo permitido
        // "cre0b_puntaje",
        // "cre0b_recomendaciones",
    ];

    //Campos que SIEMPRE deben quedar bloqueados (aunque permitirEdicion=true)
    var alwaysBlockedIds = [
      "new_id"
    ];

    function permitido(id) {
        return allowIds.indexOf(id) !== -1;
    }

    function siempreBloqueado(id) {
      return alwaysBlockedIds.indexOf(id) !== -1;
    }

    // Inputs / textarea: readonly
    $form.find("input[type='text'], input[type='number'], input[type='email'], input[type='tel'], textarea")
        .each(function () {
        var id = this.id || "";
        if (!id || permitido(id)) return;

        var bloquearFinal = bloquear || siempreBloqueado(id);

        $(this).prop("readonly", bloquearFinal);
        $(this).toggleClass("campo-bloqueado", bloquearFinal);
        });

    // Select: pointer-events none (NO disabled para evitar perder valor en postback)
    $form.find("select").each(function () {
        var id = this.id || "";
        if (!id || permitido(id)) return;

        var bloquearFinal = bloquear || siempreBloqueado(id);

        $(this).css("pointer-events", bloquearFinal ? "none" : "");
        $(this).toggleClass("campo-bloqueado", bloquearFinal);
    });

    // Radio / checkbox
    $form.find("input[type='radio'], input[type='checkbox']").each(function () {
        var id = this.id || "";
        if (permitido(id)) return;

        var bloquearFinal = bloquear || (id && siempreBloqueado(id));

        $(this).css("pointer-events", bloquearFinal ? "none" : "");
        $(this).toggleClass("campo-bloqueado", bloquearFinal);

        $("label[for='" + id + "']").css("pointer-events", bloquearFinal ? "none" : "");
    });

    // Lookup (si aplica)
    $form.find(".lookup, .input-group, .entity-lookup").each(function () {
        var $inp = $(this).find("input[type='text']");
        if (!$inp.length) return;

        var id = $inp.attr("id") || "";
        if (permitido(id)) return;

        var bloquearFinal = bloquear || (id && siempreBloqueado(id));

        $inp.prop("readonly", bloquearFinal).toggleClass("campo-bloqueado", bloquearFinal);
        $(this).css("pointer-events", bloquearFinal ? "none" : "");
    });

    // Estilo visual
    if (!document.getElementById("estilo-campo-bloqueado")) {
        $("<style id='estilo-campo-bloqueado'>\
        .campo-bloqueado{\
            background:#f3f4f6 !important;\
            color:#6b7280 !important;\
            border-color:#d1d5db !important;\
        }\
        </style>").appendTo("head");
    }
    }

    function bloquearSoloMensaje(bloquear) {
        var $radios = $("#cre0b_mensaje_0, #cre0b_mensaje_1");

        $radios.css("pointer-events", bloquear ? "none" : "");
        $radios.toggleClass("campo-bloqueado", bloquear);

        $radios.closest("td").toggleClass("grupo-bloqueado", bloquear);
        $radios.closest(".control").toggleClass("grupo-bloqueado", bloquear);

        $("label[for='cre0b_mensaje_0'], label[for='cre0b_mensaje_1']")
            .toggleClass("grupo-bloqueado", bloquear)
            .css("pointer-events", bloquear ? "none" : "");
    }

    function mostrarTextoMensajeFinanciero() {
        var selectedValueMensaje = $("input[name*='cre0b_mensaje']:checked").val();
        var textoMensaje = "";

        if (selectedValueMensaje === "0") {
            textoMensaje = "Estado financiero: Financiero no completado<br><span style='display:block; margin-top:6px; color:#dc3545; font-size:13px; font-weight:600;'>Es necesario estado financiero completo para enviar.</span>";
        } else if (selectedValueMensaje === "1") {
            textoMensaje = "Estado financiero completado";
        } else {
            textoMensaje = "Estado financiero: Sin respuesta";
        }

        // Ocultar el campo original
        $("#cre0b_mensaje").closest("td").hide();

        // Si no existe el contenedor, crearlo
        if ($("#mensajeFinancieroTexto").length === 0) {
            $("<div id='mensajeFinancieroTexto' style='margin:10px 0; padding:10px 12px; background:#f8f9fa; border:1px solid #d1d5db; border-radius:6px; font-weight:600; color:#374151;'></div>")
                .insertAfter($("#cre0b_experto").closest(".control"));
        }

        $("#mensajeFinancieroTexto").html(textoMensaje).show();
    }
    
    // ======= FUNCIÓN de ocultar botones) =======
    function reglasBotonesRT() {
        var estadointernort = $("#cre0b_estadointernort").val();
        var estadort = $("#cre0b_estadort").val();


        //estado interno es igual a enviado y es estadort es diferente a subsanado
        if (estadointernort === "277010000" && estadort !== "277010002") {
            // se oculta
            $('.submit-btn.btn.btn-primary.form-action-container-left').hide();
            $("input#btnGuardar").first().hide();
            $("#UploadButton").hide();

            //Bloquear edición
            setFormularioBloqueado(true);

        } else {
            // Caso especial: mostrar ambos y setear el valor interno a enviado
            $('.submit-btn.btn.btn-primary.form-action-container-left').show();
            $("input#btnGuardar").first().hide();
            $("#UploadButton").show();
            //Permitir edición
            setFormularioBloqueado(false);
            $("#cre0b_estadointernort").val("277010000");//setea a estado interno a enviado
        }
            // En cualquier otro caso no se muestra nada
    }

    // Ejecuta al cargar
    reglasBotonesRT();

    //Funcion para bloquear funciones
    function bloquearFieldset($fieldset, bloquear) {
        $fieldset.find("input[type='text'], input[type='number'], input[type='email'], input[type='tel'], textarea")
            .prop("readonly", bloquear)
            .toggleClass("campo-bloqueado", bloquear);

        $fieldset.find("select").css("pointer-events", bloquear ? "none" : "")
            .toggleClass("campo-bloqueado", bloquear);

        $fieldset.find("input[type='radio'], input[type='checkbox']").css("pointer-events", bloquear ? "none" : "")
            .toggleClass("campo-bloqueado", bloquear);

        $fieldset.find("label").css("pointer-events", bloquear ? "none" : "");

        if (bloquear) {
            $fieldset.addClass("fieldset-bloqueado");
        } else {
            $fieldset.removeClass("fieldset-bloqueado");
        }
    }

        if (!document.getElementById("fieldset-lock-style")) {
        $("<style id='fieldset-lock-style'>\
        .fieldset-bloqueado{\
            position:relative;\
        }\
        .fieldset-bloqueado::after{\
            content:'';\
            position:absolute;\
            inset:0;\
            background:rgba(200,200,200,0.35);\
            backdrop-filter:blur(0px);\
            border-radius:4px;\
            pointer-events:none;\
        }\
        </style>").appendTo("head");
    }

    $("#cre0b_ambito").closest("td").hide();
    // ======================================
    // DEBUG REAL: LEER ÁMBITOS DEL LOOKUP
    // ======================================

    $(document).on("click", "button.launchentitylookup", function () {

        //console.log("Click lupa detectado...");

        setTimeout(function () {

            //console.log("=== DEBUG ÁMBITOS EN LOOKUP ===");

            var ambitoRegistro = $("#cre0b_ambito").val();
            //console.log("Ámbito del registro (valor):", ambitoRegistro);

            // Buscar directamente el modal lookup visible
            var modal = $("section.modal-lookup.show");

            if (!modal.length) {
                console.warn("No encontré modal lookup visible.");
                return;
            }

            // Buscar filas dentro de la tabla
            var filas = modal.find("table.table-hover tbody tr");

            if (!filas.length) {
                console.warn("No encontré filas aún.");
                return;
            }

            var ambitosEncontrados = [];

            filas.each(function () {

                var ambitoTexto = $(this)
                    .find("td[data-attribute='cre0b_ambito']")
                    .text()
                    .trim();

                ambitosEncontrados.push(ambitoTexto);
            });

            //console.log("Ámbitos encontrados:", ambitosEncontrados);

        }, 1200); // esperamos que cargue
    });

    (function () {

    function getAmbitoValor() {
        return $("#cre0b_ambito").val();
    }

    function ambitoEtiqueta(valor) {
        const map = {
        "277010000": "Conservación",
        "277010001": "Restauración",
        "277010002": "Gestión de cuencas hidrográficas",
        "277010003": "Bioeconomía",
        "277010004": "Finanzas sostenibles"
        };
        return map[String(valor)] || "";
    }

    function aplicarAmbitoYBuscar() {
        const valor = getAmbitoValor();
        const etiqueta = ambitoEtiqueta(valor);
        if (!etiqueta) return;

        const $modal = $("section.modal-lookup.show");
        if (!$modal.length) return;

        const $input = $modal.find("input.query.form-control").first();
        if (!$input.length) return;

        // 1) rellena y bloquea
        $input.val(etiqueta)
        .prop("readonly", true)
        .attr("title", "Filtro fijo por ámbito: " + etiqueta);
        $modal.find('button[aria-label="Resultados de la búsqueda"]').hide();
        $modal.find('.entitylist-search').hide();

        // 2) dispara la búsqueda (botón del modal, NO el del campo lookup)
        const $btnBuscar = $modal.find('button[aria-label="Resultados de la búsqueda"]').first();
        if ($btnBuscar.length) {
        // evita doble click si por algo se llama dos veces
        if ($modal.data("ambito-search-fired")) return;
        $modal.data("ambito-search-fired", true);

        // pequeño delay para que el valor ya quede aplicado antes del click
        setTimeout(function () {
            $btnBuscar.trigger("click");
            //console.log("Búsqueda disparada automáticamente con:", etiqueta);
        }, 50);
        }
    }

    // Cuando abres el lookup (botón launchentitylookup)
    $(document).on("click", "button.launchentitylookup", function () {

        const timer = setInterval(function () {
        if ($("section.modal-lookup.show").length) {
            clearInterval(timer);

            // resetea el flag cada vez que se abre
            $("section.modal-lookup.show").removeData("ambito-search-fired");

            aplicarAmbitoYBuscar();
        }
        }, 80);

        setTimeout(function () { clearInterval(timer); }, 5000);
    });

    })();


    // ======= FUNCIÓN para mostrar overlay de carga en lookups con paginación =======

    (function () {

    if (!document.getElementById("lookup-loading-style")) {

        const style = document.createElement("style");
        style.id = "lookup-loading-style";

        style.innerHTML = `
        .lookup-loading-overlay {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            backdrop-filter: blur(2px);
        }

        .lookup-loading-box {
            background: #005175;
            color: white;
            padding: 12px 22px;
            border-radius: 8px;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        `;

        document.head.appendChild(style);
    }

    })();


    (function () {

    function mostrarOverlay($modal) {

        if ($modal.find(".lookup-loading-overlay").length) return;

        const overlay = `
        <div class="lookup-loading-overlay">
            <div class="lookup-loading-box">
            Cargando...
            </div>
        </div>
        `;

        $modal.find(".modal-body").css("position", "relative")
        .append(overlay);
    }

    function ocultarOverlay($modal) {
        $modal.find(".lookup-loading-overlay").fadeOut(150, function () {
        $(this).remove();
        });
    }

    // Cuando cambia paginación o búsqueda
    $(document).on("click", ".view-pagination a, button.btn-default", function () {

        const $modal = $("section.modal-lookup.show");
        if (!$modal.length) return;

        mostrarOverlay($modal);

        // Esperamos a que la tabla cambie
        const observer = new MutationObserver(function () {
        ocultarOverlay($modal);
        observer.disconnect();
        });

        const tabla = $modal.find(".view-grid").get(0);
        if (tabla) {
        observer.observe(tabla, { childList: true, subtree: true });
        }
    });

    })();

    //Actualiza el valor cada 1 segundos (1000 milisegundos)
    setInterval(function() {
        $("#cre0b_estadointernort").val("277010000");//estado interno enviado
    }, 1000); // 1000 milisegundos = 1 segundo


    //Control del grupo financiero



    var userGrupo = "{{ grupo }}"; // Este es el valor pasado desde Liquid en la plantilla
    //console.log("Valor de userGrupo:", userGrupo);
    // Verifica si el grupo de "Financiero" (277010006) está incluido en el valor de userGrupo
    if (userGrupo.includes("277010006")) {

        bloquearFieldset($('fieldset[aria-label="General"]'), true);
        bloquearFieldset($('fieldset[aria-label="Sección Financiera"]'), false);
        bloquearSoloMensaje(false);
        // Ocultar el botón con id "UpdateButton"
        $('#UpdateButton').hide();
    } else {
        bloquearFieldset($('fieldset[aria-label="General"]'), false);
        bloquearFieldset($('fieldset[aria-label="Sección Financiera"]'), true);
        bloquearSoloMensaje(true);
        mostrarTextoMensajeFinanciero();

    
            // ==============================
    // MENSAJE FINANCIERO
    // ==============================

    var selectedValueMensaje = $("input[name*='cre0b_mensaje']:checked").val();

    if (selectedValueMensaje === "0") {

        //console.log("Mensaje seleccionado: Financiero NO completado");
        $('#UpdateButton').hide();

    } else if (selectedValueMensaje === "1") {

        //console.log("Mensaje seleccionado: Financiero COMPLETADO");

    }

    // Detectar cambio
    $("input[name*='cre0b_mensaje']").change(function() {

        var selectedValueMensaje = $("input[name*='cre0b_mensaje']:checked").val();

        if (selectedValueMensaje === "0") {

            //console.log("Cambio detectado → Financiero NO completado");
            $('#UpdateButton').hide();

        } else if (selectedValueMensaje === "1") {

            //console.log("Cambio detectado → Financiero COMPLETADO");

        }

    });
       

        // ==============================
        // VALIDAR LOOKUP Y COMPROMISOS
        // ==============================

        var $btnEnviar = $("#UpdateButton, input[type='submit'][value='Enviar']").first();

        // Crear mensaje si no existe
        if ($("#btnErrorMsg").length === 0) {
            $("<span id='btnErrorMsg' style='display:none; margin-left:15px; color:#dc3545; font-weight:600; font-size:13px;'></span>")
                .insertAfter($btnEnviar);
        }

        function revisarLookup() {

            var valorLookup = $("#cre0b_experto").val();

            if (valorLookup && valorLookup.trim() !== "") {
                //console.log("El lookup SÍ está lleno. Valor:", valorLookup);
                return true;
            } else {
                //console.log("El lookup está VACÍO.");
                return false;
            }
        }

        function revisarCompromisos() {

            var cantidad = $("#cre0b_compromisosconservacion_Container")
                .find("li[id^='cre0b_compromisosconservacion-selected-item-'], .msos-selected-item")
                .length;

            if (cantidad > 0) {
                //console.log("El campo de compromisos SÍ tiene valor. Cantidad:", cantidad);
                return true;
            } else {
                //console.log("El campo de compromisos está VACÍO.");
                return false;
            }
        }
    

        function actualizarEstadoBotones() {

            var lookupLleno = revisarLookup();
            var compromisosLlenos = revisarCompromisos();

            if (!lookupLleno && !compromisosLlenos) {
                $btnEnviar.prop("disabled", true);

                $("#btnErrorMsg")
                    .text("Para enviar, debe seleccionar un experto y al menos un compromiso.")
                    .show();

            } else if (!lookupLleno) {
                $btnEnviar.prop("disabled", true);

                $("#btnErrorMsg")
                    .text("Para enviar, debe seleccionar un experto.")
                    .show();

            } else if (!compromisosLlenos) {
                $btnEnviar.prop("disabled", true);

                $("#btnErrorMsg")
                    .text("Para enviar, debe seleccionar al menos un compromiso.")
                    .show();

            } else {
                $btnEnviar.prop("disabled", false);

                $("#btnErrorMsg").hide();
            }
        }

        // Revisar al cargar
        actualizarEstadoBotones();

        // Cuando cambie el lookup
        $("#cre0b_experto").on("change", function () {
            actualizarEstadoBotones();
        });

        // Observer compromisos
        var contenedorCompromisos = document.getElementById("cre0b_compromisosconservacion_Container");

        if (contenedorCompromisos) {
            var observerCompromisos = new MutationObserver(function () {
                setTimeout(function () {
                    actualizarEstadoBotones();
                }, 100);
            });

            observerCompromisos.observe(contenedorCompromisos, {
                childList: true,
                subtree: true,
                attributes: true
            });
        }

        // Clic en la X de quitar selección
        $(document).on("click", "#cre0b_compromisosconservacion_Container *", function () {
            var $target = $(this);

            if (
                $target.closest("li[id^='cre0b_compromisosconservacion-selected-item-']").length ||
                $target.closest(".msos-selected-item").length
            ) {
                setTimeout(function () {
                    actualizarEstadoBotones();
                }, 150);
            }
        });

    }


});