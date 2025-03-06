/** CLASE 8 - PROCESO PRINCIPAL DEL SERVIDOR + GLOBAL & CHILD PROCESS**/

//npm i express mongoose

//TEMAS DE HOY: 

//1) Objeto Process. 
//2) Manejo de Argumentos. 
//3) Commande JS
//4) Variables de Entorno
//5) Listeners
//6) Child Process


//1) Objeto Process: Cada vez que yo ejecuto en consola node src/app.js se crea automaticamente un objeto llamado "Process", que contiene informacion sobre este proceso. 

//console.log(process); 

//Algunos elementos importantes: 

console.log(process.cwd());
//Directorio actual del proceso

//console.log(process.pid);
//Obtengo el ID del proceso en el sistema operativo. 

//console.log(process.memoryUsage());
//Me retorna el uso de la memoria. Los valores estan en bytes. 

//console.log(process.version);
//Me retorna la version de NodeJS. 

//console.log("texto adicional");

//process.exit(); 
//Me permite salir del proceso. 

//Manejo de Argumentos: 

//console.log(process.argv);

//LEVANTAMOS UN SERVIDOR: 

// import express from "express";
// const app = express(); 
// import configObject from "./config/config.js";
// import mongoose from "mongoose";
// import UserModel from "./models/usuario.model.js";

// const { mongo_url, puerto } = configObject; 

// mongoose.connect(mongo_url)
//     .then(() => console.log("Conectados a la BD"))
//     .catch((error) => console.log("Tenemos un error mortal: " + error))

// app.get("/", async (req, res) => {
//     try {
//         const usuarios = await UserModel.find(); 
//         res.send(usuarios); 
//     } catch (error) {
//         res.status(500).send("Error terrible, moriremos!"); 
//     }
// })

// app.listen(puerto, () => console.log("Todo funcionando!"));


//Listeners: 

// process.on(), es un método que te permite registrar escuchadores de eventos (listeners) para eventos especificos en ejecucion. 

//Algunos de los mas conocidos: 

//"exit": para ejecutar codigo justo antes de la finalización del proceso. 

process.on("exit", (code) => {
    //console.log("Este codigo se ejecutará justo antes de la finalización del proceso. "); 
    console.log("Finalizamos con el siguiente codigo: ", code); 
})

console.log("Y esto cuando se muestra ?");

//"uncaughtException": Para atrapar alguna excepción que no haya sido considerada en algun catch. 



//Generamos un error: 

process.on("uncaughtException", (error) => {
        console.log("Tuvimos que capturar un error: ", error); 
        process.exitCode = 1; 
})

firulais(); 


//Esta linea me sirve a mi para registrar un error, pero no reemplaza al bloque try catch, porque en caso de un error la ejecicion del programa se detiene. 