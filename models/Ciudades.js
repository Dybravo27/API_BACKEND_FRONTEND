import connection from "../utils/db.js";

class Ciudades{
  /**
   * Metodo para obtener los registros de la base de datos
   * @returns  {Array} listado de las ciudades en un arreglo
   */
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM ciudades");
      return rows;
    } catch (error) {
      throw new Error("ERROR: al obtener Ciudades");
    }
  }

  async create(nombre_ciudad) {
    try {
      const [result] = await connection.query("INSERT INTO ciudades (nombre_ciudad) VALUES (?)",
        [nombre_ciudad]);
      return { id_ciudad: result.id_ciudad, nombre_ciudad }
    } catch (error) {
      throw new Error("ERROR: Al crear la Ciudad");
    }
  }

  async update(nombre_ciudad, id_ciudad) {
    try {
      const [result] = await connection.query("UPDATE ciudades SET nombre_ciudad = ? WHERE id_ciudad = ?", 
        [nombre_ciudad, id_ciudad]);
      if (result.affectedRows === 0) {
        throw new Error("Ciudad no encontrada");
      }
      return { id_ciudad, nombre_ciudad }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la Ciudad");
    }
  }

  async updateParcial(campos,id_ciudad) {
    try {
      let sql = "UPDATE ciudades SET ";
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
      sql += ` WHERE id_ciudad = ${id_ciudad}`;
      const [result] = await connection.query(sql);
      if (result.affectedRows === 0) { throw new Error("Ciudad no encontrada"); }
      return { mensaje: "Ciudad Actualizada" }
    } catch (error) {
      throw new Error("ERROR: Al Actualizar la Ciudad parcialmente");
    }
  }
  
  async relacionadaConUsuarios(id_ciudad) {
    const [usuarios] = await connection.query("SELECT * FROM usuarios WHERE id_ciudad = ?",[id_ciudad]);
    return usuarios.length > 0;    
  }
  
  async delete(id_ciudad) {

    const ciudadRelacionado = await this.relacionadaConUsuarios(id_ciudad);

    if (ciudadRelacionado) {
      return{
        error: true,
        mensaje: "No se puede eliminar la Ciudad por que se encuentra asociada a uno o mas Usuarios"
      };
    }

    const [result] = await connection.query("DELETE FROM ciudades WHERE id_ciudad = ?",[id_ciudad]);

    if (result.affectedRows === 0) {
      return{
        error : true,
        mensaje: "Ciudad no encontrada"
      };
    }
    
    return{
      error: false,
      mensaje: "Ciudad eliminada de manera Exitosa"
    }
  }
}

export default Ciudades;