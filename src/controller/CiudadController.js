import { ResponseProvider } from "../providers/ResponseProviders.js";
import CityService from "../services/CityService.js";

class CiudadController {
  // Obtener todas las Ciudades
  static getAllCiudades = async (req, res) => {
    try {
      // Llamamos al servicio para obtener las ciudades
      const response = await CityService.getCities();
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR: AL INTERNO DEL SERVIDOR", 500);
    }
  };
  // Obtener una ciudad por el ID
  static getCiudadById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener las ciudades
      const response = await CityService.getCityById(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR: AL INTERNO DEL SERVIDOR", 500);
    }
  };
  // Crear una nueva ciudad
  static createCiudad = async(req,res) => {
    const { nombre_ciudad } = req.body;
    try {
      const response = await CityService.createCity(nombre_ciudad);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else{
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res,"ERROR AL INTERNO EN EL SERVIDOR",500);
    }
  }
  // Actualizar una ciudad
  static updateCiudad = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase CiudadServicio
      const ciudad = await CityService.updateCity(id, campos);
      // Validamos si no se pudo actualizar la ciudad
      if (ciudad.error) {
        ResponseProvider.error(
          res,
          ciudad.message,
          ciudad.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        ciudad.data,
        ciudad.message,
        ciudad.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR AL INTERNO EN EL SERVIDOR", 500);
    }
  }
  // Eliminar una ciudad
  static deleteCiudad = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await CityService.deleteCity(id);
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
        // Llamamos el provider para centralizar los mensajes de respuesta
        ResponseProvider.success(
          res,
          response.data,
          response.message,
          response.code
        );
      }
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR AL INTERNO EN EL SERVIDOR", 500);
    }
  }
}

export default CiudadController;