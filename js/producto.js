//import {listaPatitos} from './catalogo.js';
const duckTitle = document.getElementById('duckTitle');
const duckPrice = document.getElementById('duckPrice');
const duckImage = document.getElementById('duckImage');
const duckDescription = document.getElementById('duckDescription');
const ratingStars = document.getElementById('ratingStars'); 
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
        image: "../assets/images/patitopatoso.png",
        description: "patopatoso",
        stock: 0
    }
    return lostPatito;
}
}
}

let duck = duckInfo(patito);
duckTitle.textContent = duck.nombre;
duckPrice.textContent = duck.precio + duck.moneda;
duckImage.src = duck.image;
duckImage.alt = "imagen de "+ duck.nombre;
duckDescription.textContent = duck.description;
ratingStars.src = `../assets/images/estrellitas ${duck.estrellas}.PNG`;
ratingStars.alt = `Imagen de ${duck.estrellas} estrellas`;
duckStock.textContent = `Stock: ${duck.stock}`;