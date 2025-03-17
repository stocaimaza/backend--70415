/** AFTERSIÑO REPASO CLASE PATRONES DE DISEÑO Y COMUNICACIÓN FRONT BACKEND **/

import express from "express";
const app = express(); 
const PUERTO = 8080;
import BaseDatos from "./database.js"; 
const instanciaDB = BaseDatos.getInstancia(); 


app.get("/", (req, res) => {
    res.send("Olis, ke asen?");
})

app.listen(PUERTO, () => console.log("Conectados!")); 
