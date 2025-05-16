import { validarMaximo, limpiar, limpiarChecboxs, limpiarRadios, validar, validarLetras, validarNumeros, validarMinimo, validarContraseniaMensaje } from "../modulo/modulo.js";
// const btn =document.querySelector('#btn_validar');

// const formulario = document.querySelector("form");
// const nombre_usuario = document.querySelector('[name="Nombre"]');
// const apellido_usuario = document.querySelector('[name="Apellido"]');
// const telefono = document.querySelector('[name="Telefono"]');
// const documento = document.querySelector('[name="Documento"]');
// const usuario = document.querySelector('[name="Usuario"]');
// const contrasenia_usuario = document.querySelector('[name="Contrasena"]');
// const politicas = document.querySelector("#politicas");
// const boton = document.querySelector("#btn_validar");
// const ciudad_usuario = document.querySelector("#ciudad");
// const radios_genero = document.querySelector('[name="generos"]');
// const cheboxs_lenguajes=document.querySelectorAll('[name="lenguaje"]')

const formulario=document.querySelector("form");
const documento_usuario=document.querySelector('[name="documento"]');
const nombre_usuario=document.querySelector('[name="nombre"]');
const apellido_usuario=document.querySelector('[name="apellido"]');
const telefono_usuario=document.querySelector('#telefono');
const constrasenia_usuario=document.querySelector('[name="contrasenia"]')
const ciudad_usuario=document.querySelector('[name="ciudad"]')
const radios_genero=document.querySelectorAll('[name="genero"]')
const cheboxs_lenguajes=document.querySelectorAll('[name="lenguaje"]')

// const validar=(event) => {
//     if (nombre.value == "") {
//       if (nombre.nextElementSibling) {
//         nombre.nextElementSibling.remove();}

//       if (event.target.value.length>=10) {
//         event.preventDefault();
//       }

//       nombre.style.border="2px solid red";
//       nombre.classList.add('error');
//       const span=document.createElement('span');
//       span.textContent= 'el campo de nombre es obligatorio';

//       nombre.insertAdjacentElement('afterend',span);
//       nombre.focus();
//       event.preventDefault();

//     } if(apellido.value==""){
//       if (apellido.nextElementSibling) {
//         apellido.nextElementSibling.remove();}

//       apellido.style.border="2px solid red";
//       apellido.classList.add('error');
//       const span=document.createElement('span');
//       span.textContent= 'el campo de apellido es obligatorio';
//       apellido.insertAdjacentElement('afterend',span);
//       apellido.focus();
//       event.preventDefault();

//     }if(telefono.value==""){
//       if (telefono.nextElementSibling) {
//       telefono.nextElementSibling.remove();}

//       telefono.style.border="2px solid red";
//       telefono.classList.add('error');
//       const span=document.createElement('span');
//       span.textContent= 'el campo de telefono es obligatorio';
//       telefono.insertAdjacentElement('afterend',span);
//       telefono.focus();
//       event.preventDefault();

//     } if(documento.value==""){
//       if (documento.nextElementSibling) {
//         documento.nextElementSibling.remove();}

//       documento.style.border="2px solid red";
//       documento.classList.add('error');
//       const span=document.createElement('span');
//       span.textContent= 'el campo de documento es obligatorio';
//       documento.insertAdjacentElement('afterend',span);
//       documento.focus();
//       event.preventDefault();
//     }if(usuario.value==""){
//       if (usuario.nextElementSibling) {
//         usuario.nextElementSibling.remove();}

//       usuario.style.border="2px solid red";
//       usuario.classList.add('error');
//       const span=document.createElement('span');
//       span.textContent= 'el campo de usuario es obligatorio';
//       usuario.insertAdjacentElement('afterend',span);
//       usuario.focus();
//       event.preventDefault();
//     }if(contrasena.value==""){

//       if (contrasena.nextElementSibling) {
//         contrasena.nextElementSibling.remove();}
//       contrasena.style.border="2px solid red";
//       contrasena.classList.add('error');
//       const span=document.createElement('span');
//       span.textContent= 'el campo de contraseña es obligatorio';
//       contrasena.insertAdjacentElement('afterend',span);
//       contrasena.focus();
//       event.preventDefault();
//     }
//   }
formulario.addEventListener('submit',validar)
documento_usuario.addEventListener('keydown',validarNumeros);
nombre_usuario.addEventListener('keydown',validarLetras);
apellido_usuario.addEventListener('keydown',validarLetras);
telefono_usuario.addEventListener('keydown',validarNumeros);
documento_usuario.addEventListener('blur',limpiar)
nombre_usuario.addEventListener('blur',limpiar)
apellido_usuario.addEventListener('blur',limpiar)
telefono_usuario.addEventListener('blur',limpiar)
constrasenia_usuario.addEventListener('blur',limpiar)
ciudad_usuario.addEventListener('blur',limpiar)
radios_genero.forEach(radio => {
    radio.addEventListener('change',limpiarRadios)
});
cheboxs_lenguajes.forEach(chec=>{
    chec.addEventListener('change',limpiarChecboxs)
})
telefono_usuario.addEventListener('keydown',validarMaximo)
telefono_usuario.addEventListener('blur',validarMinimo)
documento_usuario.addEventListener('blur',validarMinimo)
nombre_usuario.addEventListener('blur',validarMinimo);
apellido_usuario.addEventListener('blur',validarMinimo)
constrasenia_usuario.addEventListener('blur',validarContraseniaMensaje)

// const validar_let = (event) => {
//   let tecla = event.key;
//   const letras = /[a-zñáéíóú\s]/i;
//   if (!letras.test(tecla)) {
//     event.preventDefault();
//   }
// };

// const validar_num = (event) => {
//   let tecla = event.key;
//   const numeros = /[0-9]/;

//   if (!numeros.test(tecla) && tecla != "Backspace") {
//     event.preventDefault();
//   }
// };

// const validCienCaract = (event) => {
//   if (event.target.value.length == 100 && event.key != "Backspace") {
//     event.preventDefault();
//   }
// };

// const validCincuentCaract = (event) => {
//   if (event.target.value.length == 50 && event.key != "Backspace") {
//     event.preventDefault();
//   }
// };

// const validDiezCarac = (event) => {
//   if (event.target.value.length == 10 && event.key != "Backspace") {
//     event.preventDefault();
//   }
// };

// const limpiar = (event) => {
//   if (event.target.value !== "" && event.target.selectedIndex != 0) {
//     event.target.classList.remove("border-red");
//     if (event.target.nextElementSibling) {
//       event.target.nextElementSibling.remove();
//     }
//   }
// };

// const confirmado = () => {
//   if (!politicas.checked) {
//     boton.setAttribute("disabled", "");
//   } else {
//     boton.removeAttribute("disabled");
//   }
// };

// //Eventos
// addEventListener("DOMContentLoaded", confirmado);

// politicas.addEventListener("change", confirmado);

// const isValid=(e)=>{
//   let data=esValido(e)
//   console.log(data);

// }

// formulario.addEventListener("submit", validar);
// formulario.addEventListener('submit',isValid);

// nombre.addEventListener("keydown", validar_let);
// nombre.addEventListener("keydown", validCincuentCaract);
// apellido.addEventListener("keydown", validar_let);
// apellido.addEventListener("keydown", validCincuentCaract);
// telefono.addEventListener("keydown", validar_num);
// telefono.addEventListener("keydown", validDiezCarac);
// documento.addEventListener("keydown", validar_num);
// documento.addEventListener("keydown", validDiezCarac);
// usuario.addEventListener("keydown", validCienCaract);
// contrasena.addEventListener("keydown", validCienCaract);
// nombre.addEventListener("blur", limpiar);
// apellido.addEventListener("blur", limpiar);
// telefono.addEventListener("blur", limpiar);
// documento.addEventListener("blur", limpiar);
// usuario.addEventListener("blur", limpiar);
// contrasena.addEventListener("blur", limpiar);
// ciudad.addEventListener("blur", limpiar);






// nombre.addEventListener("keydown", (event) => {
//   let pal = event.target.value;
//   if (pal.length >= 10 && event.key != "Backspace") {
//     event.preventDefault();
//   }
// });
