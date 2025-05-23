import { ResponseProvider } from "../providers/ResponseProviders.js";
import LanguageService from "../services/LanguageService.js";
class LenguajeController {
  // Obtener todas las Ciudades
  static getAllLenguajes = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los lenguajes
      const response = await LanguageService.getLanguages();
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      } else {
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
  static getLenguajeById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener los lenguajes
      const response = await LanguageService.getLanguageById(id);
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
  // Crear un nuevo lenguaje
  static createLenguaje = async(req,res) => {
    const { nombre_lenguaje } = req.body;
    try {
      const response = await LanguageService.createLanguage(nombre_lenguaje);
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
  // Actualizar un lenguaje
  static updateLenguaje = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase languageService
      const lenguaje = await LanguageService.updateLanguage(id, campos);
      // Validamos si no se pudo actualizar el genero
      if (lenguaje.error) {
        ResponseProvider.error(
          res,
          lenguaje.message,
          lenguaje.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      ResponseProvider.success(
        res,
        lenguaje.data,
        lenguaje.message,
        lenguaje.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR AL INTERNO EN EL SERVIDOR", 500);
    }
  }
  // Eliminar un lenguaje
  static deleteLenguaje = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await LanguageService.deleteLanguage(id);
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

export default LenguajeController;