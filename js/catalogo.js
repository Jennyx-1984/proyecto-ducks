import { listaPatitos } from "./lista-patitos.js"

// función para renderizar patitos (sin añadir la clase "movimiento" aquí)
function patitosARenderizar(list){
    const parent = document.querySelector(".lista");
    parent.innerHTML = '';

    list.forEach(patito => {
        const newFrame = document.createElement("div");
        newFrame.classList.add("cuadros"); // NO añadimos "movimiento" aquí

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

// función para aplicar filtro y animar (correcta)
function applyFilter(categoria) {
    let filteredList;

    if (categoria === 'Todo') {
        filteredList = listaPatitos;
    } else {
        filteredList = listaPatitos.filter(patito => patito.categoria === categoria);
    }

    // renderizamos primero
    patitosARenderizar(filteredList);

    // pequeña espera para asegurar que los elementos estén en DOM y pintados
    // y que el navegador reconozca estado inicial (sin .movimiento)
    requestAnimationFrame(() => {
        const cuadros = document.querySelectorAll(".cuadros");
        console.log("Cuadros encontrados:", cuadros.length);

        cuadros.forEach((cuadro, i) => {
            // aseguramos que no tenga la clase antes
            cuadro.classList.remove("movimiento");

            // forzamos reflow para resetear animación (opcional pero útil)
            void cuadro.offsetWidth;

            // agregamos la clase en el siguiente frame con delay escalonado
            setTimeout(() => {
                cuadro.classList.add("movimiento");
            }, i * 80 + 20); // 80ms por card, +20ms offset
        });
    });
}

// inicialización
document.addEventListener('DOMContentLoaded', () => {
    // render inicial
    patitosARenderizar(listaPatitos);

    // animar el primer render (opcional)
    applyFilter('Todo'); // llama al filtro para que también haga la animación en la carga

    // construir select
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

