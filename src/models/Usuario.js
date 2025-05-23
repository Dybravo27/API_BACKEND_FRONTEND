import connection from "../utils/db.js";

class Usuario{
  /**
   * Método para obtener los usuarios almacenados en la base de datos
   *
   * @returns {QueryResult} Areglo de usuarios obtenidos de la base de datos
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios");
      // Retorna los usuarios obtenidos
      return rows;
    } catch (error) {
      throw new Error("ERROR: AL OBTENER LOS USUARIOS");
    }
  }
  /**
   * Método para obtener un usuario por su id
   *
   * @param {Number} id Identificador del usuario
   * @returns {Object} Objeto usuario
   */
  async getById(id) {
    try {
      const [rows] = await connection.query("SELECT * FROM usuarios WHERE id_usuario = ?",[id]);
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra el usuario
        return [];
      }
      // Retorna el usuaro encontrado
      return rows[0];
    } catch (error) {
      throw new Error("ERROR: AL OBTENER EL USUARIO");
    }
  }
  /**
   * Método para crear un nuevo usuario
   *
   * @returns {Object} Objeto usuario
   */
  async create(nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero) {
    try {
      const [result] = await connection.query("INSERT INTO usuarios (nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido, telefono, documento, usuario, contrasena, id_ciudad, id_genero]
      );
      return {
        id_usuario: result.id_usuario,
        nombre: nombre, 
        apellido: apellido, 
        telefono: telefono, 
        documento: documento, 
        usuario: usuario, 
        contrasena: contrasena, 
        id_ciudad: id_ciudad, 
        id_genero: id_genero, 
      }
    } catch (error) {
      throw new Error("ERROR: AL CREAR EL USUARIO");
    }
  }
  /**
   * Método para actualizar un usuario
   *
   * @param {Number} id Identificador del usuario
   * @returns {Object} Objeto usuario actualizado
   */
  async update(id, campos) {
    try {
      let query = "UPDATE usuarios SET ";
      let params = [];
      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }
      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);
      // Añadimos la condición WHERE para seleccionar el usuario por su ID
      query += " WHERE id_usuario = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("ERROR: AL ACTUALIZAR EL USUARIO");
    }
  }
  /**
   * Método para eliminar un prodcuto
   * @param {Number} id identificador del producto
   * @returns {String} Mensaje de respuesta
   */
  async delete(id) {
    try {
      // Procedemos con la eliminación si no está relacionada
      const [result] = await connection.query("DELETE FROM usuarios WHERE id_usuario = ?",[id]);
      
      if (result.affectedRows === 0) {
        return {
          error: true,
          mensaje: "USUARIO NO ENCONTRADO.",
        };
      }
      return {
        error: false,
        mensaje: "USUARIO ELIMINADO EXITOSAMENTE.",
      };
    } catch (error) {
      res.status(500).json({
        error: true,
        mensaje: "ERROR AL ELIMINAR EL USUARIO.",
      });
    }
  }
}

export default Usuario;