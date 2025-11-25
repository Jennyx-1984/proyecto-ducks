//Crear el botón del carrito
function createCartButton() {
  const cartButtonHtml = `
    <div id="cart-wrapper" class="cart-wrapper hidden">
      <a href="../pages/carrito.html">
        <div id="cart-button" class="cart-button">
          <img src="../assets/images/iconos/carrito-patito.png" alt="carrito de compra" class="carrito-compra">
        </div>
      </a>
      <span id="cart-count" class="cart-count">0</span>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", cartButtonHtml);
}

//Inicializar carrito
function initCartButton() {
  // No mostrar el carrito si estamos en carrito.html
  const currentPage = window.location.pathname;
  if (currentPage.includes("carrito.html")) {
    return; // Sale de la función y no crea el botón
  }
  createCartButton();
  const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartCountEl = document.getElementById("cart-count");

  if (cartCount > 0) {
    cartWrapper.classList.remove("hidden");
    cartCountEl.textContent = cartCount;
  }
}

// Agregar productos al carrito
/*function addToCart(amount) {
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCount += amount;
  localStorage.setItem("cartCount", cartCount);

  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartCountEl = document.getElementById("cart-count");
  cartWrapper.classList.remove("hidden");
  cartCountEl.textContent = cartCount;
}*/

function addToCart(amount, duckId) {
    // === Actualizar carrito global ===
    let cartCount = 0; // recalcularemos después
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    // Sobrescribir la cantidad actual del patito
    cartItems[duckId] = amount;

    // Guardar en localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Recalcular el total global
    cartCount = Object.values(cartItems).reduce((acc, val) => acc + val, 0);
    localStorage.setItem("cartCount", cartCount);

    // Actualizar interfaz
    const cartWrapper = document.querySelector(".cart-wrapper");
    const cartCountEl = document.getElementById("cart-count");
    cartWrapper.classList.remove("hidden");
    cartCountEl.textContent = cartCount;
}




// Exportar funciones
export { initCartButton, addToCart };
