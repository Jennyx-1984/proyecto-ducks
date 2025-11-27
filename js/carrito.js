import { listaPatitos } from "./lista-patitos.js";
import { actualizarCartCount } from "./events/events.js";

const carritoContainer = document.querySelector(".carrito");

function renderCarrito() {
    if (!carritoContainer) return;
    carritoContainer.innerHTML = "";

    //Cargar carrito desde cartItems
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    
    // Resetear compras en listaPatitos
    listaPatitos.forEach(p => p.compras = 0);
    for (const id in cartItems) {
        const patito = listaPatitos.find(p => p.id == id);
        if (patito) patito.compras = cartItems[id];
    }

    const visibles = listaPatitos.filter(p => p.compras > 0);

    if (visibles.length === 0) {
        carritoContainer.innerHTML = `
            <p class="mensaje-vacio">No hay productos en el carrito.</p>
            <button class="comprar">Volver</button>
        `;
        document.querySelector(".comprar").addEventListener("click", () => {
            window.location.href = "Catalogo.html";
        });
        return;
    }

    visibles.forEach(patito => {
        const articulo = document.createElement("article");
        articulo.classList.add("articulo-carrito");
        articulo.innerHTML = `
            <img class="imagen-articulo" src="${patito.photo}" alt="Imagen de ${patito.nombre}">
            <div class="info-articulo">
                <div class="nombre-articulo">
                    <p class="nombre">${patito.nombre}</p>
                    <p class="info">${patito.rol}</p>
                </div>
                <div class="cantidad-articulo">
                    <p class="titulo-cantidad">Cantidad</p>
                    <div class="botones-fijos">
                        <button class="botondisminuir">-</button>
                        <div class="campo-vacio">${patito.compras}</div>
                        <button class="botonincrementar">+</button>
                        <button class="btn-eliminar"><img class="papelera" src="../assets/images/iconos/papelera.png"></button>
                    </div>
                </div>
                <div class="info-precio">
                    <table>
                        <tr class="precio"><td>Precio</td><td>${patito.precio}${patito.moneda}</td></tr>
                        <tr class="precio-subtotal"><td>Subtotal</td><td class="valor-subtotal">${patito.precio * patito.compras}${patito.moneda}</td></tr>
                    </table>
                </div>
            </div>
        `;

        const btnMas = articulo.querySelector(".botonincrementar");
        const btnMenos = articulo.querySelector(".botondisminuir");
        const btnEliminar = articulo.querySelector(".btn-eliminar");
        const campo = articulo.querySelector(".campo-vacio");
        const celdaSubtotal = articulo.querySelector(".valor-subtotal");

        // Incrementar cantidad
        btnMas.addEventListener("click", () => {
            if (patito.compras < patito.stock) {
                patito.compras++;
                campo.textContent = patito.compras;
                cartItems[patito.id] = patito.compras;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                localStorage.setItem("cartCount", Object.values(cartItems).reduce((a,b)=>a+b,0));
                actualizarCartCount();
                celdaSubtotal.textContent = `${patito.precio * patito.compras}${patito.moneda}`;
                recalcularTotal();
            }
        });

        // Disminuir cantidad
        btnMenos.addEventListener("click", () => {
            if (patito.compras > 0) {
                patito.compras--;
                campo.textContent = patito.compras;
                if (patito.compras === 0) delete cartItems[patito.id];
                else cartItems[patito.id] = patito.compras;
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                localStorage.setItem("cartCount", Object.values(cartItems).reduce((a,b)=>a+b,0));
                actualizarCartCount();
                celdaSubtotal.textContent = `${patito.precio * patito.compras}${patito.moneda}`;
                if (patito.compras === 0) renderCarrito(); // refresca si llega a 0
                recalcularTotal();
            }
        });

        // Eliminar producto
        btnEliminar.addEventListener("click", () => {
            delete cartItems[patito.id];
            patito.compras = 0;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            localStorage.setItem("cartCount", Object.values(cartItems).reduce((a,b)=>a+b,0));
            actualizarCartCount();
            renderCarrito();
        });

        carritoContainer.appendChild(articulo);
    });

    // Total y botón comprar
    if (!document.querySelector(".contador")) {
        const contadorDiv = document.createElement("div");
        contadorDiv.classList.add("contador");
        contadorDiv.innerHTML = `
            <p class="total">TOTAL</p>
            <p class="precio-total">0</p>
        `;
        carritoContainer.appendChild(contadorDiv);
    }

    if (!document.querySelector(".comprar")) {
        const botonComprar = document.createElement("button");
        botonComprar.classList.add("comprar");
        botonComprar.textContent = "Comprar";
        carritoContainer.appendChild(botonComprar);

        botonComprar.addEventListener("click", () => {
    const carrito = listaPatitos.filter(p => p.compras > 0);
    if (carrito.length === 0) {
        alert("No hay productos para comprar");
        return;
    }

    if(!factura()) {
        // Si cancela, simplemente volvemos al carrito sin modificar nada
        alert("Pago cancelado. Volviendo al carrito.");
        renderCarrito(); // Mantiene cantidades
        return;
    }

    // Solo si factura() devuelve true, se procede
    let totalFinal = 0;
    let mensaje = "🧾 FACTURA DE COMPRA\n------------------------\n";

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.compras;
        totalFinal += subtotal;
        mensaje += `
🐤 ${producto.nombre}
    Cantidad: ${producto.compras}
    Precio unitario: ${producto.precio}${producto.moneda}
    Subtotal: ${subtotal}${producto.moneda}
        `;
        // RESTAR STOCK
        producto.stock -= producto.compras;
        producto.compras = 0;
    });

    mensaje += "------------------------\n";
    mensaje += `💰 TOTAL FINAL: ${totalFinal}€`;

    alert(mensaje);
    alert("COMPRA EXITOSA");

    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartCount");
    actualizarCartCount();

    // Redirigir a página principal
    window.location.href = "../index.html";

    // Guardar stock actualizado
    localStorage.setItem("stockPatitos", JSON.stringify(
        listaPatitos.map(p => ({ id: p.id, stock: p.stock }))
    ));

    renderCarrito();
});

    }

    recalcularTotal();
}

// ================================
// FUNCION RECALCULAR TOTAL
// ================================
function recalcularTotal() {
    let total = 0;
    let moneda = "€";

    const subtotales = document.querySelectorAll(".valor-subtotal");
    subtotales.forEach(td => {
        const valor = parseFloat(td.textContent.replace(/[^0-9.]/g, ""));
        total += valor;
    });

    const firstPatito = listaPatitos.find(p => p.compras > 0);
    moneda = firstPatito ? firstPatito.moneda : "€";

    const precioTotalEl = document.querySelector(".precio-total");
    if (precioTotalEl) precioTotalEl.textContent = `${total}${moneda}`;
}


function factura(){
    let cardNumber = prompt("Introduce número de tarjeta (13–16 dígitos):");

    if(cardNumber === null) return false; // Usuario presionó Cancelar

    while (!/^\d{13,16}$/.test(cardNumber)) {
        cardNumber = prompt("❌ Solo números y entre 13 y 16 dígitos.\nIntroduce número de tarjeta:");
        if(cardNumber === null) return false; // Cancelar durante reintento
    }

    let masked = cardNumber.replace(/(.{4})/g, "$1 ").trim();
    alert("Número de tarjeta: " + masked);
    return true; // Pago completado
}
// Llamada inicial
renderCarrito();
actualizarCartCount();

