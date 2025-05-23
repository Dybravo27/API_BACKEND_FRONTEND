import express from "express";
import LenguajeUsuarioController from "../controller/LenguajeUsuarioController.js";
import { camposLenguajeUsuario, parcialesLenguajeUsuario } from "../middlewares/lenguajes_usuarios/index.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todos los lenguajes de los usuarios
router.get('/', LenguajeUsuarioController.getAllLenguajesUsuarios);

// Obtener un lenguaje por usuario ID
router.get('/:id', LenguajeUsuarioController.getLenguajeUsuarioById);

// Crear un nuevo lenguaje para un usuario
router.post('/', camposLenguajeUsuario, LenguajeUsuarioController.createLenguajeUsuario);

// Actualizar un lenguaje del usuario por el ID
router.put('/:id', camposLenguajeUsuario, LenguajeUsuarioController.updateLenguajeUsuario);

// Actualizar parcialmente un lenguaje del usuario
router.patch('/:id', parcialesLenguajeUsuario, LenguajeUsuarioController.updateLenguajeUsuario);

// Eliminar un lenguaje del usuario por su ID
router.delete('/:id', LenguajeUsuarioController.deleteLenguajeUsuario);

export default router;