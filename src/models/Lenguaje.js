import connection from "../utils/db.js";

class Lenguaje{
  // Método para obtener todos los lenguajes
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguajes");
      return rows;
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LOS LENGUAJES");
    }
  }
  // Método para obtener el lenguaje por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguajes WHERE id_lenguaje = ?",[id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el lenguaje
        return [];
      }
      // Retorna el lenguaje encontrado
      return rows[0];
    } catch (error) {
      throw new Error("ERROR: AL OBTENER EL LENGUAJE");
    }
  }
  // Método para crear un lenguaje
  async create(nombre_lenguaje) {
    try {
      const [result] = await connection.query("INSERT INTO lenguajes (nombre_lenguaje) VALUES (?)",
        [nombre_lenguaje]);
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear el lenguaje
      }
      return { id_lenguaje: result.id_lenguaje, nombre_lenguaje }
    } catch (error) {
      throw new Error("ERROR: AL CREAR EL LENGUAJE");
    }
  }
  // Método para actualizar un lenguaje
  async update(id, campos) {
    try {
      let query = "UPDATE lenguajes SET ";
      let params = [];
      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key,value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);
      // Añadimos la condición WHERE para seleccionar el lenguaje por su ID
      query += "WHERE id_lenguaje = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? {id, ...campos} : null;
    } catch (error) {
      throw new Error("ERROR: AL ACTUALIZAR EL LENGUAJE");
    }
  }
  // Método para eliminar un lenguaje
  async delete(id) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM lenguajes WHERE id_lenguaje = ?",[id]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "NO SE PUDO ELIMINAR EL LENGUAJE, OCURRIO UN ERROR INESPERADO.",
      };
    }    
    return{
      error: false,
      mensaje: "LENGUAJE ELIMINADO DE MANERA EXITOSA.",
    }
  }
  // Método para listar los usuarios de un lenguaje
  async usuarios(id_lenguaje) {
    try {
      const [rows] = await connection.query(
        `SELECT u.*
        FROM usuarios u
        JOIN lenguaje_usuario lu ON u.id_usuario = lu.id_usuario
        WHERE lu.id_lenguaje = ?`,
        [id_lenguaje]
      );
      return rows;
    } catch (error) {
      throw new Error("ERROR: AL OBTENER USUARIOS DEL LENGUAJE");
    }
  }
}

export default Lenguaje;