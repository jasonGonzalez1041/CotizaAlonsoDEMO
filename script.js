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
    const isMobile = window.innerWidth <= 768;
    sidebarToggle.classList.toggle('hidden', isMobile);
    
    if (!isMobile) {
      const sidebarState = localStorage.getItem("sidebarState");
      const isCollapsed = sidebarState === "collapsed";
      sidebar.classList.toggle("collapsed", isCollapsed);
      
      if (toggleIcon) {
        toggleIcon.classList.toggle("fa-chevron-left", !isCollapsed);
        toggleIcon.classList.toggle("fa-chevron-right", isCollapsed);
      }
    } else {
      sidebar.classList.add("collapsed");
      if (toggleIcon) {
        toggleIcon.classList.replace("fa-chevron-left", "fa-chevron-right");
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

  // Elementos del DOM
  const bellIcon = document.getElementById("notificacion_bell");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const notificationList = document.getElementById("notification-list");

  // Datos de ejemplo para las notificaciones
  const notifications = [
    {
      id: 1,
      title: "Nueva cotización",
      message: "Julieta dar seguimiento a la cotización ALO-186-4-2025", // Modificado
      time: "12:42 PM el 30/04/2025",
      read: false,
      type: "new",
    },
    {
      id: 2,
      title: "Nueva cotización",
      message: "Julieta dar seguimiento a la cotización ALO-185-4-2025", // Modificado
      time: "11:25 AM el 30/04/2025",
      read: false,
      type: "new",
    },
    {
      id: 3,
      title: "Error en cotización",
      message: "Julieta dar seguimiento a la cotización ALO-184-4-2025", // Modificado
      time: "10:56 AM el 30/04/2025",
      read: false,
      type: "error",
    },
    {
      id: 4,
      title: "Nueva cotización",
      message: "Julieta dar seguimiento a la cotización ALO-183-2025", // Modificado
      time: "12:42 PM el 30/04/2025",
      read: false,
      type: "new",
    },
    {
      id: 5,
      title: "Nueva cotización",
      message: "Julieta dar seguimiento a la cotización ALO-182-4-2025", // Modificado
      time: "11:25 AM el 30/04/2025",
      read: false,
      type: "new",
    },
    {
      id: 6,
      title: "Error en cotización",
      message: "Julieta dar seguimiento a la cotización ALO-181-4-2025", // Modificado
      time: "10:56 AM el 30/04/2025",
      read: false,
      type: "error",
    },
  ];

  // Mostrar/ocultar el dropdown al hacer clic en la campana
  bellIcon.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Alternar visibilidad
    notificationDropdown.style.display =
      notificationDropdown.style.display === "block" ? "none" : "block";

    // Si se está mostrando, actualizar contador
    if (notificationDropdown.style.display === "block") {
      updateUnreadCount();
    }
  });

  // Cerrar el dropdown al hacer clic fuera de él
  document.addEventListener("click", function (e) {
    if (!notificationDropdown.contains(e.target) && e.target !== bellIcon) {
      notificationDropdown.style.display = "none";
    }
  });

  // Renderizar las notificaciones
  function renderNotifications() {
    notificationList.innerHTML = "";

    if (notifications.length === 0) {
      notificationList.innerHTML =
        '<div class="notification-item text-center py-3">No hay notificaciones</div>';
      return;
    }

    notifications.forEach((notification) => {
      const notificationItem = document.createElement("div");
      notificationItem.className = `notification-item ${
        notification.read ? "" : "unread"
      } ${notification.type === "error" ? "error" : ""} ${
        notification.type === "new" ? "success" : ""
      }`;

      // Determinar el icono según el tipo de notificación
      let iconClass = "fas fa-file-alt"; // icono por defecto (documento)
      if (notification.type === "error") {
        iconClass = "fas fa-exclamation-triangle"; // ícono de error
      } else if (notification.type === "new") {
        iconClass = "fas fa-plus-circle"; // ícono de nuevo
      }

      notificationItem.innerHTML = `
        <div class="d-flex align-items-start">
          <i class="${iconClass} notification-icon" style="color: ${
        notification.type === "error"
          ? "red"
          : notification.type === "new"
          ? "green"
          : "black"
      }"></i>
          <div class="notification-content">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.time}</div>
          </div>
        </div>
      `;
      // Marcar como leída al hacer clic
      notificationItem.addEventListener("click", (e) => {
        e.stopPropagation();
        notification.read = true;
        notificationItem.classList.remove("unread");
        updateUnreadCount();

        // Aquí podrías agregar lógica para redirigir a la notificación específica
        console.log("Notificación clickeada:", notification.id);
      });

      notificationList.appendChild(notificationItem);
    });
  }
  renderNotifications();
  // Obtener referencias a los elementos
  const btnAttachTarifario = document.getElementById("btn_attach_tarifario");
  const tarifarioItem = document.getElementById("tarifarios_aduanas");

  // Verificar que los elementos existen
  if (btnAttachTarifario && tarifarioItem) {
    // Variable para mantener el estado actual
    let isVisible = false;

    // Ocultar el elemento tarifarios_aduanas al inicio
    tarifarioItem.classList.add("d-none");

    // Agregar el evento click al botón
    btnAttachTarifario.addEventListener("click", function () {
      // Cambiar estado
      isVisible = !isVisible;

      // Actualizar visualización según el estado
      if (isVisible) {
        // Mostrar el elemento
        tarifarioItem.classList.remove("d-none");
        // Cambiar el estilo del botón a activo
        btnAttachTarifario.classList.remove("btn-success");
        btnAttachTarifario.classList.add("btn-secondary");
        // Cambiar el ícono y texto
        btnAttachTarifario.innerHTML =
          '<i class="fa-solid fa-times me-1"></i> Quitar Tarifarios de aduanas';
      } else {
        // Ocultar el elemento
        tarifarioItem.classList.add("d-none");
        // Cambiar el estilo del botón a inactivo
        btnAttachTarifario.classList.remove("btn-secondary");
        btnAttachTarifario.classList.add("btn-success");
        // Restaurar ícono y texto
        btnAttachTarifario.innerHTML =
          '<i class="fa-solid fa-check me-1"></i> Adjuntar Tarifarios de aduanas';
      }
    });
  } else {
    console.error("No se encontraron los elementos necesarios");
  }
});
