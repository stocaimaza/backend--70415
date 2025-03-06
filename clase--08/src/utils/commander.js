//3) Procesamiento de Argumentos con Commander. 
///npm i commander

import { Command } from "commander";
const program = new Command(); 

//1 - Comando || 2 - La descripción || 3 - Valor por default
program
    .option("-p <port>", "Puerto donde se inicia el servidor", 8080)
    .option("--mode <mode>", "Modo de trabajo", "desarrollo")
program.parse(); 

//Con esto podemos ver todas las opciones que configuramos: 
//console.log("Opciones: ", program.opts()); 

export default program; 




