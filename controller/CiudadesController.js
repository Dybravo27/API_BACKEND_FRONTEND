import Ciudades from "../models/Ciudades.js";

class CiudadesController {
  static getAllCiudades = async (req, res) => {
    const OBJCiudades = new Ciudades();
    const ciudades = await OBJCiudades.getAll();
    res.json(ciudades);
  }

  static createCiudades = async(req,res) => {
    try {
      const { nombre_ciudad } = req.body;
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.create(nombre_ciudad);
      res.status(201).json(ciudades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static updateCiudades = async (req, res) => {
    const { id_ciudad } = req.params;
    const { nombre_ciudad } = req.body;
    try {
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.update(nombre_ciudad,id_ciudad);
      res.status(201).json(ciudades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialCiudades = async (req, res) => {
    const { id_ciudad } = req.params;
    const campos = req.body;
    try {
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.updateParcial(campos,id_ciudad);
      res.status(201).json(ciudades)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteCiudades = async (req, res) => {
    try {
      const { id_ciudad } = req.params;
      const OBJCiudades = new Ciudades();
      const ciudades = await OBJCiudades.delete(id_ciudad);
      res.status(201).json(ciudades);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: error.message });
    }
  }
}

export default CiudadesController;