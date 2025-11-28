export function initMenu() {
  const menu = document.querySelector(".menu");
  const botonHambur = document.querySelector(".boton-menu");

  if (!menu || !botonHambur) return;
    botonHambur.addEventListener("click", () => {
    const abierto = menu.style.display === "block";
    menu.style.display = abierto ? "none" : "block";
    botonHambur.classList.toggle("activo", !abierto);
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !botonHambur.contains(e.target)) {
      menu.style.display = "none";
      botonHambur.classList.remove("activo");
    }
  });

}