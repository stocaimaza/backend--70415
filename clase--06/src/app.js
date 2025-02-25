/** CLASE 06- RUTEO AVANZADO Y MANEJO DE POLITICAS **/

//Temas de hoy: 
//1) Expresiones Regulares
//2) Restringiendo parametros
//3) Validando parametros
//4) Custom Router
//5) Custom Response

///////////////////////////////////////////////////////////////////////////

//1) Expresiones Regular: Son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto. 
//Ejemplo: Validar si el texto ingresado por el usuario corresponde a un email, que tenga el formato "nombre@dominio.com".

//Ejemplo con correo electronico: 

// let correoIngresado = "lionel@messi.com"; 
// let correoFalso = "tinkiwinki"; 
// const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// console.log(patronCorreo.test(correoIngresado));
// console.log(patronCorreo.test(correoFalso)); 


//Ejemplo con numero de telefono: 

//Numero con el siguiente formato. (xxx) xxx-xxxx
// let telefonoIngresado = "(223) 669-3878"; 
// let telefonoFalso = "1234";
// const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;

// console.log(patronTelefono.test(telefonoFalso)); 
// console.log(patronTelefono.test(telefonoIngresado));

//Levantamos un servidor: 

import express from "express";
const app = express(); 
import clientesRouter from "./routes/clientes.router.js";
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 



//Custom Router: 
import UserRouter from "./routes/user.router.js";
const userRouter = new UserRouter(); 

//Rutas
app.use("/clientes", clientesRouter); 
app.use("/users", userRouter.getRouter()); 

////////////////////////////////////////////////////////////
app.get("*", (req, res) => {
    res.status(404).send("Recurso no encontrado, moriras!"); 
})


////////////////////////////////////////////////////////////

app.listen(PUERTO, () => console.log("Trabajando en el 8080"));