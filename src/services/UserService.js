import Usuario from "../models/Usuario.js";
import Ciudad from "../models/Ciudad.js";
import Genero from "../models/Genero.js";
class UserService {
  static async getUsers()
  {
    try {
      // Creamos la instancia del modelo usuario
      const OBJUsuario = new Usuario();
      // Llamamos el método listar
      const usuario = await OBJUsuario.getAll();
      // Validamos si no hay usuarios
      if (usuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY USUARIOS REGISTRADOS"
        };
      }
      // Retornamos los usuarios obtenidos
      return {
        error: false,
        code: 200,
        message: "USUARIOS OBTENIDOS CORRECTAMENTE",
        data: usuario,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: false,
        code: 500,
        message: "ERROR: AL OBTENER LOS USUARIOS",
        data: usuario,
      };
    }
  }
  static async getUserById(id)
  {
    try {
      // Creamos la instancia del modelo usuario
      const OBJUsuario = new Usuario();
      // Llamamos el método consultar por ID
      const usuario = await OBJUsuario.getById(id);
      // Validamos si no hay usuarios
      if (usuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "USUARIO NO ENCONTRADO"
        };
      }
      // Retornamos el usuario obtenido
      return {
        error: false,
        code: 200,
        message: "USUARIO OBTENIDO CORRECTAMENTE",
        data: usuario,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER EL USUARIO",
      };
    }
  }
  static async createUser(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero)
  {
    try {
      // Validamos que el id de la ciudad este registrado
      const OBJCiudad = new Ciudad();
      // Consultamos la ciudad por ID
      const ciudad = await OBJCiudad.getById(id_ciudad);
      // Validamos si no hay ciudad
      if (ciudad.length === 0) {
        return {
          error: true,
          code: 404,
          message: "EL ID DE LA CIUDAD NO EXISTE.",
        };
      }
      // Validamos que el id del genero este registrado
      const OBJGenero = new Genero();
      // Consultamos el genero por ID
      const genero = await OBJGenero.getById(id_genero);
      // Validamos si no hay genero
      if (genero.length === 0) {
        return {
          error: true,
          code: 404,
          message: "EL ID DEL GENERO NO EXISTE.",
        };
      }
      // Creamos la instancia del modelo usuario
      const OBJUsuario = new Usuario();
      // Llamamos el método crear
      const usuarioCreado = await OBJUsuario.create(
        nombre,
        apellido,
        telefono,
        documento,
        usuario,
        contrasena,
        id_ciudad,
        id_genero
      );
      // Retornamos el nuevo usuario creado
      return {
        error: false,
        code: 201,
        message: "USUARIO CREADO CORRECTAMENTE",
        data: usuarioCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL CREAR EL USUARIO",
      };
    }
  }
  static async updateUser(id, campos)
  {
    try {
      // Creamos la instancia del modelo usuario
      const OBJUsuario = new Usuario();
      // Llamamos el método actualizar
      const usuarioActualizado = await OBJUsuario.update(id,campos);
      // Validamos si no se pudo actualizar el usuario
      if (usuarioActualizado === null) {
        return {
          error: true,
          code: 400,
          message: "ERROR AL ACTUALIZAR EL USUARIO",
        };
      }
      // Retornamos el usuario actualizado
      return {
        error: false,
        code: 200,
        message: "USUARIO ACTUALIZADO CORRECTAMENTE.",
        data: usuarioActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "ERROR AL ACTUALIZAR EL USUARIO",
      };
    }
  }
  static async deleteUser(id)
  {
    try {
      // Creamos la instancia del modelo usuario
      const OBJUsuario = new Usuario();
      // Llamamos el método eliminar
      const usuarioEliminado = await OBJUsuario.delete(id);
      // Validamos si no se pudo eliminar el usuario
      if (usuarioEliminado === null) {
        return {
          error: true,
          code: 400,
          message: "ERROR AL ELIMINAR EL USUARIO",
        };
      }      
      // Retornamos el usuario eliminado
      return {
        error: false,
        code: 200,
        message: "USUARIO ELIMINADO CORRECTAMENTE",
        data: usuarioEliminado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ELIMINAR EL GENERO",
      };
    }
  }
}

export default UserService;