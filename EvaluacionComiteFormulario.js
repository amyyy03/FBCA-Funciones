$(document).ready(function() {

    // ======= CONTROL DE TAMAÑO DE TEXTO =======
    if (!document.getElementById("estilo-tamano-textos")) {
        $("<style id='estilo-tamano-textos'>\
            .entity-form h3{\
                font-size:16px !important;\
                margin-bottom:10px !important;\
            }\
            .entity-form .field-label{\
                font-size:14px !important;\
                line-height:1.4 !important;\
            }\
        </style>").appendTo("head");
    }

    $("#cre0b_estadoec").closest("td").hide();
    $("#new_name").closest("td").hide();
    
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
    crearBotonLink("cre0b_linkvistadetalleec", "Detalles nota conceptual");
    
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

    // Función para guardar los datos
    function guardarDatos() {

        // Cambiar el valor del campo estado interno a "Guardado"
        $("#cre0b_estadoec").val("277010001");

        calcularPuntajeEE();

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



    // Crear el botón de "Abstenerse" dinámicamente dentro del formulario
    var abstenerseButton = $('<input>', {
        type: 'button',
        id: 'btnAbstenerse',
        value: 'Abstenerse',
        class: 'submit-btn btn btn-warning form-action-container-left',
        click: function() {
            abstenerseDatos();
        }
    });

    // Insertamos el botón al final del formulario
    $('.actions').prepend(abstenerseButton);



    // Función para guardar los datos
    function abstenerseDatos() {

        // Cambiar el valor del campo estado interno a "Guardado"
        $("#cre0b_estadoec").val("277010002");

                // Rellenar los campos con 0
        $("input.integer.form-control").each(function() {
            $(this).val(0);
        });

        calcularPuntajeEE();

        // Validación de cliente antes de enviar el formulario
        if (typeof entityFormClientValidate === 'function' && entityFormClientValidate()) {
            if (typeof Page_ClientValidate === 'function' && Page_ClientValidate('')) {
                clearIsDirty();
                disableButtons();
                $("#btnAbstenerse").val('Procesando...'); // Cambia el texto del botón mientras se procesa
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


    // Función para bloquear los campos del formulario
    function setFormularioBloqueado(bloquear) {

    var $form = $(".entity-form, #EntityFormPanel, #EntityFormView").first();
    if (!$form.length) $form = $(document);

    // Si hay campos que NO quieres bloquear, pon sus IDs aquí
    var allowIds = [
        "cre0b_estadoec" // normalmente este se oculta, pero lo dejo permitido
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
    function reglasBotonesEE() {
        var estadoec = $("#cre0b_estadoec").val();
        
        //estado interno es igual a enviado o abstenido
        if (estadoec === "277010000" || estadoec === "277010002") {
            // se oculta
            $('.submit-btn.btn.btn-primary.form-action-container-left').hide();
            $('#btnAbstenerse').hide();
            //Bloquear edición
            setFormularioBloqueado(true);

        } else {
            // Caso especial: mostrar ambos y setear el valor interno a enviado
            $('.submit-btn.btn.btn-primary.form-action-container-left').show();
            $('#btnAbstenerse').show();
            //Permitir edición
            setFormularioBloqueado(false);
            $("#cre0b_estadoec").val("277010002");//setea a estado interno a enviado
        }
            // En cualquier otro caso no se muestra nada
    }

    // Ejecuta al cargar
    reglasBotonesEE();


    // ======= CONTROL SOLO NUMEROS 0-5 =======
    function configurarCamposNumericos() {

        // Selecciona todos los inputs tipo integer del formulario
        $("input.integer.form-control").each(function () {

            // Limita a 1 caracter
            $(this).attr("maxlength", "1");

            // Hace el campo pequeño visualmente
            $(this).css({
                "width": "60px",
                "text-align": "center"
            });

            // Solo permitir números del 0 al 5
            $(this).on("input", function () {
                var valor = $(this).val();

                // Elimina todo lo que no sea número
                valor = valor.replace(/[^0-9]/g, '');

                // Si es mayor a 5 lo vacía
                if (valor > 5) {
                    valor = '';
                }

                $(this).val(valor);

                calcularPuntajeEE();
            });

        });
    }

    // Ejecutar al cargar
    configurarCamposNumericos();


    // ======= ALINEAR TODAS LAS RESPUESTAS EN UNA MISMA COLUMNA =======
    function ponerRespuestasALaDerecha() {

        if (!document.getElementById("rt-inline-style")) {
            $("<style id='rt-inline-style'>\
                td.rt-inline {\
                    position:relative !important;\
                    padding-right:120px !important; \
                }\
                td.rt-inline .control {\
                    position:absolute !important;\
                    right:20px !important;\
                    top:50% !important;\
                    transform:translateY(-50%) !important;\
                }\
                td.rt-inline input.integer {\
                    width:60px !important;\
                    height:40.5px !important;\
                    font-size:16px !important;\
                    text-align:center !important;\
                }\
            </style>").appendTo("head");
        }

        $("input.integer.form-control").each(function () {
            var $td = $(this).closest("td");
            $td.addClass("rt-inline");
        });
    }

    ponerRespuestasALaDerecha();


    // ======= AYUDA CONTEXTUAL ⓘ POR CRITERIO =======
    function agregarAyudasCriterios() {

        var ayudas = {
            "cre0b_claridadobjetivoscomite": {
                contenido: [
                    "1 (Muy bajo): No se entiende qué busca lograr; no hay alineación.",
                    "2 (Bajo): Objetivos/resultados parciales; alineación muy débil.",
                    "3 (Medio): Objetivos/resultados comprensibles; alineación débil.",
                    "4 (Alto): Objetivos/resultados claros y coherentes; alineación sólida.",
                    "5 (Muy alto): Objetivos/resultados muy claros y enfocados; alineación muy sólida."
                ]
            },
            "cre0b_gradointegracioncomite": {
                contenido: [
                    "1 (Muy bajo): No integra enfoques.",
                    "2 (Bajo): Los menciona sin aplicación.",
                    "3 (Medio): Integra parcialmente (medidas generales).",
                    "4 (Alto): Integra con acciones concretas por fase/actividad.",
                    "5 (Muy alto): Integración robusta: acciones + roles + participación pertinente + evidencias/indicadores."
                ]
            },
            "cre0b_alcanzabilidadcomite": {
                contenido: [
                    "1 (Muy bajo): Inalcanzable por escala/tiempo/capacidades.",
                    "2 (Bajo): Alta duda; supuestos críticos sin tratar.",
                    "3 (Medio): Alcanzable con algunos vacíos.",
                    "4 (Alto): Alcanzable y bien sustentado.",
                    "5 (Muy alto): Muy alcanzable: supuestos claros + riesgos clave considerados + consistencia total."
                ]
            },
            "cre0b_aportevinculantecomite": {
                contenido: [
                    "1 (Muy bajo): No se evidencia aporte.",
                    "2 (Bajo): Aporte declarado sin conexión.",
                    "3 (Medio): Aporte con poca conexión.",
                    "4 (Alto): Aporte claro y específico (qué compromiso y cómo).",
                    "5 (Muy alto): Aporte directo y trazable: magnitud, territorio y contribución claramente definida."
                ]
            },
            "cre0b_aportenovinculantecomite": {
                contenido: [
                    "1 (Muy bajo): No se evidencia aporte.",
                    "2 (Bajo): Aporte declarado sin conexión.",
                    "3 (Medio): Aporte con poca conexión.",
                    "4 (Alto): Aporte claro y específico (qué compromiso y cómo).",
                    "5 (Muy alto): Aporte directo y trazable: magnitud, territorio y contribución claramente definida."
                ]
            },
            "cre0b_indicadoresrelevantescomite": {
                contenido: [
                    "1 (Muy bajo): No hay indicadores.",
                    "2 (Bajo): Cumple con al menos dos criterios SMART.",
                    "3 (Medio): Cumple con al menos cuatro criterios SMART.",
                    "4 (Alto): Cumple con todos los criterios SMART, no están alineados a objetivos y resultados.",
                    "5 (Muy alto): Cumple con todos los criterios SMART, sí están alineados a objetivos y resultados."
                ]
            },
            "cre0b_coherenciacomite": {
                contenido: [
                    "1 (Muy bajo): No hay medios de verificación.",
                    "2 (Bajo): Medios de verificación sin coherencia.",
                    "3 (Medio): Medios de verificación con coherencia, sin alineación a indicadores.",
                    "4 (Alto): Medios de verificación con coherencia y alineación no pertinente a indicadores.",
                    "5 (Muy alto): Medios de verificación con coherencia y alineación pertinente a indicadores."
                ]
            },
            "cre0b_claridadproblematicacomite": {
                contenido: [
                    "1 (Muy bajo): No enuncia problema.",
                    "2 (Bajo): Problema muy genérico.",
                    "3 (Medio): Problema descrito sin datos/causas claras.",
                    "4 (Alto): Problema claro; evidencia limitada.",
                    "5 (Muy alto): Problema claro y bien sustentado (causas/efectos/contexto)."
                ]
            },
            "cre0b_coherenciasolucioncomite": {
                contenido: [
                    "1 (Muy bajo): No existe respuesta.",
                    "2 (Bajo): Respuesta parcial, sin conexión al problema.",
                    "3 (Medio): Respuesta parcial, poca conexión al problema.",
                    "4 (Alto): Respuesta clara con lógica consistente.",
                    "5 (Muy alto): Respuesta óptima: lógica problema-solución muy bien justificada y contextualizada."
                ]
            },
            "cre0b_adecuacionmetodologiacomite": {
                contenido: [
                    "1 (Muy bajo): Metodología inapropiada o inexistente.",
                    "2 (Bajo): Metodología general; no demuestra cómo logrará resultados.",
                    "3 (Medio): Metodología clara, con vacíos relevantes.",
                    "4 (Alto): Metodología clara, adecuada y aplicable al contexto.",
                    "5 (Muy alto): Metodología robusta: herramientas + enfoques + consideraciones contextuales + seguimiento integrado."
                ]
            },
            "cre0b_nivelactividadescomite": {
                contenido: [
                    "1 (Muy bajo): No describe actividades.",
                    "2 (Bajo): Actividades incompletas o poco pertinentes.",
                    "3 (Medio): Actividades desconectadas de resultados.",
                    "4 (Alto): Actividades claramente alineadas y suficientes para resultados.",
                    "5 (Muy alto): Actividades muy bien estructuradas (secuencia lógica + responsables + tiempo)."
                ]
            },
            "cre0b_trayectoriaorganizacioncomite": {
                contenido: [
                    "1 (Muy bajo): Sin trayectoria relevante o no documentada.",
                    "2 (Bajo): Trayectoria mínima; evidencia insuficiente.",
                    "3 (Medio): Trayectoria adecuada; evidencia parcial.",
                    "4 (Alto): Trayectoria sólida y demostrable (experiencias relevantes).",
                    "5 (Muy alto): Trayectoria altamente relevante; evidencia verificable y resultados previos claros."
                ]
            },
            "cre0b_capacidadadministrativacomite": {
                contenido: [
                    "1 (Muy bajo): No demuestra capacidad.",
                    "2 (Bajo): Capacidad débil; procesos no descritos.",
                    "3 (Medio): Capacidad aceptable; faltan elementos (controles/gestión).",
                    "4 (Alto): Capacidad clara: estructura, roles y controles básicos evidenciados.",
                    "5 (Muy alto): Capacidad robusta: controles/experiencia en fondos + claridad de gestión financiera."
                ]
            },
            "cre0b_formacionacademicacomite": {
                contenido: [
                    "1 (Muy bajo): 100% del equipo no cumple con requisitos.",
                    "2 (Bajo): Menos del 50% del equipo no cumple con requisitos.",
                    "3 (Medio): 50% del equipo cumple con requisitos.",
                    "4 (Alto): Más del 50% del equipo no cumple con requisitos.",
                    "5 (Muy alto): 100% del equipo cumple con requisitos."
                ]
            },
            "cre0b_experienciazonacomite": {
                contenido: [
                    "1 (Muy bajo): 100% del equipo no cumple con requisitos.",
                    "2 (Bajo): Menos del 50% del equipo no cumple con requisitos.",
                    "3 (Medio): 50% del equipo cumple con requisitos.",
                    "4 (Alto): Más del 50% del equipo no cumple con requisitos.",
                    "5 (Muy alto): 100% del equipo cumple con requisitos."
                ]
            },
            "cre0b_experienciaproyectocomite": {
                contenido: [
                    "1 (Muy bajo): 100% del equipo no cumple con requisitos.",
                    "2 (Bajo): Menos del 50% del equipo no cumple con requisitos.",
                    "3 (Medio): 50% del equipo cumple con requisitos.",
                    "4 (Alto): Más del 50% del equipo no cumple con requisitos.",
                    "5 (Muy alto): 100% del equipo cumple con requisitos."
                ]
            },
            "cre0b_consistenciah1comite": {
                contenido: [
                    "1 (Muy bajo): No presenta verificación o incluye actividades excluidas.",
                    "2 (Bajo): Verificación incompleta; dudas sobre exclusiones.",
                    "3 (Medio): Verificación hecha; falta sustento o coherencia con actividades.",
                    "4 (Alto): Verificación completa y consistente; sin actividades excluidas.",
                    "5 (Muy alto): Verificación completa, muy consistente con el diseño; evidencia clara de no exclusión."
                ]
            },
            "cre0b_garantizasostenibilidadcomite": {
                contenido: [
                    "1 (Muy bajo): No aborda sostenibilidad.",
                    "2 (Bajo): Declarativa sin mecanismos.",
                    "3 (Medio): Mecanismos mencionados; viabilidad parcial.",
                    "4 (Alto): Plan razonable y viable de continuidad.",
                    "5 (Muy alto): Plan sólido: continuidad técnica/financiera/institucional + roles/recursos definidos."
                ]
            },
            "cre0b_verificacioncofinanciamientocomite": {
                contenido: [
                    "1 (Muy bajo): No existe o no es verificable.",
                    "2 (Bajo): Origen/monto poco claro.",
                    "3 (Medio): Claro en general; evidencia parcial.",
                    "4 (Alto): Claro y con respaldo razonable.",
                    "5 (Muy alto): Claramente documentado y verificable (montos, origen, aportes en especie valorizados)."
                ]
            },
            "cre0b_sustentoreplicabilidadcomite": {
                contenido: [
                    "1 (Muy bajo): No se menciona o es irrelevante.",
                    "2 (Bajo): Idea general sin condiciones.",
                    "3 (Medio): Replicabilidad real; faltan condiciones/limitantes.",
                    "4 (Alto): Explica cómo se replicaría/escalaría y qué se requiere.",
                    "5 (Muy alto): Sustento sólido: condiciones, actores, costos aproximados y estrategia de difusión/transferencia."
                ]
            },
            "cre0b_presupuestoresultadoscomite": {
                contenido: [
                    "1 (Muy bajo): Presupuesto incongruente (costos fuera de rango o sin relación con actividades).",
                    "2 (Bajo): Coherencia parcial (varios rubros sin justificación).",
                    "3 (Medio): Coherente en general (algunos costos dudosos o sin detalle).",
                    "4 (Alto): Coherente y justificado (costos razonables vs mercado y resultados).",
                    "5 (Muy alto): Muy eficiente y realista: costos de mercado claros + alta relación costo-resultado + supuestos transparentes."
                ]
            }
        };


        // ======= ESTILO =======
        if (!document.getElementById("ayuda-criterios-style")) {
            $("<style id='ayuda-criterios-style'>\
                .criterio-help-icon{\
                    display:inline-flex !important;\
                    align-items:center !important;\
                    justify-content:center !important;\
                    width:20px !important;\
                    height:20px !important;\
                    margin-left:6px !important;\
                    background:transparent !important;\
                    color:#6b7280 !important;\
                    font-size:14px !important;\
                    font-weight:700 !important;\
                    cursor:pointer !important;\
                    user-select:none !important;\
                    vertical-align:middle !important;\
                    white-space:nowrap;\
                }\
                .criterio-help-i-icon:hover {\
                opacity: 0.65;\
                }\
                .criterio-help-box{\
                    display:none;\
                    margin-top:14px !important;\
                    margin-bottom:12px !important;\
                    background:#ffffff !important;\
                    border:1px solid #e5e5e5 !important;\
                    border-left:4px solid #000000 !important;\
                    border-radius:8px !important;\
                    padding:16px 18px !important;\
                    box-shadow:0 6px 18px rgba(0,0,0,.06) !important;\
                    max-width:900px !important;\
                    color:#1f2937 !important;\
                }\
                .criterio-help-box ul{\
                    margin:0 !important;\
                    padding-left:20px !important;\
                }\
                .criterio-help-box li{\
                    margin-bottom:8px !important;\
                    line-height:1.5 !important;\
                    color: #2c2c2c !important;\
                    font-size:14px !important;\
                }\
            </style>").appendTo("head");
        }

        $.each(ayudas, function (fieldId, data) {

            var $input = $("#" + fieldId);
            if (!$input.length) return;

            var $td = $input.closest("td");
            if (!$td.length) return;

            if ($td.find(".criterio-help-icon[data-field='" + fieldId + "']").length) return;

            var $control = $td.find(".control").first();
            if (!$control.length) return;

            var $icon = $("<span>", {
                "class": "criterio-help-icon",
                "data-field": fieldId,
                "title": "Ver criterio",
                "text": "ⓘ"
            });

            var $box = $("<div class='criterio-help-box'></div>");
            var $ul = $("<ul></ul>");

            $.each(data.contenido, function (_, item) {
                $ul.append($("<li></li>").text(item));
            });

            $box.append($ul);

            $icon.appendTo($td.find("label").first());
            $td.append($box);

            $icon.on("click", function (e) {

                e.preventDefault();
                e.stopPropagation();

                $(".criterio-help-box").not($box).slideUp(150);
                $box.slideToggle(150);

            });

        });

        $(document).off("click.cerrarAyudas").on("click.cerrarAyudas", function (e) {

            if (!$(e.target).closest(".criterio-help-icon, .criterio-help-box").length) {
                $(".criterio-help-box").slideUp(150);
            }

        });
    }

    // Ejecutar ayudas
    agregarAyudasCriterios();


    // ======= FUNCIÓN si el campo esta vacio o es un número devuelve 0 =======
    function n(id) {
        var v = $(id).val();

        if (v === undefined || v === null || v === "") {
            return 0;
        }

        v = parseFloat(v);

        if (isNaN(v)) {
            return 0;
        }

        return v;
    }




function calcularPuntajeEE() {
    // Grupo 1 (15%) - 2 preguntas
    var g1 = ((n("#cre0b_claridadobjetivoscomite") + n("#cre0b_gradointegracioncomite")) / 2) / 5 * 15;

    // Grupo 2 (20%) - 5 preguntas
    var g2 = (
        (n("#cre0b_alcanzabilidadcomite") +
         n("#cre0b_aportevinculantecomite") +
         n("#cre0b_aportenovinculantecomite") +
         n("#cre0b_indicadoresrelevantescomite") +
         n("#cre0b_coherenciacomite")) / 5
    ) / 5 * 20;

    // Grupo 3 (20%) - 4 preguntas
    var g3 = (
        (n("#cre0b_claridadproblematicacomite") +
         n("#cre0b_coherenciasolucioncomite") +
         n("#cre0b_adecuacionmetodologiacomite") +
         n("#cre0b_nivelactividadescomite")) / 4
    ) / 5 * 20;

    // Grupo 4 (10%) - 5 preguntas
    var g4 = (
        (n("#cre0b_trayectoriaorganizacioncomite") +
         n("#cre0b_capacidadadministrativacomite") +
         n("#cre0b_formacionacademicacomite") +
         n("#cre0b_experienciazonacomite") +
         n("#cre0b_experienciaproyectocomite")) / 5
    ) / 5 * 10;

    // Grupo 5 (10%) - 1 pregunta
    var g5 = (n("#cre0b_consistenciah1comite") / 5) * 10;

    // Grupo 6 (5%) - 2 preguntas
    var g6 = ((n("#cre0b_garantizasostenibilidadcomite") + n("#cre0b_verificacioncofinanciamientocomite")) / 2) / 5 * 5;

    // Grupo 7 (5%) - 1 pregunta
    var g7 = (n("#cre0b_sustentoreplicabilidadcomite") / 5) * 5;

    // Grupo 8 (15%) - 1 pregunta
    var g8 = (n("#cre0b_presupuestoresultadoscomite") / 5) * 15;

    var total = g1 + g2 + g3 + g4 + g5 + g6 + g7 + g8;

    // Redondeo a 2 decimales
    total = Math.round(total * 100) / 100;

    // Setear el campo Puntaje
    $("#cre0b_puntajecomite").val(total.toFixed(2).replace('.', ','));

    // opcional: que no lo editen a mano
    $("#cre0b_puntajecomite").prop("readonly", true);

    $("#cre0b_puntajecomite").trigger("change");

}

    // calcular al cargar
    calcularPuntajeEE();

    //Actualiza el valor cada 1 segundos (1000 milisegundos)
    setInterval(function() {
        $("#cre0b_estadoec").val("277010000");//estado interno enviado
    }, 1000); // 1000 milisegundos = 1 segundo

});