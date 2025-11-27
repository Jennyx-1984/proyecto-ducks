const boton1=document.querySelector(".boton1");
const texto1=document.querySelector(".texto-largo1");

boton1.addEventListener("click", () =>{

    const seEstaViendoElTexto = texto1.style.display==="block";

    if (seEstaViendoElTexto) {
        texto1.style.display = "none"; // esto significa que el texto 1 es invisible
        boton1.innerHTML = "Mostrar mas"; // le cambio el html del boton
       // boton1.classList.add("nuevomover");
    }
    else {
        texto1.style.display = "block";
        boton1.innerHTML = "Mostrar menos";
       // boton1.classList.add("nuevomover");
    }


    //const mostrartexto1=texto1.style.display==="block";
    //texto1.style.display= mostrartexto1 ? "none":"block";
    //boton1.classList.toggle("mostrar",! mostrartexto1)
})

const boton2=document.querySelector(".boton2");
const texto2=document.querySelector(".texto-largo2");

boton2.addEventListener("click", () => {
    const seEstaViendoElTexto2= texto2.style.display === "block";
    if (seEstaViendoElTexto2) {
        texto2.style.display="none";
        boton2.innerHTML="Mostrar más";
    } 
    else{
        texto2.style.display="block";
        boton2.innerHTML="Mostrar menos";
    }
})