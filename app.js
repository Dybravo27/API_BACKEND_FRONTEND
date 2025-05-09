import express from "express";
import bodyParser from "body-parser";

import ciudadeRoutes from "./routes/ciudadesRoutes.js";
import generoRoutes from "./routes/generosRoutes.js";
import lenguajeRoutes from "./routes/lenguajesRoutes.js";
import usuarioRoutes from "./routes/usuariosRoutes.js";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({"extended" : true}));

app.use("/ciudades", ciudadeRoutes);

app.use("/generos", generoRoutes);

app.use("/lenguajes", lenguajeRoutes);

app.use("/usuarios", usuarioRoutes);

app.listen(3000, () => {
  console.log(">> ESTADO DEL SISTEMA: SERVIDOR EN LINEA");
});