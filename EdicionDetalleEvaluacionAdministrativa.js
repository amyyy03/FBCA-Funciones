$(document).ready(function() {
    
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
    crearBotonLink("cre0b_linkvistapropuesta", "Detalles nota conceptual");
    //Boton de vista
    crearBotonLink("cre0b_linksharepointea", "Aquí");
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



    $("#cre0b_estadointerno").closest("td").hide();

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

 
        // Cambiar el valor del campo estado interno a "Guardado"
        $("#cre0b_estadointerno").val("277010001");


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
        "cre0b_estadointerno" // normalmente este se oculta, pero lo dejo permitido
        // "cre0b_puntaje",
        // "cre0b_recomendaciones",
    ];

    function permitido(id) {
        return allowIds.indexOf(id) !== -1;
    }

    // Inputs / textarea: readonly
    $form.find("input[type='text'], input[type='number'], input[type='email'], input[type='tel'], textarea")
        .each(function () {
        var id = this.id || "";
        if (!id || permitido(id)) return;

        $(this).prop("readonly", bloquear);
        $(this).toggleClass("campo-bloqueado", bloquear);
        });

    // Select: pointer-events none (NO disabled para evitar perder valor en postback)
    $form.find("select").each(function () {
        var id = this.id || "";
        if (!id || permitido(id)) return;

        $(this).css("pointer-events", bloquear ? "none" : "");
        $(this).toggleClass("campo-bloqueado", bloquear);
    });

    // Radio / checkbox
    $form.find("input[type='radio'], input[type='checkbox']").each(function () {
        var id = this.id || "";
        if (permitido(id)) return;

        $(this).css("pointer-events", bloquear ? "none" : "");
        $(this).toggleClass("campo-bloqueado", bloquear);
        $(this).closest("label").css("pointer-events", bloquear ? "none" : "");
    });

    // Lookup (si aplica)
    $form.find(".lookup, .input-group, .entity-lookup").each(function () {
        var $inp = $(this).find("input[type='text']");
        if (!$inp.length) return;

        var id = $inp.attr("id") || "";
        if (permitido(id)) return;

        $inp.prop("readonly", bloquear).toggleClass("campo-bloqueado", bloquear);
        $(this).css("pointer-events", bloquear ? "none" : "");
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




    // ======= FUNCIÓN de ocultar botones) =======
    function reglasBotones() {
        var estadointerno = $("#cre0b_estadointerno").val();
        var estadoea = $("#cre0b_estadoea").val();

        //estado interno es igual a enviado
        if (estadointerno === "277010000" && estadoea !== "277010002") {
            // Se ocultan los botones
            $('.submit-btn.btn.btn-primary.form-action-container-left').hide();
            $("input#btnGuardar").first().hide();
            $("#UploadButton").hide();
            //Bloquear edición
            setFormularioBloqueado(true);

        } else {
            // Caso especial: mostrar ambos botones pero ocultar el primero de Guardar
            $('.submit-btn.btn.btn-primary.form-action-container-left').show();
            $("input#btnGuardar").first().hide();
            $("#UploadButton").show();
            //Permitir edición
            setFormularioBloqueado(false);

            $("#cre0b_estadointerno").val("277010000");//setea a estado interno a enviado
        }
            // En cualquier otro caso no se muestra nada
    }

    // Ejecuta al cargar
    reglasBotones();
    
    //Actualiza el valor cada 1 segundos (1000 milisegundos)
    setInterval(function() {
        $("#cre0b_estadointerno").val("277010000");//estado interno enviado
    }, 1000); // 1000 milisegundos = 1 segundo
    

});