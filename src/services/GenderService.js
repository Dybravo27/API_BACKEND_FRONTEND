import Genero from "../models/Genero.js";

class GenderService {
  static async getGenders()
  {
    try {
      const generoInstance = new Genero();
      const genero = await generoInstance.getAll();
      if (genero.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY GENEROS REGISTRADOS"
        };
      }
      return {
        error: false,
        code: 200,
        message: "GENEROS OBTENIDOS CORRECTAMENTE",
        data: genero,
      };
    } catch (error) {
      return {
        error: false,
        code: 500,
        message: "ERROR: AL OBTENER EL GENERO",
        data: genero,
      };
    }
  }
  static async getGenderById(id)
  {
    try {
      const generoInstance = new Genero();
      const genero = await generoInstance.getById(id);
      // Validamos si no hay generos
      if (genero.length === 0) {
        return {
          error: true,
          code: 404,
          message: "GENERO NO ENCONTRADO"
        };
      }
      // Consultamos los usuarios asociados a la genero
      const usuarios = await generoInstance.usuarios(id);
      // Agregamos la propiedad usuarios al objeto genero
      genero.usuarios = usuarios;
      // Retornamos el genero obtenido
      return {
        error: false,
        code: 200,
        message: "GENERO OBTENIDO CORRECTAMENTE",
        data: genero,
      };
    } catch (error) {
        return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER EL GENERO",
      };
    }
  }

  static async createGender(genero)
  {
    try {
      const generoInstance = new Genero();
      const generoC = await generoInstance.create(genero);
      // Validamos si no se pudo crear el genero
      if (generoC === null) {
        return {
          error: true,
          code: 400,
          message: "ERROR AL CREAR EL GENERO",
        };
      }
      // Retornamos el nuevo genero creado
      return {
        error: false,
        code: 201,
        message: "GENERO CREADO CORRECTAMENTE",
        data: generoC,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL CREAR EL GENERO",
      };
    }
  }
  static async updateGender(id, campos)
  {
    try {
      const generoInstance = new Genero();
      // Consultamos el genero por el id
      const generoExistente = await generoInstance.getById(id);
      // Validamos si no existe el genero
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "GENERO NO ENCONTRADO",
        };
      }
      const genero = await generoInstance.update(id, campos);
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
  static async deleteGender(id)
  {
    try {
      const generoInstance = new Genero();
      // Consultamos el genero por el id
      const generoExistente = await generoInstance.getById(id);
      // Validamos si no existe el genero
      if (generoExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "GENERO NO ENCONTRADO",
        };
      }      
      // Consultamos los generos asociados a un usuario
      const generos = await generoInstance.usuarios(id);
      // Validamos si no se pudo actualizar el genero
      if (generos.length > 0) {
        return{
          error: true,
          code: 404,
          message: "NO SE PUEDE ELIMINAR EL GENERO, TIENE UNO O VARIOS USUARIOS ASOCIADOS.",
        };
      }
      // Procedemos a eliminar el genero
      const resultado = await generoInstance.delete(id);
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

export default GenderService;