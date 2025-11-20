document.addEventListener("DOMContentLoaded", () => {
  const btnContacto = document.getElementById("btn-contacto");
  const modal = document.querySelector(".modal");
  const modalContent = document.querySelector(".div-content-form");
  const form = document.getElementById("formMessage");
  const inputName = document.getElementById("inputName");
  const inputEmail = document.getElementById("inputEmail");
  const inputCargo = document.getElementById("inputCargo");
  const divResults = document.querySelector(".div-results");

  const sanitize = (str) => {
    return str.trim().replace(/[<>]/g, "");
  };

  btnContacto.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.classList.add("fade-in");
    setTimeout(() => modal.classList.remove("fade-in"), 300);
  });

  function cerrarModal() {
    modal.style.display = "none";

    // Limpiar formulario y mensajes
    form.reset();
    divResults.innerHTML = "";
  }

  modal.addEventListener("click", (e) => {
    if (!modalContent.contains(e.target)) {
      cerrarModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrarModal();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar resultados
    divResults.innerHTML = "";

    // Sanitizar
    const nameValue = sanitize(inputName.value);
    const emailValue = sanitize(inputEmail.value);
    const cargoValue = sanitize(inputCargo.value);

    let errors = [];

    // Validar nombre
    if (nameValue.length < 3 || nameValue.length > 50) {
      errors.push("El nombre debe tener entre 3 y 50 caracteres.");
    }

    // Validar email manualmente
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      errors.push("El email no es válido.");
    }

    // Validar nombre
    if (cargoValue.length < 3 || cargoValue.length > 50) {
      errors.push("El cargo debe tener entre 3 y 50 caracteres.");
    }

    // Mostrar errores
    if (errors.length > 0) {
      divResults.innerHTML = `
        <div class="alert alert-danger mt-3">
          ${errors.map((err) => `<p class="m-0">${err}</p>`).join("")}
        </div>
      `;
      return;
    }

    // Si no hay errores → éxito temporal
    divResults.innerHTML = `
      <div class="alert alert-success mt-3">
        Mensaje enviado correctamente.
      </div>
    `;

    // Limpiar input después de enviado
    inputName.value = "";
    inputEmail.value = "";
    inputCargo.value = "";
  });

  // Smooth Scroll real con offset (para navbar)
  document.querySelectorAll('.navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const hash = this.getAttribute("href");
      const destino = document.querySelector(hash);
      if (!destino) return;

      // Tamaño aproximado del navbar
      const offset = 80;

      const top = destino.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });

      // -------------------------------------------
      // CERRAR EL NAVBAR EN MÓVIL
      // -------------------------------------------
      const navbarCollapse = document.getElementById("navbarNavAltMarkup");

      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});
