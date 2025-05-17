import connection from "../utils/db.js";

class LenguajeUsuario{
  // Método para obtener todos los lenguajes de los usuarios
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguaje_usuario");
      return rows;
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LOS LENGUAJES DE LOS USUARIOS");
    }
  }
  // Método para obtener todos los lenguajes asignados a un usuario por el ID
  async getUsuarioById(id_usuario) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM lenguaje_usuario WHERE id_usuario = ?",
        [id_usuario]
      );
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LOS LENGUAJES DEL USUARIO");
    }
  }
  // Método para obtener todos los usuarios que tienen asignado un lenguaje por el ID
  async getLenguajeById(id_lenguaje) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM lenguaje_usuario WHERE id_lenguaje = ?",
        [id_lenguaje]
      );
      // Retorna el usuario encontrado
      return rows;
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LOS LENGUAJES DEL USUARIO");
    }
  }
  // Método para crear un nuevo registro en la tabla lenguaje_usuario
  async create(campos, marcadores, params) {
    try {
      const [result] = await connection.query(`INSERT INTO lenguaje_usuario (${campos}) VALUES (${marcadores})`,params);
      // Verificamos si la inserción fue exitosa
      if (result.affectedRows === 0) {
        throw new Error("NO SE PUDO CREAR EL LENGUAJE DEL USUARIO");
      }

      // Retornamos el ID del nuevo registro (si la inserción fue exitosa)
      return { id: result.insertId, ...params };
    } catch (error) {
      // Lanza un error si algo sale mal
      throw new Error("ERROR: AL CREAR EL NUEVO LENGUAJE PARA EL USUARIO");
    }
  }
  // Método para eliminar los lenguajes asignados a un usuario
  async delete(id_usuario) {
    try {
      // Procedemos con la eliminación si no está relacionada
      const [result] = await connection.query("DELETE FROM lenguaje_usuario WHERE id_usuario = ?",[id_usuario]);
      if (result.affectedRows === 0) {
        return{
          error : true,
          mensaje: "NO SE ENCONTRARON LENGUAJES ASIGNADOS PARA ELIMINAR.",
        };
      }    
      return{
        error: false,
        mensaje: "LENGUAJES DEL USUARIO ELIMINADOS DE MANERA EXITOSA.",
      }
    } catch (error) {
      return {
        error: true,
        mensaje: "ERROR: AL ELIMINAR LOS LENGUAJES DEL USUARIO.",
      };
    }
  }
}

export default LenguajeUsuario;