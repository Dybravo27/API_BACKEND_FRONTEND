import Lenguaje from "../models/Lenguaje.js";
import LenguajeUsuario from "../models/LenguajeUsuario.js";

class LanguageService {
  static async getLanguages()
  { 
    try {
      const lenguajeInstance = new Lenguaje();
      const lenguaje = await lenguajeInstance.getAll();
      if (lenguaje.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY LENGUAJES REGISTRADOS",
        };
      }    
      // Retornamos los lenguajes obtenidos
      return {
        error: false,
        code: 200,
        message: "LENGUAJES OBTENIDOS CORRECTAMENTE",
        data: lenguaje,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER LOS LENGUAJES",
        data: lenguaje,
      };
    }
  }
  static async getLanguageById(id)
  {
    try {
      const lenguajeInstance = new Lenguaje();
      const lenguaje = await lenguajeInstance.getById(id);
      // Validamos si no hay generos
      if (lenguaje.length === 0) {
        return {
          error: true,
          code: 404,
          message: "LENGUAJE NO ENCONTRADO"
        };
      }
      // Consultamos los usuarios asociados a un lenguaje
      const usuarios = await lenguajeInstance.usuarios(id);
      // Agregamos la propiedad usuarios al objeto lenguaje
      lenguaje.usuarios = usuarios;
      // Retornamos el genero obtenido
      return {
        error: false,
        code: 200,
        message: "LENGUAJE OBTENIDO CORRECTAMENTE",
        data: lenguaje,
      };
    } catch (error) {
        return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER EL LENGUAJE",
      };
    }
  }
  static async createLanguage(nombre_lenguaje)
  {
    try {
      const lenguajeInstance = new Lenguaje();
      const lenguaje = await lenguajeInstance.create(nombre_lenguaje);
      // Validamos si no se pudo crear el lenguaje
      if (lenguaje === null) {
        return {
          error: true,
          code: 400,
          message: "ERROR AL CREAR EL LENGUAJE",
        };
      }
      // Retornamos el nuevo lenguaje creado
      return {
        error: false,
        code: 201,
        message: "LENGUAJE CREADO CORRECTAMENTE",
        data: lenguaje,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL CREAR EL LENGUAJE",
      };
    }
  }
  static async updateLanguage(id, campos)
  {
    try {
      const lenguajeInstance = new Lenguaje();
      // Consultamos el lenguaje por el id
      const lenguajeExistente = await lenguajeInstance.getById(id);
      // Validamos si no existe el lenguaje
      if (lenguajeExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "LENGUAJE NO ENCONTRADO",
        };
      }
      const lenguaje = await lenguajeInstance.update(id, campos);
      // Validamos si no se pudo actualizar el lenguaje
      if (lenguaje === null) {
        return{
          error: true,
          code: 400,
          message: "ERROR AL ACTUALIZAR EL LENGUAJE",
        };
      }
      // Retornamos el lenguaje actualizado
      return {
        error: false,
        code: 200,
        message: "LENGUAJE ACTUALIZADO CORRECTAMENTE",
        data: lenguaje,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ACTUALIZAR EL LENGUAJE",
      };
    }
  }
  static async deleteLanguage(id)
  {
    try {
      const lenguajeInstance = new Lenguaje();
      // Consultamos el lenguaje por el id
      const lenguajeExistente = await lenguajeInstance.getById(id);
      // Validamos si no existe el lenguaje
      if (lenguajeExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "LENGUAJE NO ENCONTRADO",
        };
      }      
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      // Consultamos los usuarios asociados al lenguaje
      const lenguajesUsuarios = await lenguajeUsuarioInstance.getLenguajeById(id);
      // Validamos si el lenguaje tiene usuarios asociados
      if (lenguajesUsuarios.length > 0) {
        return{
          error: true,
          code: 404,
          message: "NO SE PUEDE ELIMINAR EL LENGUAJE, TIENE UNO O VARIOS USUARIOS ASOCIADOS.",
        };
      }
      // Procedemos a eliminar el lenguaje
      const resultado = await lenguajeInstance.delete(id);
      // Validamos si no se pudo eliminar el lenguaje
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
        message: "LENGUAJE ELIMINADO CORRECTAMENTE",
        data: lenguajeExistente,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ELIMINAR EL LENGUAJE",
      };
    }
  }
}

export default LanguageService;