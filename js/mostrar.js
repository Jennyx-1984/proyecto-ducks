let boton1=document.querySelector(".boton1");
let texto1=document.querySelectorAll(".texto-largo1");
let boton2=document.querySelector(".boton2");
let texto2=document.querySelectorAll(".texto-largo2");


boton1.addEventListener("click",()=>{
    boton1.style.display="block";
    texto1.forEach(texto => {
        if (texto.style.display === "none" || texto.style.display === "") {
            texto.style.display = "inline";
            boton1.innerHTML = "Mostrar menos";
        } else {
            texto.style.display = "none";
            boton1.innerHTML = "Mostrar más";
        }
     });
});


boton2.addEventListener("click",()=>{
    texto2.forEach(texto=>{
        if(texto.style.display==="none" || texto.style.display === ""){
            texto.style.display ="inline";
            boton2.innerHTML = "Mostrar menos";
        }else{
            texto.style.display = "none";
            boton2.innerHTML ="Mostrar más";
        }
    })
    
    
})