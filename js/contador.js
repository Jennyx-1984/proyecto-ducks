let contador= 0;

const botonmenos= document.getElementById("botondisminuir");
const botonmas= document.getElementById("botonincrementar");
const quantity= document.getElementById("contador")

botonmas.addEventListener("click", () => {
    contador ++;
    quantity.textContent=contador
})

botonmenos.addEventListener("click",() => {
    if (contador>0) {
        contador--;
        quantity.textContent=contador
    }
})
