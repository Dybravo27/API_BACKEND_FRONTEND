import express from "express";
// import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ciudadeRoutes from "./src/routes/ciudadesRoutes.js";
import generoRoutes from "./src/routes/generosRoutes.js";
import lenguajeRoutes from "./src/routes/lenguajesRoutes.js";
import usuarioRoutes from "./src/routes/usuariosRoutes.js";
import lenguajeUsuarioRoutes from "./src/routes/lenguajesUsuariosRoutes.js";

dotenv.config();

// Crear la instancia de Express
const app = express();

// Middleware
// Habilita CORS
app.use(cors()); 
// Permite que la app acepte datos JSON
app.use(bodyParser.json());

// app.use(express.json());
// Permite el envio de datos de tipo utlencode
app.use(express.urlencoded({"extended" : true}));
// Permite manejar cookies en las respuestas.
app.use(cookieParser());
// Rutas
app.use("/ciudades", ciudadeRoutes);
app.use("/generos", generoRoutes);
app.use("/lenguajes", lenguajeRoutes);
app.use("/lenguaje_usuario", lenguajeUsuarioRoutes);
app.use("/usuarios", usuarioRoutes);

// Puerto para ejecutar el servidor
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`>> ESTADO DEL SISTEMA: SERVIDOR EN LINEA EN http://localhost:${port}`);
});