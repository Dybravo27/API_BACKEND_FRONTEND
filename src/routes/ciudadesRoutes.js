import express from "express";
import CiudadesController from "../controller/CiudadesController.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todas las ciudades
router.get('/', CiudadesController.getAllCiudades);

// Obtener una ciudad por ID
router.get('/:id', CiudadesController.getCiudadById);

router.post('/', CiudadesController.createCiudades);

router.put('/:id_ciudad', CiudadesController.updateCiudades);

router.patch('/:id_ciudad', CiudadesController.updateParcialCiudades);

router.delete('/:id_ciudad', CiudadesController.deleteCiudades);


export default router;