import connection from "../utils/db.js";

class Lenguajes_Usuarios{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de los Lenguaje_usuario en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM lenguaje_usuario");
      return rows;
    } catch (error) {
      throw new Error("ERROR: Al obtener los Lenguaje_usuario");
    }
  }

  async create( id_usuario, id_lenguaje) {
    try {
      const [result] = await connection.query("INSERT INTO lenguaje_usuario (id_usuario, id_lenguaje) values (?, ?)", [id_usuario, id_lenguaje]);
      return { id: result.id,  
        id_usuario, 
        id_lenguaje 
      }
    } catch (error) {
      throw new Error("ERROR: Al crear el Lenguaje_usuario");
    }
  }

  async update(id_usuario, id_lenguaje, id) {
    try {
      const [result] = await connection.query("UPDATE lenguaje_usuario SET id_usuario = ?, id_lenguaje = ? WHERE id = ?", [id_usuario, id_lenguaje, id]);
      if (result.affectedRows === 0) {
        throw new Error("Lenguaje_usuario no encontrado");
      }
      return { id_lenguaje, nombre_lenguaje }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Lenguaje_usuario");
    }
  }

  async updateParcial(campos, id_usuario) {
    try {
      let sql = "UPDATE lenguaje_usuario SET ";
      for (let cont = 0; cont < Object.keys(campos).length; cont++) {
        let value = Object.keys(campos)[cont];
        sql += `${value} = '${campos[value]}'`;
        if (cont == Object.keys(campos).length - 1) {
          sql += "";
        }
        else {
          sql += ",";
        }
      }
      sql += ` WHERE id_usuario = ${id_usuario}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Lenguaje_usuario no encontrado"); }
      return { mensaje: "Lenguaje_usuario Actualizado" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar el Lenguaje_usuario Parcialmente");
    }
  }
  
  async relacionadaConUsuarios(id_usuario) {
    const [usuarios] = await connection.query("SELECT * FROM lenguaje_usuario WHERE id_usuario = ?",[id_usuario]);
    return usuarios.length > 0;
  }
  
  async delete(id_usuario) {

    const lenguajeRelacionado = await this.relacionadaConUsuarios(id_usuario);

    if (lenguajeRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar el Lenguaje por que se encuentra asociado a uno o mas Usuarios"
      };
    }

    const [result] = await connection.query("DELETE FROM lenguaje_usuario WHERE id_usuario = ?",[id_usuario]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Lenguaje_usuario no encontrado"
      };
    }
    
    return{
      error: false,
      mensaje: "Lenguaje_usuario eliminado de manera Exitosa"
    }
  }
}

export default Lenguajes_Usuarios;