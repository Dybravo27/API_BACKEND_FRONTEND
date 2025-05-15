import express from "express";
import CiudadesController from "../controller/CiudadesController.js";
import { camposCiudad, parcialesCiudades } from "../middlewares/ciudades/index.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todas las ciudades
router.get('/', CiudadesController.getAllCiudades);

// Obtener una ciudad por ID
router.get('/:id', CiudadesController.getCiudadById);

// Crear una nueva ciudad
router.post('/', camposCiudad, CiudadesController.createCiudad);

// Actualizar una ciudad
router.put('/:id', camposCiudad, CiudadesController.updateCiudad);

// Actualizar parcialmente una ciudad
router.patch('/:id', parcialesCiudades, CiudadesController.updateCiudad);

// Eliminar una ciudad
router.delete('/:id', CiudadesController.deleteCiudad);


export default router;