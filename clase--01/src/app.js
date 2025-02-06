/** CLASE 01 - COOKIES Y SESIONES **/

//Cookies: son pequeños archivos de texto que viven en el navegador del usuario. 
//Esta información viaja entre las peticiones del cliente y las respuestas del servidor. 


//¿Que datos puedo guardar?
//1) Preferencias del usuario ( modo claro, idioma)
//2) Nombres de usuario
//3) Productos o servicios deseados
//4) Id de las sesiones (lo vemos en un ratito)

//Levantamos un mini servidor: 

import express from "express"; 
const app = express(); 
const PUERTO = 8080; 
//2) Importamos
import cookieParser from "cookie-parser";
//Importamos session
import session from "express-session"; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
//3) Lo usamos a nivel middleware
let miAltaClaveSecreta = "TinkiWinki"; 
app.use(cookieParser(miAltaClaveSecreta));

//Middleware de Session
app.use(session({
    secret: "secretCoder", 
    resave: true, 
    //Resave me permite mantener activa la sesion frente a la inactividad del usuario. 
    saveUninitialized: true
    //Me permite guardar cualquier sesion aun cuando el objeto sesion no tenga nada para contener. 
}))


//Rutas

app.get("/", (req, res) => {
    res.send("Hola Mundo, aguante el clima del verano!"); 
})

app.listen(PUERTO, () => console.log("21 grados en Santa Clara")); 

//TRABAJAMOS CON COOKIE-PARSER: 
//1) npm install cookie-parser

//RUTA PARA SETEAR UNA COOKIE: 

app.get("/setcookie", (req, res) => {
    //Voy a utilizar el objeto "res" para asignarle una cookie al cliente. 
    //Lo almacenamos en formato "clave-valor".
    //Esta cookie vive hasta que es eliminada. Si yo quiero que tenga un tiempo de vida limitado puedo hacer lo siguiente.
    res.cookie("coderCookie", "Mi primera cookie", {maxAge: 300000000}).send("Cookie seteada");

})

//LEEMOS EL VALOR DE UNA CUKI: 

app.get("/leercookie", (req, res) => {
    res.send(req.cookies.coderCookie); 
})


//Borramos una cuki: 

app.get("/borrarcuki", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada"); 
})

//Enviamos una cookie firmada:
app.get("/cookiefirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", {signed: true}).send("Cookie firmada enviada"); 
})

//Obtenemos una cookie firmada: 

app.get("/recuperamoscookiefirmada", (req, res) => {
    //Ahora para recuperar la cookie tengo que utilizar "signedCookies". 
    let valorCookie = req.signedCookies.cookieFirmada; 

    //Si el valor de cookie se modifico esto es false. 

    if (valorCookie) {
        res.send("Cookie recuperada: " + valorCookie);
    } else {
        res.send("Cookie invalida");
    }

})

//Sesiones: con las sesiones podemos mantener información sobre el cliente. 

//Caracteristicas: 
//A) La información que se quiere guardar se almacena del lado del servidor. 
//B) Del lado del cliente se crea un indentificador unico para poder acceder a esa información. 
//C) Los datos almacenados en session se borran al cerrar el navegador. 
//D) Los usamos al iniciar sesion. 

//Instalamos: npm install express-session

//Ruta ejemplo de Session: 

app.get("/session", (req, res) => {
    //Si al conectarme la session ya existe aumento el contador. 
    if (req.session.counter) {
        req.session.counter++; 
        res.send("Se visitó el sitio: " + req.session.counter + " veces"); 
    } else {
        req.session.counter = 1; 
        res.send("Bienvenidoooos!"); 
    }
})

//Si te queres desloguear destruis la session: 

app.get("/logout", (req, res) => {
    //Para eliminar datos de una variable de session, se utiliza req y el metodo destroy. 
    req.session.destroy( (error) => {
        if(!error) {
            res.send("Sesion cerrada"); 
        } else {
            res.send({status: "error en el logout", body: error})
        }
    })
})

//Login con Session: 

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query; 
    if(usuario === "tinki" && pass === "winki") {
        req.session.user = usuario; 
        res.send("inicio de sesión fue exitoso!"); 
    } else {
        res.send("Datos incorrectos, moriras rata de dos patas!"); 
    }
})

//Previo a eso creamos el middleware: 

function auth(req, res, next) {
    if(req.session.user === "tinki") {
        return next(); 
    }
    res.status(401).send("Error de autorizacion! "); 
}


//Ruta privada que requiere que el usuario se identifique

app.get("/privado", auth ,(req, res) => {
    res.send("Si llegas hasta aca es porque estas logueado correctamente"); 
})