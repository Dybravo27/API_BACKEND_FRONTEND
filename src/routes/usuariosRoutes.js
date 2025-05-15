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

router.put('/:id_usuario', UsuarioController.updateUsuarios);

router.patch('/:id_usuario', UsuarioController.updateParcialUsuarios);

router.delete('/:id_usuario', UsuarioController.deleteUsuarios);

export default router;