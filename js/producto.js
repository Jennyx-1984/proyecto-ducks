import {listaPatitos} from '../js/lista-patitos.js';
import { addToCart } from './boton-cart.js';
const urlParams = new URLSearchParams(window.location.search);

const duckId = parseInt(urlParams.get('id'));
const duckTitle = document.getElementById('duckTitle');
const duckPrice = document.getElementById('duckPrice');
const duckImage = document.getElementById('duckImage');
const duckDescription = document.getElementById('duckDescription');
const duckStock = document.getElementById('stock');
let listaPatitos = [{}];
let patito = 
    {nombre: "Patito 1",
     estrellas: 5, 
     precio: 15, 
     moneda: "€",
     rol: "Para problemas de HTML",
     image: "../assets/images/black_duck.jpg",
    description:"patopatoso",
    stock: 26};


const duckInfo = function(patito){
    for (let id of listaPatitos){
    if (id.nombre == patito.nombre){
        return patito;
        }else{
         let lostPatito = {
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