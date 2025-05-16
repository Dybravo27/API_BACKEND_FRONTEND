import { ResponseProvider } from "../providers/ResponseProviders.js";
import UserService from "../services/UserService.js";
class UsuarioController {
  // Obtener todas los Usuarios
  static getAllUsuarios = async (req, res) => {
    try {
      // Llamamos al servicio para obtener los usuarios
      const response = await UserService.getUsers();
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
        return ResponseProvider.sucess(
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
  // Obtener un usuario por el ID
  static getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener las ciudades
      const response = await UserService.getUserById(id);
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
        return ResponseProvider.sucess(
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
  // Crear un nuevo usuario
  static createUsuario = async (req, res) => {
    const { nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero } = req.body;  
    try {
      // Llamamos el método crear del modelo
      const Usuario = await UserService.createUser(
        nombre,
        apellido,
        telefono,
        documento,
        usuario,
        contrasena,
        id_ciudad,
        id_genero
      );
      // Validamos que la respuesta no tenga error
      if (Usuario.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          Usuario.message,
          Usuario.code
        );
      }
      // Retornamos el usuario creado
      return ResponseProvider.sucess(
        res,
        Usuario,
        "USUARIO CREADO CORRECTAMENTE",
        201
      );
    } catch (error) {
      console.log(error);
      
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "ERROR INTERNO AL CREAR EL USUARIO",
        500
      );
    }
  };
  // Actualizar un producto
  static updateUsuario = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      // Llamamos al método actualizar del modelo
      const usuario = await UserService.updateUser(id, campos);
      // Validamos si no se pudo actualizar el usuario
      if (usuario === null) {
        return ResponseProvider.error(
          res,
          "ERROR AL ACTUALIZAR EL USUARIO",
          400
        );
      }
      // Retornamos el usuario actualizado
      return ResponseProvider.sucess(
        res,
        usuario,
        "USUARIO ACTUALIZADO CORRECTAMENTE",
        200
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "ERROR INTERNO AL ACTUALIZAR EL USUARIO",
        500
      );
    }
  };
  // Eliminar un usuario
  static deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el producto por su ID
      const response = await UserService.deleteUser(id);
      // Validamos si no se pudo eliminar el producto
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      // Retornamos el producto eliminado
      return ResponseProvider.sucess(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "ERROR INTERNO AL ELIMINAR EL USUARIO",
        500
      );
    }
  }
}

export default UsuarioController;