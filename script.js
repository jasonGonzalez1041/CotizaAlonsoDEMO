var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const toggleIcon = sidebarToggle.querySelector("i");

  // Función para manejar el comportamiento del sidebar según el ancho de la ventana
  function handleSidebar() {
    if (window.innerWidth <= 768) {
      // En dispositivos móviles, siempre colapsado
      sidebarToggle.classList.add("hidden");
      sidebar.classList.add("collapsed");
      if (toggleIcon) {
        toggleIcon.classList.remove("fa-chevron-left");
        toggleIcon.classList.add("fa-chevron-right");
      }
    } else {
      // En dispositivos de escritorio, recuperar estado guardado
      const sidebarState = localStorage.getItem("sidebarState");
      sidebarToggle.classList.remove("hidden");
      if (sidebarState === "collapsed") {
        sidebar.classList.add("collapsed");
        if (toggleIcon) {
          toggleIcon.classList.remove("fa-chevron-left");
          toggleIcon.classList.add("fa-chevron-right");
        }
      } else {
        sidebar.classList.remove("collapsed");
        if (toggleIcon) {
          toggleIcon.classList.remove("fa-chevron-right");
          toggleIcon.classList.add("fa-chevron-left");
        }
      }
    }
  }

  // Aplicar el comportamiento inicial
  handleSidebar();

  // Escuchar eventos de redimensionamiento de ventana
  window.addEventListener("resize", handleSidebar);

  // Funcionalidad del botón toggle (solo para dispositivos de escritorio)
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      if (window.innerWidth > 768) {
        sidebar.classList.toggle("collapsed");

        if (sidebar.classList.contains("collapsed")) {
          toggleIcon.classList.remove("fa-chevron-left");
          toggleIcon.classList.add("fa-chevron-right");
          localStorage.setItem("sidebarState", "collapsed");
        } else {
          toggleIcon.classList.remove("fa-chevron-right");
          toggleIcon.classList.add("fa-chevron-left");
          localStorage.setItem("sidebarState", "expanded");
        }
      }
    });
  }
});
