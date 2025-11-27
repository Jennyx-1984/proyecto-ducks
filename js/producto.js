import { listaPatitos } from '../js/lista-patitos.js';
import { addToCart } from './boton-cart.js';

const urlParams = new URLSearchParams(window.location.search);

const duckId = parseInt(urlParams.get('id'));
const duckTitle = document.getElementById('duckTitle');
const duckPrice = document.getElementById('duckPrice');
const duckImage = document.getElementById('duckImage');
const duckDescription = document.getElementById('duckDescription');
const duckStock = document.getElementById('stock');
const duckRol = document.getElementById('duckRol');
const amount = document.getElementById("contador");
const botonComprar = document.getElementById("compra");
const lostPatito = {
        photo: "../assets/images/patitopatoso.png",
        nombre: "Patito Perdido",
        estrellas: 0,
        precio: 0,
        moneda: "€",
        rol: "No disponible",
        stock: 0,
        historia: "Lo sentimos, el patito que buscas no se encuentra en nuestro catálogo. Por favor, regresa a la página principal para explorar nuestros productos disponibles."
    };

    
const possibleDuck = listaPatitos.find((patito) => {
    return patito.id === duckId;
      });

const duck = possibleDuck ? possibleDuck : lostPatito;
const patitoActual = listaPatitos.find(p => p.id === duckId) || lostPatito;

let parent =document.querySelector(".puntuacion-stock");
let listEstrellas = document.createElement("div");
    listEstrellas.classList.add("estrellas");

for (let i = 1; i <= duck.estrellas; i++) {
        let newEstrellas = document.createElement("img");
        newEstrellas.classList.add("stars");
        newEstrellas.src = "../assets/images/star.png";
        newEstrellas.alt = duck.estrellas + " estrellas";
        listEstrellas.appendChild(newEstrellas);
    };

duckTitle.textContent = duck.nombre;
duckPrice.textContent = duck.precio + duck.moneda;
duckImage.src = duck.photo;
duckImage.alt = "imagen de "+ duck.nombre;
parent.prepend(listEstrellas);
duckRol.textContent = duck.rol;
duckDescription.textContent = duck.historia;
duckStock.textContent = `Stock: ${duck.stock}`;

// Cargar stock guardado
let stockGuardado = JSON.parse(localStorage.getItem("stockPatitos")) || [];
const guardado = stockGuardado.find(p => p.id === duckId);
if (guardado) patitoActual.stock = guardado.stock;
duckStock.textContent = `Stock: ${patitoActual.stock}`;

// Inicializar cantidad
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
amount.textContent = 1; // siempre iniciar en 1

// + / - contador
document.getElementById("botonIncrementar")?.addEventListener("click", () => {
    let cant = parseInt(amount.textContent);
    if (cant < patitoActual.stock) amount.textContent = cant + 1;
    else alert("No hay más stock disponible");
});

document.getElementById("botonDisminuir")?.addEventListener("click", () => {
    let cant = parseInt(amount.textContent);
    if (cant > 1) amount.textContent = cant - 1;
});

// Botón comprar
botonComprar?.addEventListener("click", () => {
    let cantidad = parseInt(amount.textContent);

    if (cantidad > patitoActual.stock) {
        alert(`Solo quedan ${patitoActual.stock} patitos disponibles`);
        return;
    }

    // Actualizar stock local
    patitoActual.stock -= cantidad;
    duckStock.textContent = `Stock: ${patitoActual.stock}`;

    // Acumular cantidad en cartItems
    cartItems[duckId] = (cartItems[duckId] || 0) + cantidad;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Actualizar contador global
    const totalCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
    localStorage.setItem("cartCount", totalCount);

    // Actualizar botón flotante
    addToCart(0, 0); // solo refresca UI sin cambiar cantidades

    alert(`${cantidad} patito(s) añadido(s) al carrito`);

    // Resetear cantidad visible
    amount.textContent = 1;
});
export { duck };
