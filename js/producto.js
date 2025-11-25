import {listaPatitos} from '../js/lista-patitos.js';
const urlParams = new URLSearchParams(window.location.search);

const duckId = parseInt(urlParams.get('id'));
const duckTitle = document.getElementById('duckTitle');
const duckPrice = document.getElementById('duckPrice');
const duckImage = document.getElementById('duckImage');
const duckDescription = document.getElementById('duckDescription');
const ratingStars = document.getElementById('ratingStars'); 
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

duckTitle.textContent = duck.nombre;
duckPrice.textContent = duck.precio + duck.moneda;
duckImage.src = duck.photo;
duckImage.alt = "imagen de "+ duck.nombre;
duckRol.textContent = duck.rol;
duckDescription.textContent = duck.historia;
ratingStars.src = `../assets/images/estrellitas ${duck.estrellas}.PNG`;
ratingStars.alt = `Imagen de ${duck.estrellas} estrellas`;
duckStock.textContent = `Stock: ${duck.stock}`;