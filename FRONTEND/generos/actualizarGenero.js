import { get, put } from "../api.js";
import { limpiar, validar, validarMinimo } from "../modulo/modulo.js";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const formulario=document.querySelector("form");
const nombre_genero=document.querySelector('[name="genero"]');

const gen=await get("generos/"+id)
const genero=gen.data;

nombre_genero.value=genero.genero;

formulario.addEventListener('submit',async(event)=>{
    const info=await validar(event);
    if(info!=false){
        const respuesta=await put(`generos/${id}`,info)
        console.log(respuesta);
    }
})

nombre_genero.addEventListener("blur",limpiar);
nombre_genero.addEventListener("blur",validarMinimo)