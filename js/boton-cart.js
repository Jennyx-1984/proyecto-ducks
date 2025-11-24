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
function addToCart(amount = 1) {
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCount += amount;
  localStorage.setItem("cartCount", cartCount);

  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartCountEl = document.getElementById("cart-count");
  cartWrapper.classList.remove("hidden");
  cartCountEl.textContent = cartCount;
}

// Exportar funciones
export { initCartButton, addToCart };
