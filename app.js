import express from "express";
import bodyParser from "body-parser";

import ciudadeRoutes from "./routes/ciudadesRoutes.js";

const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({"extended" : true}));

app.use("/ciudades", ciudadeRoutes);

app.listen(3000, () => {
  console.log(">> ESTADO DEL SISTEMA: SERVIDOR EN LINEA");
});