import { listaPatitos } from "./lista-patitos.js"

//funcion para renderizar patitos
function patitosARenderizar(list){
    let parent =document.querySelector(".lista");
    parent.innerHTML = '';
    list.forEach(patito => {
    let newFrame = document.createElement("div")
    newFrame.classList.add("cuadros");
    let newDetails = document.createElement("div");
    newDetails.classList.add("detailles");
    let listEstrellas = document.createElement("div");
    listEstrellas.classList.add("estrellas");
    let newPhoto = document.createElement("img");
    newPhoto.classList.add("patitos");
    newPhoto.src = patito.photo;
    newPhoto.alt = patito.nombre;
    let newNombre = document.createElement("p");
    newNombre.classList.add("nombrePatito");
    newNombre.textContent = patito.nombre;
    for (let i = 1; i <= patito.estrellas; i++) {
        let newEstrellas = document.createElement("img");
        newEstrellas.classList.add("stars");
        newEstrellas.src = "../assets/images/star.png";
        newEstrellas.alt = patito.estrellas + " estrellas";
        listEstrellas.appendChild(newEstrellas);
    };
    let newPrecio = document.createElement("p");
    newPrecio.classList.add("precio");
    newPrecio.textContent = patito.precio + patito.moneda;
    let newRol = document.createElement("p");
    newRol.classList.add("rol");
    newRol.textContent = patito.rol;
    let buttonCompra = document.createElement("button");
    buttonCompra.classList.add("boton-compra");
    buttonCompra.textContent = "Comprar";

    function clickToCompra(){
        window.location.href= `producto.html?id=${patito.id}`;
    };
    buttonCompra.addEventListener("click", clickToCompra);

    parent.appendChild(newFrame);
    newFrame.appendChild(newPhoto);
    newFrame.appendChild(newDetails);
    newDetails.appendChild(newNombre);
    newDetails.appendChild(listEstrellas);
    newDetails.appendChild(newPrecio);
    newDetails.appendChild(newRol);
    newDetails.appendChild(buttonCompra);
   
    })
}
//funcion filtro
function applyFilter(categoria) {
    let filteredList;
    if (categoria === 'Todo'){
        filteredList = listaPatitos;
    } else {
        filteredList = listaPatitos.filter(patito => patito.categoria === categoria);
    }
    patitosARenderizar (filteredList);
}


//filtro
document.addEventListener('DOMContentLoaded', () => {

patitosARenderizar(listaPatitos);

const filterSelect = document.getElementById("filter");
const categorias = [... new Set(listaPatitos.map(patito => patito.categoria))];
categorias.unshift('Todo');
const optionsHTML = categorias.map(c => `<option value="${c}">${c}</option>`).join('');
filterSelect.innerHTML = optionsHTML;

filterSelect.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    applyFilter(selectedCategory); 
    
});
});

