// ================================
// CREAR BOTÓN DEL CARRITO
// ================================
function createCartButton() {
  const cartButtonHtml = `<div id="cart-wrapper" class="cart-wrapper hidden">
  <div id="cart-button" class="cart-button">
    <img src="../assets/images/iconos/carrito-patito.png" alt="carrito de compra" class="carrito-compra">
  </div>
  <span id="cart-count" class="cart-count">0</span>
</div>`;
  document.body.insertAdjacentHTML("beforeend", cartButtonHtml);
}

// ================================
// INICIALIZAR CARRITO
// ================================
function initCartButton() {
  const currentPage = window.location.pathname;

  // No mostrar el carrito si estamos en carrito.html
  if (currentPage.includes("carrito.html")) return;

  // Crear el botón dinámicamente
  createCartButton();

  // Obtener elementos después de crearlos
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartCountEl = document.getElementById("cart-count");
  const cartButton = document.getElementById("cart-button");

  // Conectar click al botón flotante
  cartButton.addEventListener("click", (e) => {
      e.preventDefault(); // opcional: evita ir al enlace
      window.location.href = "../pages/carrito.html";
  });

  // Mostrar cantidad si hay productos en localStorage
  const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  if (cartCount > 0) {
    cartWrapper.classList.remove("hidden");
    cartCountEl.textContent = cartCount;
  }
}

// ================================
// AÑADIR PRODUCTOS AL CARRITO
// ================================
function addToCart(amount, duckId) {
    // Obtener carrito actual
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    // Sobrescribir la cantidad actual del patito
    cartItems[duckId] = amount;

    // Guardar en localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Recalcular el total global
    const cartCount = Object.values(cartItems).reduce((acc, val) => acc + val, 0);
    localStorage.setItem("cartCount", cartCount);

    // Actualizar interfaz
    const cartWrapper = document.querySelector(".cart-wrapper");
    const cartCountEl = document.getElementById("cart-count");
    if (cartWrapper && cartCountEl) {
        cartWrapper.classList.remove("hidden");
        cartCountEl.textContent = cartCount;
    }
}

// ================================
// EXPORTAR FUNCIONES
// ================================
export { initCartButton, addToCart };

