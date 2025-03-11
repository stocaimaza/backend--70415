/** CHILD PROCESS **/
//Tecnica que vamos a utilizar: Fork...

import express from "express"; 
const app = express(); 
const PUERTO = 8080;

app.get("/", (req, res) => {
    res.send("Olis, este es el Jom");
})

// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i < 5e9; i++) {
//         resultado += i;
//     }
//     return resultado;
// }

import { fork } from "child_process";
//no hace falta instalar nada, ya es un proceso nativo. 



app.get("/suma", (req, res) => {
    const child = fork("./operacionesComplejas.js"); 
    child.send("iniciando"); 
    child.on("message", resultado => {
        res.send(`El resultado de la operacion es: ${resultado} `); 
    })
})

app.listen(PUERTO, () => console.log(`Estamos todos bien! Termino el verano`)); 

//Tenemos que lograr que el proceso de suma se realice sin bloquear al resto de los endpoints. 

//Comenzamos con la estructura del forkeo: 
//1) Separamos la función que trae problemas a otro módulo. 
//2) La modificamos y la dejamos dispinible para cuando el Padre la solicite. 
//3) Ejecutamos la ruta. 


