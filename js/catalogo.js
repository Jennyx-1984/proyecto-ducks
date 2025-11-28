import { listaPatitos } from "./lista-patitos.js"

// función para renderizar patitos (sin añadir la clase "movimiento" aquí)
function patitosARenderizar(list){
    const parent = document.querySelector(".lista");
    parent.innerHTML = '';

    list.forEach(patito => {
        const newFrame = document.createElement("div");
        newFrame.classList.add("cuadros");

        const newDetails = document.createElement("div");
        newDetails.classList.add("detailles");

        const listEstrellas = document.createElement("div");
        listEstrellas.classList.add("estrellas");

        const newPhoto = document.createElement("img");
        newPhoto.classList.add("patitos");
        newPhoto.src = patito.photo;
        newPhoto.alt = patito.nombre;

        const newNombre = document.createElement("p");
        newNombre.classList.add("nombrePatito");
        newNombre.textContent = patito.nombre;

        for (let i = 1; i <= patito.estrellas; i++) {
            const newEstrellas = document.createElement("img");
            newEstrellas.classList.add("stars");
            newEstrellas.src = "../assets/images/star.png";
            newEstrellas.alt = patito.estrellas + " estrellas";
            listEstrellas.appendChild(newEstrellas);
        }

        const newPrecio = document.createElement("p");
        newPrecio.classList.add("precio");
        newPrecio.textContent = patito.precio + patito.moneda;

        const newRol = document.createElement("p");
        newRol.classList.add("rol");
        newRol.textContent = patito.rol;

        const buttonCompra = document.createElement("button");
        buttonCompra.classList.add("boton-compra");
        buttonCompra.textContent = "Comprar";
        buttonCompra.addEventListener("click", () => {
            window.location.href = `producto.html?id=${patito.id}`;
        });

        // montaje DOM
        parent.appendChild(newFrame);
        newFrame.appendChild(newPhoto);
        newFrame.appendChild(newDetails);
        newDetails.appendChild(newNombre);
        newDetails.appendChild(listEstrellas);
        newDetails.appendChild(newPrecio);
        newDetails.appendChild(newRol);
        newDetails.appendChild(buttonCompra);
    });
}

// función para aplicar filtro y animar
function applyFilter(categoria) {
    let filteredList;

    if (categoria === 'Todo') {
        filteredList = listaPatitos;
    } else {
        filteredList = listaPatitos.filter(patito => patito.categoria === categoria);
    }

    patitosARenderizar(filteredList);

    requestAnimationFrame(() => {
        const cuadros = document.querySelectorAll(".cuadros");
        console.log("Cuadros encontrados:", cuadros.length);

        cuadros.forEach((cuadro, i) => {
            cuadro.classList.remove("movimiento");
            void cuadro.offsetWidth;
            setTimeout(() => {
                cuadro.classList.add("movimiento");
            }, i * 80 + 20);
        });
    });
}

// inicialización
document.addEventListener('DOMContentLoaded', () => {
    patitosARenderizar(listaPatitos);
    applyFilter('Todo'); 
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

