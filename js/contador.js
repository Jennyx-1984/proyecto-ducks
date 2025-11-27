import {duck} from "./producto.js"

let contador= 0;

const botonmenos= document.getElementById("botondisminuir");
const botonmas= document.getElementById("botonincrementar");
const quantity= document.getElementById("contador")
console.log(duck)

let nstock= duck.stock;

if (nstock) {
    console.log(nstock) 
} else {
    alert("Sin stock")
}


botonmas.addEventListener("click", () => {
    if(contador < nstock){
    contador ++;
    quantity.textContent=contador
   } else{
    alert("Sin stock");
   }
}, )

botonmenos.addEventListener("click",() => {
    if (contador>0) {
        contador--;
        quantity.textContent=contador
    } else{
        alert("Ingrese una cantitad");
    }
})