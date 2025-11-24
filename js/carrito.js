import { listaPatitos } from "./catalogo.js";

// Seleccionamos el contenedor del carrito
const carrito = document.querySelector(".carrito");

// Limpiamos el contenido que tiene por defecto
carrito.innerHTML = "";

// Recorremos y creamos cada patito
listaPatitos.forEach(patito => {

    // === ARTICLE ===
    const articulo = document.createElement("article");

    // Imagen del patito
    const img = document.createElement("img");
    img.classList.add("imagen-articulo");
    img.src = "../assets/images/black-duck.jpg";  // Cambia si quieres imágenes distintas
    img.alt = patito.nombre;

    // Contenedor info
    const info = document.createElement("div");
    info.classList.add("info-articulo");

    // ===== Nombre y rol =====
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

    // ===== Cantidad =====
    const cantidadCont = document.createElement("div");
    cantidadCont.classList.add("cantidad-articulo");

    const tituloCantidad = document.createElement("p");
    tituloCantidad.classList.add("titulo-cantidad");
    tituloCantidad.textContent = "Cantidad";

    const botones = document.createElement("div");
    botones.classList.add("triple-boton");

    const btnMenos = document.createElement("button");
    //btnMenos.textContent = "-";
    btnMenos.innerHTML='<button class="botonmenos">-</button>';

    const campo = document.createElement("div");
    campo.classList.add("campo-vacio");
    campo.textContent = "1";

    const btnMas = document.createElement("button");
    btnMas.innerHTML = '<button class="botonmenos">+</button>';

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "submit";
    const icono = document.createElement("img");
    icono.src = "../assets/images/iconos/papelera.png";
    icono.classList.add("papelera");
    btnEliminar.appendChild(icono);

    botones.appendChild(btnMenos);
    botones.appendChild(campo);
    botones.appendChild(btnMas);
    botones.appendChild(btnEliminar);

    cantidadCont.appendChild(tituloCantidad);
    cantidadCont.appendChild(botones);

    // ===== Precio =====
    const precioCont = document.createElement("div");
    precioCont.classList.add("info-precio");

    const tabla = document.createElement("table");

    const filaPrecio = document.createElement("tr");
    filaPrecio.classList.add("precio");
    filaPrecio.innerHTML = `
        <td>Precio</td>
        <td>${patito.moneda}${patito.precio}</td>
    `;

    const filaSubtotal = document.createElement("tr");
    filaSubtotal.classList.add("precio-subtotal");
    filaSubtotal.innerHTML = `
        <td>Subtotal</td>
        <td>${patito.moneda}${patito.precio}</td>
    `;

    tabla.appendChild(filaPrecio);
    tabla.appendChild(filaSubtotal);
    precioCont.appendChild(tabla);

    // ===== Juntar toda la info =====
    info.appendChild(nombreCont);
    info.appendChild(cantidadCont);
    info.appendChild(precioCont);

    articulo.appendChild(img);
    articulo.appendChild(info);

    // Insertar artículo en el carrito
    carrito.appendChild(articulo);
});
