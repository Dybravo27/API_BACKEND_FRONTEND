import express from "express";
import GeneroController from "../controller/GeneroController.js";
import { camposGenero, parcialesGenero } from "../middlewares/generos/index.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todas los generos
router.get('/', GeneroController.getAllGeneros);

// Obtener un genero por ID
router.get('/:id', GeneroController.getGeneroById);

// Crear un nuevo genero
router.post('/', camposGenero, GeneroController.createGenero);

// Actualizar un genero
router.put('/:id', camposGenero, GeneroController.updateGenero);

// Actualizar parcialmente una ciudad
router.patch('/:id', parcialesGenero, GeneroController.updateGenero);

// Eliminar un genero
router.delete('/:id', GeneroController.deleteCiudad);

export default router;