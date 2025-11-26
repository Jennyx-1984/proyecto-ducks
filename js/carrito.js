import { listaPatitos } from "./lista-patitos.js";


// ================================
// FUNCIÓN COUNTER CON STOCK
// ================================
function counter(btnMas, btnMenos, campo, stock, callback) {
    btnMas.addEventListener("click", () => {
        let cantidad = parseInt(campo.textContent);
        if (cantidad < stock) {
            cantidad++;
            campo.textContent = cantidad;
            if (callback) callback(cantidad);
        } else {
            alert("No hay más stock disponible");
        }
    });

    btnMenos.addEventListener("click", () => {
        let cantidad = parseInt(campo.textContent);
        if (cantidad > 1) {
            cantidad--;
            campo.textContent = cantidad;
            if (callback) callback(cantidad);
        }
    });
}

// ================================
// CONTENEDOR DEL CARRITO
// ================================
const carrito = document.querySelector(".carrito");

// ================================
// MOSTRAR CARRITO
// ================================
function renderCarrito() {
    if (!carrito) return; // si no existe el contenedor, salimos
    carrito.innerHTML = ""; // limpiar

    // para no mostrar patitos con cantidades inferiores a 1
    const visibles = listaPatitos.filter(p => p.compras > 0);

    // si no hay patitos muestra mensaje y se sale
    if (visibles.length === 0) {
        carrito.innerHTML = `
            <p class="mensaje-vacio">No hay ningún producto seleccionado, regresa al Catálogo.</p>
            <button class="comprar">Volver</button>
        `;

        document.querySelector(".comprar").addEventListener("click", () => {
    window.location.href = "Catalogo.html";
});
        return;
    }

    // si hay patitos se generan los artículos
    visibles.forEach(patito => {
        console.log(patito.moneda);
        
        const articulo = document.createElement("article");

        // Imagen de patito
        const img = document.createElement("img");
        img.classList.add("imagen-articulo");
        img.src = patito.photo;

        // Contenedor informacion
        const info = document.createElement("div");
        info.classList.add("info-articulo");

        // Nombre patito
        const nombreCont = document.createElement("div");
        nombreCont.classList.add("nombre-articulo");

        const nombre = document.createElement("p");
        nombre.classList.add("nombre");
        nombre.textContent = patito.nombre;

        const rol = document.createElement("p");
        rol.classList.add("info");
        rol.textContent = patito.rol;

        nombreCont.appendChild(nombre);
        nombreCont.appendChild(rol);

        // Cantidad
        const cantidadCont = document.createElement("div");
        cantidadCont.classList.add("cantidad-articulo");

        const tituloCantidad = document.createElement("p");
        tituloCantidad.classList.add("titulo-cantidad");
        tituloCantidad.textContent = "Cantidad";

        const btnMenos = document.createElement("button");
        btnMenos.classList.add("botondisminuir");
        btnMenos.textContent = "-";

        const campo = document.createElement("div");
        campo.classList.add("campo-vacio");
        campo.textContent = patito.compras;

        const btnMas = document.createElement("button");
        btnMas.classList.add("botonincrementar");
        btnMas.textContent = "+";

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn-eliminar");
        const icono = document.createElement("img");
        icono.classList.add("papelera");
        icono.src = "../assets/images/iconos/papelera.png";
        btnEliminar.appendChild(icono);

        const botonesFijos = document.createElement("div");
        botonesFijos.classList.add("botones-fijos");
        botonesFijos.appendChild(btnMenos);
        botonesFijos.appendChild(campo);
        botonesFijos.appendChild(btnMas);
        botonesFijos.appendChild(btnEliminar);

        cantidadCont.appendChild(tituloCantidad);
        cantidadCont.appendChild(botonesFijos);

        // Precio y subtotal
        const precioCont = document.createElement("div");
        precioCont.classList.add("info-precio");

        const tabla = document.createElement("table");

        const filaPrecio = document.createElement("tr");
        filaPrecio.classList.add("precio");
        filaPrecio.innerHTML = `
            <td>Precio</td>
            <td>${patito.precio}${patito.moneda}</td>
        `;

        const filaSubtotal = document.createElement("tr");
        filaSubtotal.classList.add("precio-subtotal");
        const subtotalInicial = patito.precio * patito.compras;
        filaSubtotal.innerHTML = `
            <td>Subtotal</td>
            <td class="valor-subtotal">${subtotalInicial}${patito.moneda}</td>
        `;
        const celdaSubtotal = filaSubtotal.querySelector(".valor-subtotal");

        tabla.appendChild(filaPrecio);
        tabla.appendChild(filaSubtotal);
        precioCont.appendChild(tabla);

        // Contador
        counter(btnMas, btnMenos, campo, patito.stock, (cantidad) => {
            patito.compras = cantidad;
            celdaSubtotal.textContent = `${patito.precio * cantidad}${patito.moneda}`;
            guardarCarrito(); 
            recalcularTotal();
        });

        btnEliminar.addEventListener("click", () => {
            patito.compras = 0;  // quitar del carrito
            guardarCarrito(); 
            renderCarrito();     
            recalcularTotal();
        });

        // Juntar info
        info.appendChild(nombreCont);
        info.appendChild(cantidadCont);
        info.appendChild(precioCont);

        articulo.appendChild(img);
        articulo.appendChild(info);

        carrito.appendChild(articulo);
    });

    // agregar total y botón comprar
    carrito.appendChild(contador);
    carrito.appendChild(botonComprar);

    recalcularTotal();
}

// ============================================
// TOTAL FINAL
// ============================================
const contador = document.createElement("div");
contador.classList.add("contador");

const totalTexto = document.createElement("p");
totalTexto.classList.add("total");
totalTexto.textContent = "TOTAL";

const precioTotal = document.createElement("p");
precioTotal.classList.add("precio-total");
precioTotal.textContent = "0";

contador.appendChild(totalTexto);
contador.appendChild(precioTotal);

const botonComprar = document.createElement("button");
botonComprar.classList.add("comprar");
botonComprar.textContent = "Comprar";


botonComprar.addEventListener("click", () => {
    // Cargar carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    //muestra mensaje si eliminas todos los articulos del carro
    if (carrito.length === 0) {
        alert("No hay productos para comprar");
        return;
    }

    let mensaje = "🧾 FACTURA DE COMPRA\n------------------------\n";
    let totalFinal = 0;

    carrito.forEach(item => {
        const producto = listaPatitos.find(p => p.id === item.id);
        if (!producto) return;

        const nombre = producto.nombre;
        const cantidad = item.compras;
        const precio = producto.precio;
        const subtotal = precio * cantidad;

        totalFinal += subtotal;

        // RESTAR stock
        producto.stock -= cantidad;

        mensaje += `
🐤 ${nombre}
   Cantidad: ${cantidad}
   Precio unitario: ${precio}${producto.moneda}
   Subtotal: ${subtotal}${producto.moneda}
`;

        // Reset compras para vaciar el carrito
        producto.compras = 0;
    });

    mensaje += "------------------------\n";
    mensaje += `💰 TOTAL FINAL: ${totalFinal}€`;

    // Mostrar la factura
    alert(mensaje);

    // Vaciar carrito en localStorage
    localStorage.removeItem("carrito");
    localStorage.setItem("cartCount", 0); // actualizar contador global

    // Actualizar la interfaz del botón flotante
    const cartCountEl = document.getElementById("cart-count");
    const cartWrapper = document.querySelector(".cart-wrapper");
    if (cartCountEl) cartCountEl.textContent = 0;
    if (cartWrapper) cartWrapper.classList.add("hidden");

    // Redirigir a la página principal
    window.location.href = "../index.html";
});



// ============================================
// FUNCION RECALCULAR TOTAL
// ============================================
function recalcularTotal() {
    let total = 0;
    let moneda = "€"; // valor por defecto

    const subtotales = document.querySelectorAll(".valor-subtotal");

    if (subtotales.length > 0) {
        // Tomamos la moneda del primer producto visible
        const firstPatito = listaPatitos.find(p => p.compras > 0);
        moneda = firstPatito ? firstPatito.moneda : "€";
    }

    subtotales.forEach(td => {
        const valor = parseFloat(td.textContent.replace(/[^0-9.]/g, ""));
        total += valor;
    });

    precioTotal.textContent = `${total}${moneda}`;
}


// ================================
// CARGAR CARRITO DESDE LOCALSTORAGE
// ================================
const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

carritoGuardado.forEach(item => {
    const patito = listaPatitos.find(p => p.id === item.id);
    if (patito) {
        patito.compras = item.compras;
    }
});


// ============================================
// RENDER INICIAL
// ============================================
renderCarrito();

// ================================
// GUARDAR CARRITO
// ================================
function guardarCarrito() {
    const datos = listaPatitos
        .filter(p => p.compras > 0)
        .map(p => ({ id: p.id, compras: p.compras }));

    localStorage.setItem("carrito", JSON.stringify(datos));
}