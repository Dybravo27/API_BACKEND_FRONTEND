import { ResponseProvider } from "../../providers/ResponseProviders.js";
import { campos } from "./camposU.js";

export function camposUsuario(req, res, next) {
  // Arreglo para almacenar los errores de validación
  // Recorremos el arreglo de campos a validar
  const errors = [];
  for (const campo of campos) {
    const {
      name, // Nombre del campo a validar
      required, // Si el campo es requerido
      minLength, // Si el campo tiene un tamaño mínimo
      maxLength, // Si el campo tiene un tamaño máximo
      type, // tipo de dato del campo
    } = campo
    const value = req.body[name];
    // Validar si el campo es requerido y está vacío
    if (required && (!value || value.trim() === "")) {
      errors.push({
        campo: name,
        message: `EL CAMPO ${name} ES OBLIGATORIO Y NO SE PUEDE DEJAR VACIO.`,
      });
      // Si el campo es requerido y está vacío, continuamos al siguiente campo, evitando el resto de validaciones
      continue;
    }
    // Validar el tamaño mínimo y máximo del campo
    if (minLength && value && value.length < minLength) {
      errors.push({
        campo: name,
        message: `EL CAMPO ${name} DEBE TENER AL MENOS ${minLength} CARACTERES.`
      });
      // Si el campo no cumple con el tamaño mínimo, continuamos al siguiente campo, evitando el resto de validaciones
      continue;
    }
    // Validar el tamaño máximo del campo
    if (maxLength && value && value.length > maxLength) {
      errors.push({
        campo: name,
        message: `EL CAMPO ${name} NO PUEDE TENER MÁS DE ${maxLength} CARACTERES.`,
      });
      // Si el campo no cumple con el tamaño máximo, continuamos al siguiente campo, evitando el resto de validaciones
      continue;
    }
    // Validar que el campo sea de tipo numérico
    if (type === "number" && value) {
      // Convertimos el valor a un número entero
      const numero = Number(value);
      // Validamos si el valor es un número
      if (!Number.isInteger(numero)) {
        // Si el valor no es un número entero, agregamos un error
        errors.push({
          campo: name,
          message: `EL CAMPO ${name} DEBE SER UN NUMERO ENTERO.`
        });
        // Si el campo no es un número entero, continuamos al siguiente campo, evitando el resto de validaciones
        continue;
      }
    }
  }
  // Si hay errores, devolver una respuesta con los errores
  if (errors.length > 0) {
    // Retornamos y Llamamos el provider para centralizar los mensajes de respuesta
    return ResponseProvider.error(
      res,
      "ERROR DE VALIDACION",
      400,
      errors
    );
  }
  // Si todo está bien, pasamos al siguiente middleware o controlador
  next();
};