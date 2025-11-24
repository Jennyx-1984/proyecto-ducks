<<<<<<< HEAD
import { startLoading } from '../loading.js';
import { initCartButton, addToCart } from '../boton-cart.js';
import { initMenu } from '../header.js'; // <-- Importamos initMenu

document.addEventListener("DOMContentLoaded", () => {

  // Inicializar menú y carrito en todas las páginas
  initMenu();          // <-- Inicializamos el menú del header
  initCartButton();    // <-- Inicializamos el carrito

  // Captar el botón de compra más cercano
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".botoncomprar");
    if (btn) {
      e.preventDefault();
      addToCart(2); // suma 2 unidades, utilizado como testeo
    }
  });

  // Loading screen solo la primera vez en index.html
  const pageContent = document.getElementById("page-content");

  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    
    if (!localStorage.getItem("indexCargado")) {

      // Crear el div de loading
      const loadingDiv = document.createElement("div");
      loadingDiv.id = "loading-screen";
      loadingDiv.innerHTML = `
          <img src="assets/images/logo-tienda.png" alt="logo" class="loading-logo"> 
          <div class="loading-box"><div id="loading-bar"></div></div>
          <p id="loading-text">Cargando...</p>
      `;
      document.body.prepend(loadingDiv);

      // Ocultar index mientras carga
      if (pageContent) pageContent.style.display = "none";

      // Animación de loading
      startLoading();

      // Se mostró la pantalla de loading
      localStorage.setItem("indexCargado", "true");

    } else {
      // Si ya se mostró, enseña el contenido
      if (pageContent) pageContent.style.display = "block";
    }

  } else {
    // En otras páginas bloquear el loading
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) loadingScreen.remove(); // <-- corregido: antes tenías loadingEl.remove()
    if (pageContent) pageContent.style.display = "block";
  }

});
=======
import { startLoading } from '../loading.js';
import { initCartButton, addToCart } from '../boton-cart.js';
import { initMenu } from '../header.js'; // <-- Importamos initMenu

document.addEventListener("DOMContentLoaded", () => {

  // Inicializar menú y carrito en todas las páginas
  initMenu();          // <-- Inicializamos el menú del header
  initCartButton();    // <-- Inicializamos el carrito

  // Captar el botón de compra más cercano
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".botoncomprar");
    if (btn) {
      e.preventDefault();
      addToCart(2); // suma 2 unidades, utilizado como testeo
    }
  });

  // Loading screen solo la primera vez en index.html
  const pageContent = document.getElementById("page-content");

  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    
    if (!localStorage.getItem("indexCargado")) {

      // Crear el div de loading
      const loadingDiv = document.createElement("div");
      loadingDiv.id = "loading-screen";
      loadingDiv.innerHTML = `
          <img src="assets/images/logo-tienda.png" alt="logo" class="loading-logo"> 
          <div class="loading-box"><div id="loading-bar"></div></div>
          <p id="loading-text">Cargando...</p>
      `;
      document.body.prepend(loadingDiv);

      // Ocultar index mientras carga
      if (pageContent) pageContent.style.display = "none";

      // Animación de loading
      startLoading();

      // Se mostró la pantalla de loading
      localStorage.setItem("indexCargado", "true");

    } else {
      // Si ya se mostró, enseña el contenido
      if (pageContent) pageContent.style.display = "block";
    }

  } else {
    // En otras páginas bloquear el loading
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) loadingScreen.remove(); // <-- corregido: antes tenías loadingEl.remove()
    if (pageContent) pageContent.style.display = "block";
  }

});
>>>>>>> 57539ae37da64c6664a6b8aef1c0f0d305736fff
