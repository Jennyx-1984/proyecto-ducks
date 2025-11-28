const boton1=document.querySelector(".boton1");
const texto1=document.querySelector(".texto-largo1");

boton1.addEventListener("click", () =>{

    const seEstaViendoElTexto = texto1.style.display==="block";

    if (seEstaViendoElTexto) {
        texto1.style.display = "none"; 
        boton1.innerHTML = "Mostrar mas"; 
    }
    else {
        texto1.style.display = "block";
        boton1.innerHTML = "Mostrar menos";
    }
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