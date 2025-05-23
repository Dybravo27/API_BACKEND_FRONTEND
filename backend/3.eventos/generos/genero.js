import { agregaraDB, limpiar, validar, validarMinimo } from "../modulo/modulo.js";
import { crearTablaGeneros } from "./cargaDatos.js";

const generos=await get("generos")
crearTablaGeneros(["ID","Lenguaje"],generos.data)

const formulario=document.querySelector("form");
const nombre_genero=document.querySelector('[name="genero"]');

formulario.addEventListener('submit',(event)=>{agregaraDB(event,"generos")});
nombre_genero.addEventListener('blur',limpiar)
nombre_genero.addEventListener('blur',validarMinimo)