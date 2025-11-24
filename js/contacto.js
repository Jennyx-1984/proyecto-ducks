document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contacto");
  const regexDigitos = /\d/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Funciones de validación individuales
  function validarNombre() {
    const nombre = document.getElementById("nombre").value.trim();
    const error = document.getElementById("error-nombre");

    if (nombre === "") {
      error.textContent = "Por favor, ingresa tu nombre.";
      error.classList.add("visible");
      return false;
    }

    if (regexDigitos.test(nombre) || nombre.length < 3) {
      error.textContent = "No debe contener números y al menos 3 caracteres.";
      error.classList.add("visible");
      return false;
    }

    error.classList.remove("visible");
    return true;
  }

  function validarEmail() {
    const email = document.getElementById("email").value.trim();
    const error = document.getElementById("error-email");

    if (email === "") {
      error.textContent = "Por favor, ingresa tu correo.";
      error.classList.add("visible");
      return false;
    }

    if (!regexEmail.test(email)) {
      error.textContent = "El correo no es válido.";
      error.classList.add("visible");
      return false;
    }

    error.classList.remove("visible");
    return true;
  }

  function validarComentario() {
    const comentario = document.getElementById("comentario").value.trim();
    const error = document.getElementById("error-comentario");

    if (comentario === "") {
      error.textContent = "Por favor, escribe un comentario.";
      error.classList.add("visible");
      return false;
    }

    error.classList.remove("visible");
    return true;
  }

  // Validación del formulario al enviar
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombreOK = validarNombre();
    const emailOK = validarEmail();
    const comentarioOK = validarComentario();

    if (!nombreOK || !emailOK || !comentarioOK) return;

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    alert(`¡Gracias por contactarnos, ${nombre}! Hemos recibido tu mensaje.`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);
    console.log(`Comentario: ${comentario}`);

    form.reset();
  });

  // Validación al salir del input (blur)
  document.getElementById("nombre").addEventListener("blur", validarNombre);
  document.getElementById("email").addEventListener("blur", validarEmail);
  document.getElementById("comentario").addEventListener("blur", validarComentario);
});


