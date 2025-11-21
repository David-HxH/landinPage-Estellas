document.addEventListener("DOMContentLoaded", () => {
  const btnContacto = document.getElementById("btn-contacto");
  const form = document.getElementById("formMessage");
  const inputName = document.getElementById("inputName");
  const inputEmail = document.getElementById("inputEmail");
  const inputCargo = document.getElementById("inputCargo");
  const divResults = document.querySelector(".div-results");

  // Instancia del modal Bootstrap
  const modalEl = document.getElementById("modalRegister");
  const modal = new bootstrap.Modal(modalEl);

  const sanitize = (str) => {
    return str.trim().replace(/[<>]/g, "");
  };

  // Abrir modal
  btnContacto.addEventListener("click", () => {
    modal.show();
  });

  // Cuando el modal se cierra → limpiar formulario
  modalEl.addEventListener("hidden.bs.modal", () => {
    form.reset();
    divResults.innerHTML = "";
  });

  // Validación del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    divResults.innerHTML = "";

    const nameValue = sanitize(inputName.value);
    const emailValue = sanitize(inputEmail.value);
    const cargoValue = sanitize(inputCargo.value);

    let errors = [];

    if (nameValue.length < 3 || nameValue.length > 50) {
      errors.push("El nombre debe tener entre 3 y 50 caracteres.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      errors.push("El email no es válido.");
    }

    if (cargoValue.length < 3 || cargoValue.length > 50) {
      errors.push("El cargo debe tener entre 3 y 50 caracteres.");
    }

    if (errors.length > 0) {
      divResults.innerHTML = `
        <div class="alert alert-danger mt-3">
          ${errors.map((err) => `<p class="m-0">${err}</p>`).join("")}
        </div>
      `;
      return;
    }

    divResults.innerHTML = `
      <div class="alert alert-success mt-3">
        Mensaje enviado correctamente.
      </div>
    `;

    // Limpiar después de un pequeño delay
    setTimeout(() => {
      modal.hide();
    }, 1500);
  });

  // Smooth Scroll
  document.querySelectorAll('.navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const hash = this.getAttribute("href");
      const destino = document.querySelector(hash);
      if (!destino) return;

      const navbar = document.querySelector(".navbar.sticky-top");
      const offset = navbar ? navbar.offsetHeight : 0;

      const top = destino.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });

      const navbarCollapse = document.getElementById("navbarNavAltMarkup");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});
