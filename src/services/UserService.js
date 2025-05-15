import Usuario from "../models/Usuario.js";
import Ciudad from "../models/Ciudad.js";
import Genero from "../models/Genero.js";
class UserService {
  static async getUsers()
  {
    try {
      const OBJUsuario = new Usuario();
      const usuario = await OBJUsuario.getAll();
      if (usuario.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY USUARIOS REGISTRADOS"
        };
      }
      return {
        error: false,
        code: 200,
        message: "USUARIOS OBTENIDOS CORRECTAMENTE",
        data: usuario,
      };
    } catch (error) {
      return {
        error: false,
        code: 200,
        message: "ERROR: AL OBTENER LOS USUARIOS",
        data: usuario,
      };
    }
  }
  static async getUserById(id)
  {
    try {
      const OBJUsuario = new Usuario();
      const usuario = await OBJUsuario.getById(id);
      // Validamos si no hay generos
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
        // Validamos si no se pudo crear la ciudad
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
        // Validamos si no se pudo crear el genero
        if (genero.length === 0) {
          return {
            error: true,
            code: 404,
            message: "EL ID DEL GENERO NO EXISTE.",
          };
        }
        // Creamos la instancia del modelo usuario
        const OBJUsuario  = new Usuario();
        // Llamamos el método crear
        const usuarioCreado = await OBJUsuario.create(
          nombre,
          apellido,
          telefono,
          documento,
          usuario,
          contrasena,
          id_ciudad,
          id_genero,
        );
        // Retornamos el nuevo usuario creado
        return {
          error: false,
          code: 201,
          message: "USUARIO CREADO CORRECTAMENTE",
          data: usuarioCreado,
        };
    } catch (error) {
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
      const usuarioInstance = new Usuario();
      // Consultamos el genero por el id
      const generoExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el genero
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "GENERO NO ENCONTRADO",
        };
      }
      const genero = await usuarioInstance.update(id, campos);
      // Validamos si no se pudo actualizar el genero
      if (genero === null) {
        return{
          error: true,
          code: 400,
          message: "ERROR AL ACTUALIZAR EL GENERO",
        };
      }
      // Retornamos el genero actualizado
      return {
        error: false,
        code: 200,
        message: "GENERO ACTUALIZADO CORRECTAMENTE",
        data: genero,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ACTUALIZAR EL GENERO",
      };
    }
  }
  static async deleteUser(id)
  {
    try {
      const usuarioInstance = new Usuario();
      // Consultamos el genero por el id
      const generoExistente = await usuarioInstance.getById(id);
      // Validamos si no existe el genero
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "GENERO NO ENCONTRADO",
        };
      }      
      // Consultamos los generos asociados a un usuario
      const generos = await usuarioInstance.usuarios(id);
      // Validamos si no se pudo actualizar el genero
      if (generos.length > 0) {
        return{
          error: true,
          code: 404,
          message: "NO SE PUEDE ELIMINAR EL GENERO, TIENE UNO O VARIOS USUARIOS ASOCIADOS.",
        };
      }
      // Procedemos a eliminar el genero
      const resultado = await usuarioInstance.delete(id);
      // Validamos si no se pudo eliminar el genero
      if (resultado.error) {
        return{
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "GENERO ELIMINADO CORRECTAMENTE",
        data: generoExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ELIMINAR EL GENERO",
      };
    }
  }
}

export default UserService;