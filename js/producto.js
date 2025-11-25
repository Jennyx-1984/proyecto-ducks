import {listaPatitos} from '../js/lista-patitos.js';
import { addToCart } from './boton-cart.js';
const urlParams = new URLSearchParams(window.location.search);

const duckId = parseInt(urlParams.get('id'));
const duckTitle = document.getElementById('duckTitle');
const duckPrice = document.getElementById('duckPrice');
const duckImage = document.getElementById('duckImage');
const duckDescription = document.getElementById('duckDescription');
const duckStock = document.getElementById('stock');
const duckRol = document.getElementById('duckRol');

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


//añadido

// Obtener elementos
const botonComprar = document.getElementById("compra");
const amount = document.getElementById("contador");

/*botonComprar.addEventListener("click", () => {

    // Convertir el contenido del div en número
    const cantidad = parseInt(amount.textContent.trim()) || 1;

    const item = {
        id: duck.id,
        compras: cantidad
    };

    // Leer carrito actual
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si ya existe
    const existente = carrito.find(p => p.id === duck.id);

    if (existente) {
        existente.compras = cantidad; //actualizar cantidad
    } else {
        carrito.push(item); //añadir nuevo
    }

    // Guardar
    localStorage.setItem("carrito", JSON.stringify(carrito));

});*/

botonComprar.addEventListener("click", () => {

    const cantidad = parseInt(amount.textContent.trim()) || 1;

    const item = {
        id: duck.id,
        compras: cantidad
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(p => p.id === duck.id);

    if (existente) {
        existente.compras = cantidad;
    } else {
        carrito.push(item);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log("Guardado:", carrito);
});
