// Crear botón y UI
function createCartButton() {
    if (document.getElementById("cart-wrapper")) return;
    const html = `<div id="cart-wrapper" class="cart-wrapper hidden">
  <div id="cart-button" class="cart-button">
    <img src="../assets/images/iconos/carrito-patito.png" alt="carrito de compra" class="carrito-compra">
  </div>
  <span id="cart-count" class="cart-count">0</span>
</div>`;
    document.body.insertAdjacentHTML("beforeend", html);
}

// Inicializar
function initCartButton() {
    createCartButton();
    document.getElementById("cart-button")?.addEventListener("click", () => {
        window.location.href = "../pages/carrito.html";
    });
    updateCartUI();
}

// Actualizar UI
function updateCartUI() {
    const cartWrapper = document.getElementById("cart-wrapper");
    const cartCountEl = document.getElementById("cart-count");
    const count = parseInt(localStorage.getItem("cartCount")) || 0;
    if (cartWrapper && cartCountEl) {
        cartWrapper.classList.toggle("hidden", count === 0);
        cartCountEl.textContent = count;
    }
}

// addToCart solo actualiza UI
function addToCart() {
    updateCartUI();
}

export { initCartButton, addToCart };




















//==============================================================================================================================
// ================================
// CREAR BOTÓN DEL CARRITO (una sola vez)
// ================================
/*function createCartButton() {
  if (document.getElementById("cart-wrapper")) return; // evita duplicados

  const cartButtonHtml = `
  <div id="cart-wrapper" class="cart-wrapper hidden">
    <div id="cart-button" class="cart-button">
      <img src="../assets/images/iconos/carrito-patito.png" alt="carrito de compra" class="carrito-compra">
    </div>
    <span id="cart-count" class="cart-count">0</span>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", cartButtonHtml);
}

// ================================
// ACTUALIZAR UI DEL CARRITO
// ================================
function updateCartUI() {
  const cartWrapper = document.getElementById("cart-wrapper");
  const cartCountEl = document.getElementById("cart-count");

  const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

  if (!cartWrapper || !cartCountEl) return;

  if (cartCount > 0) {
    cartWrapper.classList.remove("hidden");
  } else {
    cartWrapper.classList.add("hidden");
  }

  cartCountEl.textContent = cartCount;
}

// ================================
// INICIALIZAR CARRITO
// ================================
function initCartButton() {
  const currentPage = window.location.pathname;

  // No mostrar el carrito si estamos en carrito.html
  if (currentPage.includes("carrito.html")) return;

  // Crear el botón dinámicamente si no existe
  createCartButton();

  // Enlazar el click para ir al carrito
  const cartButton = document.getElementById("cart-button");
  cartButton.addEventListener("click", () => {
    window.location.href = "../pages/carrito.html";
  });

  // Actualizar UI inicial
  updateCartUI();
}

// ================================
// AGREGAR PRODUCTOS AL CARRITO
// ================================
function addToCart(amount, duckId) {
  // Obtener carrito actual
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

  // Sobrescribir cantidad del producto
  cartItems[duckId] = amount;

  // Guardar cambios
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Recalcular total
  const cartCount = Object.values(cartItems).reduce((acc, val) => acc + val, 0);
  localStorage.setItem("cartCount", cartCount);

  // Refrescar UI
  updateCartUI();
}




// ================================
// EXPORTAR
// ================================
export { initCartButton, addToCart };

//===================================================================================================================================

*/

