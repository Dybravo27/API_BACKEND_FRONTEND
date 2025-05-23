import { ResponseProvider } from "../providers/ResponseProviders.js";
import GenderService from "../services/GenderService.js";
class GeneroController {
  // Obtener todas las Ciudades
  static getAllGeneros = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los generos
      const response = await GenderService.getGenders();
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
  // Obtener un genero por el ID
  static getGeneroById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener los generos
      const response = await GenderService.getGenderById(id);
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
  // Crear un nuevo genero
  static createGenero = async(req,res) => {
    const { genero } = req.body;
    try {
      const response = await GenderService.createGender(genero);
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
  static updateGenero = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase GeneroServicio
      const genero = await GenderService.updateGender(id, campos);
      // Validamos si no se pudo actualizar el genero
      if (genero.error) {
        ResponseProvider.error(
          res,
          genero.message,
          genero.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        genero.data,
        genero.message,
        genero.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR AL INTERNO EN EL SERVIDOR", 500);
    }
  }
  // Eliminar un genero
  static deleteCiudad = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await GenderService.deleteGender(id);
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

export default GeneroController;