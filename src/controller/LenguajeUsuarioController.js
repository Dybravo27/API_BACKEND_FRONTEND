import { ResponseProvider } from "../providers/ResponseProviders.js";
import LanguageUserService from "../services/LanguageUserService.js";
class LenguajeUsuarioController {
  // Obtener todas las Ciudades
  static getAllLenguajesUsuarios = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los lenguajes de los usuarios
      const response = await LanguageUserService.getLanguageUsers();
      // Validamos si no hay registros
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
  // Obtener los lenguajes del usuario por el ID
  static getLenguajeUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el usuario por el ID
      const response = await LanguageUserService.getByUserId(id);
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
  // Crear un nuevo lenguaje para el usuario
  static createLenguajeUsuario = async(req,res) => {
    const campos = req.body;
    try {
      const response = await LanguageUserService.createLanguageUser(campos);
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
  // Actualizar un lenguaje del usuarios
  static updateLenguajeUsuario = async (req, res) => {
    const { id } = req.params;
    // Los campos a actualizar se pasan en el cuerpo de la solicitud
    const campos = req.body;
    try {
      // Crear una instancia de la clase GeneroServicio
      const lenguajeUsuario = await LanguageUserService.updateLanguageUser(id, campos);
      // Validamos si no se pudo actualizar el genero
      if (lenguajeUsuario.error) {
        return ResponseProvider.error(
          res,
          lenguajeUsuario.message,
          lenguajeUsuario.code
        );
      }
      // Retornamos la respuesta cuando se actualiza correctamente
      return ResponseProvider.success(
        res,
        lenguajeUsuario.data,
        lenguajeUsuario.message,
        lenguajeUsuario.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      ResponseProvider.error(res, "ERROR AL INTERNO EN EL SERVIDOR", 500);
    }
  }
  // Eliminar un usuario
  static deleteLenguajeUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el usuario
      const response = await LanguageUserService.deleteLanguageUser(id);
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
  };
}

export default LenguajeUsuarioController;