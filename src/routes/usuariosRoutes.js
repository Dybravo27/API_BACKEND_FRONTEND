import express from "express";
import UsuarioController from "../controller/UsuarioController.js";
import { camposUsuario, parcialesUsuario } from "../middlewares/usuarios/index.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todos los usuarios
router.get('/', UsuarioController.getAllUsuarios);

// Obtener un usuario por ID
router.get('/:id', UsuarioController.getUsuarioById);

// Crear un nuevo usuario
router.post('/', camposUsuario, UsuarioController.createUsuario);

// Actualizar un usuario
router.put('/:id', UsuarioController.updateUsuario);

// Actualizar parcialmente un usuario
router.patch('/:id', parcialesUsuario, UsuarioController.updateUsuario);

router.delete('/:id', UsuarioController.deleteUsuario);

export default router;