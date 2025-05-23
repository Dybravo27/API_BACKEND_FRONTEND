import express from "express";
import LenguajeController from "../controller/LenguajeController.js";
import { camposLenguaje, parcialesLenguaje } from "../middlewares/lenguajes/index.js";

// Creamos una instancia del controlador
const router = express.Router();

// Obtener todos los lenguajes
router.get('/', LenguajeController.getAllLenguajes);

// Obtener un lenguaje por ID
router.get('/:id', LenguajeController.getLenguajeById);

// Crear un nuevo lenguaje
router.post('/', camposLenguaje, LenguajeController.createLenguaje);

// Actualizar un lenguaje
router.put('/:id', camposLenguaje, LenguajeController.updateLenguaje);

// Actualizar parcialmente un lenguaje
router.patch('/:id', parcialesLenguaje, LenguajeController.updateLenguaje);

router.delete('/:id', LenguajeController.deleteLenguaje);

export default router;