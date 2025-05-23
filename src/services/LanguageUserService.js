import LenguajeUsuario from "../models/LenguajeUsuario.js";

class LanguageUserService  {
  static async getLanguageUsers()
  { 
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      const lenguajesUsuarios = await lenguajeUsuarioInstance.getAll();
      // Validamos si no hay registros
      if (lenguajesUsuarios.length === 0) {
        return {
          error: true,
          code: 404,
          message: "NO HAY USUARIOS REGISTRADOS",
        };
      }    
      // Retornamos los lenguajes obtenidos
      return {
        error: false,
        code: 200,
        message: "USUARIOS OBTENIDOS CORRECTAMENTE",
        data: lenguajesUsuarios,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER LOS LENGUAJES DE LOS USUARIOS",
        data: lenguajesUsuarios,
      };
    }
  }
  static async getByUserId(id)
  {
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      const lenguajesUsuarios = await lenguajeUsuarioInstance.getUsuarioById(id);
      // Validamos si no hay usuarios
      if (lenguajesUsuarios.length === 0) {
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
        message: "LENGUAJES DEL USUARIO OBTENIDOS CORRECTAMENTE",
        data: lenguajesUsuarios,
      };
    } catch (error) {
        return {
        error: true,
        code: 500,
        message: "ERROR: AL OBTENER LOS LENGUAJES DEL USUARIO",
      };
    }
  }
  static async createLanguageUser(campos)
  {
    try {
      let camposRegistro  = "";  // Se guardan los nombres de los campos de la tabla
      let marcadores = "";   // Se guardan los  Marcadores de parámetros (?, ?, ...)
      let params = [];  // Valores de los parámetros

      // Construye dinámicamente la consulta INSERT usando los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        camposRegistro  += `${key},`; // Construimos la cadena con las columnas
        marcadores += "?,";  // Agregamos los marcadores de parámetros
        params.push(value); // Agregamos los valores a los parámetros
      }
      // Elimina la coma extra al final de los campos y marcadores
      camposRegistro  = camposRegistro.slice(0, -1);
      marcadores = marcadores.slice(0, -1);

      const lenguajeUsuarioInstance = new LenguajeUsuario();
      const lenguajeUsuarioCreado = await lenguajeUsuarioInstance.create(camposRegistro , marcadores, params);
      // Validamos si no se pudo crear el lenguaje al usuario
      if (lenguajeUsuarioCreado === null) {
        return {
          error: true,
          code: 400,
          message: "ERROR AL CREAR EL LENGUAJE AL USUARIO",
        };
      }
      // Retornamos el nuevo lenguaje creado
      return {
        error: false,
        code: 201,
        message: "LENGUAJE DEL USUARIO CREADO CORRECTAMENTE",
        data: { id:lenguajeUsuarioCreado.insertId, ...campos},
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL CREAR EL LENGUAJE DEL USUARIO",
      };
    }
  }
  static async updateLanguageUser(id, campos)
  {
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      // Consultamos los lenguaje asignados al ID del usuario
      const lenguajeUsuarioExistente = await lenguajeUsuarioInstance.getUsuarioById(id);
      // Validamos si no existe el lenguaje
      if (lenguajeUsuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "USUARIO NO ENCONTRADO",
        };
      }
      const lenguajeUsuario = await lenguajeUsuarioInstance.update(id, campos);
      // Validamos si ocurre algun error al crear los nuevos lenguajes
      if (lenguajeUsuario.error) {
        return{
          error: true,
          code: 400,
          message: "ERROR AL INTENTAR ASIGNAR LOS NUEVOS LENGUAJES AL USUARIO.",
        };
      }
      // Retornamos el lenguaje del usuario actualizado
      return {
        error: false,
        code: 200,
        message: "LENGUAJE ACTUALIZADO CORRECTAMENTE",
        data: lenguajeUsuario.data,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "ERROR INTERNO AL ACTUALIZAR EL LENGUAJE DEL USUARIO",
      };
    }
  }
  static async deleteLanguageUser(id)
  {
    try {
      const lenguajeUsuarioInstance = new LenguajeUsuario();
      // Consultamos el lenguaje por el id
      const lenguajeUsuarioExistente = await lenguajeUsuarioInstance.getUsuarioById(id);
      // Validamos si no existe el lenguaje
      if (lenguajeUsuarioExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "USUARIO NO ENCONTRADO",
        };
      }
      // Procedemos a eliminar el usuario
      const lenguajesUsuarios = await lenguajeUsuarioInstance.delete(id);
      // Validamos si el lenguaje tiene usuarios asociados
      if (lenguajesUsuarios.length > 0) {
        return{
          error: true,
          code: 400,
          message: "NO SE PUDO ELIMINAR EL USUARIO, OCURRIO UN ERROR INESPERADO.",
        };
      }
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "LENGUAJE USUARIO ELIMINADO CORRECTAMENTE",
        data: lenguajeUsuarioExistente,
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

export default LanguageUserService;