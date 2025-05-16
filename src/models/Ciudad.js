import connection from "../utils/db.js";

class Ciudad{

  // Método para obtener todas las ciudades
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM ciudades");
      return rows; // Retorna las ciudades obtenidas
    } catch (error) {
      throw new Error("ERROR: AL OBTENER CIUDADES");
    }
  }
  // Método para obtener una ciudad por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM ciudades WHERE id_ciudad = ?",[id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra la ciudad
        return [];
      }
      // Retorna la ciudad encontrada
      return rows[0];
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LA CIUDAD");
    }
  }
  // Método para crear una nueva ciudad
  async create(nombre_ciudad) {
    try {
      const [result] = await connection.query("INSERT INTO ciudades (nombre_ciudad) VALUES (?)",
        [nombre_ciudad]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear la ciudad
      }
      return { id_ciudad: result.id_ciudad, nombre_ciudad }
    } catch (error) {
      throw new Error("ERROR: AL CREAR LA CIUDAD");
    }
  }
  // Método para actualizar una ciudad
  async update(id, campos) {
    try {
      let query = "UPDATE ciudades SET ";
      let params = [];
      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key,value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);
      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += "WHERE id_ciudad = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? {id, ...campos} : null;
    } catch (error) {
      throw new Error("ERROR: AL ACTUALIZAR LA CIUDAD");
    }
  }
  // Método para eliminar una ciudad
  async delete(id) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM ciudades WHERE id_ciudad = ?",[id]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "NO SE PUDO ELIMINAR LA CIUDAD, OCURRIO UN ERROR INESPERADO.",
      };
    }    
    return{
      error: false,
      mensaje: "CIUDAD ELIMINADA DE MANERA EXITOSA.",
    }
  }
  // Método para listar los usuarios de una ciudad
  async usuarios(id_ciudad) {
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE id_ciudad = ?",
      [id_ciudad]
    );
    return rows;
  }
}

export default Ciudad;