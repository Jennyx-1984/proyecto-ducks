import { listaPatitos } from "./lista-patitos.js"

let parent =document.querySelector(".lista");

listaPatitos.forEach(patito => {
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

    //buttonCompra.setAttribute("click", ()=> {window.location.href= `producto.html?id=${productoId}`; });
   
    //buttonCompra.click(function(){
    //    window.location.href= `producto.html?id=${productoId}`
    //});

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