//Passport Avanzado - Clase n° 5

import express from "express";
const app = express(); 
const PUERTO = 8080;

import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import jwt from "jsonwebtoken"; 
import { authorization, passportCall } from "./utils/util.js";

//Middleware
app.use(express.static("./src/public")); 
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport(); 

//Ruta

app.post("/login", (req, res) => {
    let { usuario, pass } = req.body; 

    if(usuario === "tinki" && pass === "winki") {
        //Si las credenciales coinciden con las esperadas, generamos el token: 
        //let token = jwt.sign({usuario, pass}, "coderhouse", {expiresIn: "24h"}); 

        //Lo enviamos: 
        //res.send({mensaje: "Login exitoso!", token}); 

        //////////////////////////////////////////////////////////////////////////////////
        //Version para roles: 
        let token = jwt.sign({usuario, pass, role: "user"}, "coderhouse", {expiresIn: "24h"}); 

        //////////////////////////////////////////////////////////////////////////////////

        //ENVIAMOS DESDE LA COOKIE: 
        //Esta vez, en lugar de enviar el token directamente en nuestro res.send(), se colocará en una cookie para almacenarse del lado del cliente. 

        res.cookie("coderCookieToken", token, {maxAge: 60*60*1000, httpOnly: true}).send({mensaje: "Login exitoso la vida nos sonrie!"}); 
        //La expresión 60*60*1000 representa 1 hora en milisegundos. 
        //La opcion httpOnly es una medida de seguridad que indica que la cookie solo puede ser accedida mediante el protocolo HTTP. 


    } else {
        res.send({mensaje: "Login fallido! Moriras!"}); 
    }
})

//Vamos a generar una ruta privada que requiere que estemos identificados: 

// app.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
//     res.send(req.user); 
// })

//Utilizando el passportCall: 

app.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
    res.send(req.user); 
})



app.listen(PUERTO, () => console.log(`Escuchando en el 8080`)); 
