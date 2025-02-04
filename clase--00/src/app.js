//CLASE 00 - NIVELACION Y REPASO. 
//Instalamos: npm i express express-handlebars mongoose

import express from "express";
import { engine } from "express-handlebars";
import todoRouter from "./routes/todo.router.js";
import "./database.js";
const app = express(); 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 

//Motor de plantillas 
app.engine("handlebars", engine());
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Nombres para hijos: 
//STRINGIFY
//JSONPLACEHOLDER
//MULTER

//Rutas 

app.use("/", todoRouter); 


app.listen(8080, () => console.log("Viva el verano! ")); 