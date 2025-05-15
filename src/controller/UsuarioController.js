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
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "ERROR INTERNO AL CREAR EL USUARIO",
        500
      );
    }
  };
  
  static updateUsuarios = async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero } = req.body;
    try {
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.update(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero,id_usuario);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static updateParcialUsuarios = async (req, res) => {
    const { id_usuario } = req.params;
    const campos = req.body;
    try {
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.updateParcial(campos,id_usuario);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static deleteUsuarios = async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const OBJUsuarios = new Usuarios();
      const usuarios = await OBJUsuarios.delete(id_usuario);
      res.status(201).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UsuarioController;