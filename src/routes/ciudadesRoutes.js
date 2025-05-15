import express from "express";
import CiudadController from "../controller/CiudadController.js";
import { camposCiudad, parcialesCiudad } from "../middlewares/ciudades/index.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todas las ciudades
router.get('/', CiudadController.getAllCiudades);

// Obtener una ciudad por ID
router.get('/:id', CiudadController.getCiudadById);

// Crear una nueva ciudad
router.post('/', camposCiudad, CiudadController.createCiudad);

// Actualizar una ciudad
router.put('/:id', camposCiudad, CiudadController.updateCiudad);

// Actualizar parcialmente una ciudad
router.patch('/:id', parcialesCiudad, CiudadController.updateCiudad);

// Eliminar una ciudad
router.delete('/:id', CiudadController.deleteCiudad);

export default router;