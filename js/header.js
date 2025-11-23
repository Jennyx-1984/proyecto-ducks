export function initMenu() {
  const menu = document.querySelector(".menu");
  const botonHambur = document.querySelector(".boton-menu");

  if (!menu || !botonHambur) return; // Si no existen, no hacer nada

    botonHambur.addEventListener("click", () => {
    const abierto = menu.style.display === "block";
    menu.style.display = abierto ? "none" : "block";
    botonHambur.classList.toggle("activo", !abierto);
  });

  // Cerrar si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !botonHambur.contains(e.target)) {
      menu.style.display = "none";
      botonHambur.classList.remove("activo");
    }
  });
}