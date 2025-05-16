import connection from "../utils/db.js";

class Genero{
  // Método para obtener todas los generos
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM generos");
      return rows; // Retorna los generos obtenidos
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LOS GENEROS");
    }
  }

  // Método para obtener el genero por su id
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM generos WHERE id_genero = ?",[id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el genero
        return [];
      }
      // Retorna el genero encontrado
      return rows[0];
    } catch (error) {
      throw new Error("ERROR: AL OBTENER EL GENERO");
    }
  }
  // Método para crear un nuevo genero
  async create(genero) {
    try {
      const [result] = await connection.query("INSERT INTO generos (genero) VALUES (?)",
        [genero]);
        if (result.affectedRows === 0) {
          return null; // Retorna null si no se pudo crear el genero
        }
      return { id_genero: result.id_genero, genero }
    } catch (error) {
      throw new Error("ERROR: AL CREAR EL GENERO");
    }
  }
  // Método para actualizar un genero
  async update(id, campos) {
    try {
      let query = "UPDATE generos SET ";
      let params = [];
      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key,value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);
      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += "WHERE id_genero = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? {id, ...campos} : null;
    } catch (error) {
      throw new Error("ERROR: AL ACTUALIZAR LA CIUDAD");
    }
  }
  // Método para eliminar un genero
  async delete(id) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query("DELETE FROM generos WHERE id_genero = ?",[id]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "NO SE PUDO ELIMINAR EL GENERO, OCURRIO UN ERROR INESPERADO.",
      };
    }    
    return{
      error: false,
      mensaje: "GENERO ELIMINADO DE MANERA EXITOSA.",
    }
  }
  // Método para listar los usuarios de un genero
  async usuarios(id_genero) {
    const [rows] = await connection.query(
      "SELECT * FROM usuarios WHERE id_genero = ?",
      [id_genero]
    );
    return rows;
  }
}

export default Genero;