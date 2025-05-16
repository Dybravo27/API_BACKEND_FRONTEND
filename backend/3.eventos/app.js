import { validar } from "./modulo.js";
// const btn =document.querySelector('#btn_validar');
const formulario = document.querySelector("form");
const nombre = document.querySelector('[name="Nombre"]');
const apellido = document.querySelector('[name="Apellido"]');
const telefono = document.querySelector('[name="Telefono"]');
const documento = document.querySelector('[name="Documento"]');
const usuario = document.querySelector('[name="Usuario"]');
const contrasena = document.querySelector('[name="Contrasena"]');
const politicas = document.querySelector("#politicas");
const boton = document.querySelector("#btn_validar");
const ciudad = document.querySelector("#ciudad");
const radios = document.querySelector('[name="generos"]');

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

const validar_let = (event) => {
  let tecla = event.key;
  const letras = /[a-zñáéíóú\s]/i;
  if (!letras.test(tecla)) {
    event.preventDefault();
  }
};

const validar_num = (event) => {
  let tecla = event.key;
  const numeros = /[0-9]/;

  if (!numeros.test(tecla) && tecla != "Backspace") {
    event.preventDefault();
  }
};

const validCienCaract = (event) => {
  if (event.target.value.length == 100 && event.key != "Backspace") {
    event.preventDefault();
  }
};

const validCincuentCaract = (event) => {
  if (event.target.value.length == 50 && event.key != "Backspace") {
    event.preventDefault();
  }
};

const validDiezCarac = (event) => {
  if (event.target.value.length == 10 && event.key != "Backspace") {
    event.preventDefault();
  }
};

const limpiar = (event) => {
  if (event.target.value !== "" && event.target.selectedIndex != 0) {
    event.target.classList.remove("border-red");
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.remove();
    }
  }
};

const confirmado = () => {
  if (!politicas.checked) {
    boton.setAttribute("disabled", "");
  } else {
    boton.removeAttribute("disabled");
  }
};

//Eventos
addEventListener("DOMContentLoaded", confirmado);

politicas.addEventListener("change", confirmado);

// const isValid=(e)=>{
//   let data=esValido(e)
//   console.log(data);

// }

formulario.addEventListener("submit", validar);
// formulario.addEventListener('submit',isValid);

nombre.addEventListener("keydown", validar_let);
nombre.addEventListener("keydown", validCincuentCaract);
apellido.addEventListener("keydown", validar_let);
apellido.addEventListener("keydown", validCincuentCaract);
telefono.addEventListener("keydown", validar_num);
telefono.addEventListener("keydown", validDiezCarac);
documento.addEventListener("keydown", validar_num);
documento.addEventListener("keydown", validDiezCarac);
usuario.addEventListener("keydown", validCienCaract);
contrasena.addEventListener("keydown", validCienCaract);
nombre.addEventListener("blur", limpiar);
apellido.addEventListener("blur", limpiar);
telefono.addEventListener("blur", limpiar);
documento.addEventListener("blur", limpiar);
usuario.addEventListener("blur", limpiar);
contrasena.addEventListener("blur", limpiar);
ciudad.addEventListener("blur", limpiar);






// nombre.addEventListener("keydown", (event) => {
//   let pal = event.target.value;
//   if (pal.length >= 10 && event.key != "Backspace") {
//     event.preventDefault();
//   }
// });
