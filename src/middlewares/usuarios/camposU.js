export const campos = [
  { name: "nombre", required: true, minLength: 5, maxLength: 50 },
  { name: "apellido", required: true, minLength: 5, maxLength: 50 },
  { name: "telefono", required: true, type: "number", minLength: 10, maxLength: 10 },
  { name: "documento", required: true, type: "number", minLength: 10, maxLength: 10 },
  { name: "usuario", required: true, minLength: 6, maxLength: 100 },
  { name: "contrasena", required: true, minLength: 6, maxLength: 100 },
  { name: "id_ciudad", required: true, type: "number", minLength: 1, maxLength: 11 },
  { name: "id_genero", required: true, type: "number", minLength: 1, maxLength: 11 },
];