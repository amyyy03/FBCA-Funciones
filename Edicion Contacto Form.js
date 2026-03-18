$(document).ready(function () {

  function renombrarBoton() {
    // por ID (más confiable)
    $("#UpdateButton").val("Guardar cambios");

    // fallback por texto, por si cambia el ID
    $("input[type='button'][value='Enviar']").val("Guardar cambios");
  }

  // 1) intento inmediato
  renombrarBoton();

  // 2) reintento (porque el modal a veces carga después)
  setTimeout(renombrarBoton, 300);
  setTimeout(renombrarBoton, 1000);



  if ($("#bca-grow-wrapper-msos").length) return;

  // ===== CSS mínimo para que el “crecimiento” se vea natural =====
  const css = `
    .bca-msos-grow {
      overflow: visible !important;
      height: auto !important;
      max-height: none !important;
    }
  `;
  $("head").append(`<style id="bca-grow-wrapper-msos">${css}</style>`);

  // Encuentra el contenedor que normalmente recorta (td/control/tab/section)
  function getClipperContainer($from) {
    // Sube por los wrappers típicos del Entity Form (tabla/celda/control)
    const $c = $from.closest(
      "td.clearfix.cell.form-control-cell, td.cell.form-control-cell, .control, .tab.clearfix, .section, .entity-form"
    );
    return $c.length ? $c : $from.parent();
  }

  // Agranda el contenedor (guardando estado previo para restaurar)
  function growContainer($container) {
    if (!$container || !$container.length) return;

    // guardar estilos previos solo 1 vez
    if ($container.data("bcaSaved")) return;
    $container.data("bcaSaved", true);

    $container.data("bca_prev_overflow", $container.css("overflow"));
    $container.data("bca_prev_height", $container.css("height"));
    $container.data("bca_prev_maxheight", $container.css("max-height"));

    // aplica “crecimiento”
    $container.addClass("bca-msos-grow");

    // Esta es la parte clave: damos espacio vertical suficiente para el dropdown
    // Ajusta 320/380 según cuántos items quieres que quepan.
    $container.css({
      overflow: "visible",
      height: "auto",
      "max-height": "none",
      "min-height": "320px"
    });

    // También a padres cercanos que suelen recortar
    $container.parents(".modal-body, .modal-content, .modal-dialog").css("overflow", "visible");
  }

  // Restaura el contenedor a como estaba
  function restoreContainer($container) {
    if (!$container || !$container.length) return;
    if (!$container.data("bcaSaved")) return;

    $container.css({
      overflow: $container.data("bca_prev_overflow") || "",
      height: $container.data("bca_prev_height") || "",
      "max-height": $container.data("bca_prev_maxheight") || "",
      "min-height": ""
    });

    $container.removeClass("bca-msos-grow");
    $container.removeData("bcaSaved");
  }

  // ===== EVENTOS =====
  // 1) Al abrir el menú (caret) => crecer contenedor
  $(document).on("click", "button.msos-caret-button", function () {
    const $btn = $(this);
    const $container = getClipperContainer($btn);
    growContainer($container);

    // Reforzar un poco después (Power Pages reflow)
    setTimeout(function () { growContainer($container); }, 50);
    setTimeout(function () { growContainer($container); }, 150);
  });

  // 2) Si el usuario hace click dentro del control también crecer
  $(document).on("focus click", ".msos-inner-container, .msos-container, #cre0b_grupo_i", function () {
    const $el = $(this);
    const $container = getClipperContainer($el);
    growContainer($container);
  });

  // 3) Al cerrar: cuando haces click fuera del control, restaurar
  $(document).on("mousedown", function (e) {
    const $target = $(e.target);

    // Si estás interactuando con el control o su dropdown, no cierres
    if ($target.closest(".msos-container, .msos-selection-container, .msos-inner-container, .msos-caret-button").length) {
      return;
    }

    // Restaurar cualquier contenedor que hayamos crecido
    const $grown = $(".bca-msos-grow").first();
    if ($grown.length) {
      restoreContainer($grown);
    }
  });

  // 4) Escape también restaura (por si se cierra con teclado)
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      const $grown = $(".bca-msos-grow").first();
      if ($grown.length) restoreContainer($grown);
    }
  });

});
