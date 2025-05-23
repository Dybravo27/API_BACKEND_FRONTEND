import { get, put } from "../api.js";
import { limpiar, validar, validarMinimo } from "../modulo/modulo.js";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const formulario=document.querySelector("form");
const nombre_ciudad=document.querySelector('[name="lenguaje"]');

const ciu=await get("ciudades/"+id)
const ciudad=ciu.data;

nombre_ciudad.value=ciudad.ciudad;

formulario.addEventListener('submit',async(event)=>{
    const info=await validar(event);
    if(info!=false){
        const respuesta=await put(`ciudades/${id}`,info)
        console.log(respuesta);
    }
})

nombre_ciudad.addEventListener("blur",limpiar);
nombre_ciudad.addEventListener("blur", validarMinimo)