//CLASE 2 - COOKIES SESSION Y STORAGE 2. 

//Recordemos: Una sesión es un vínculo que se geera entre el cliente y el servidor, la data se guarda en el servidor pero el cliente almacena el sessionId. 

//Practicamos memory storage: almacenaje en el espacio volatil del servidor. 

//File Storage: 
//1) Instalamos: npm i session-file-store
//2) Importamos el modulo. 
//3) Lo inicializamos conectandonos a la session. 

//Despues de ver las desventajas de File Storage, vamos a trabajar con MongoDB: 

//1) Instalamos: npm i connect-mongo
//2) Importamos MongoStore
//3) Lo usamos a nive middleware

import express from "express";
const app = express();
const PUERTO = 8080;
import session from "express-session";
import FileStore from "session-file-store";
//No se olviden de inicializarlo: !!!!!
//const fileStore = FileStore(session); 
import { engine } from "express-handlebars";

import MongoStore from "connect-mongo";
import "./database.js";
import viewsRouter from "./router/views.router.js"; 
import sessionsRouter from "./router/sessions.router.js"; 

//Middleware
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    //1) Creamos una sesión con Memory Storage: 
    secret: "secretCoder", 
    resave: true, 
    saveUninitialized: true,

    //2) Utilizado File Storage: 
    //store:  new fileStore({path: "./src/sessions", ttl: 5, retries: 1})
    //Path: la ruta donde se guardan los archivitos de sesion. 
    //ttl: Time To Live! (En segundos va). 
    //retries: cantidad de veces que el servidor tratará de leer el archivo. 

    //3) Utilizando Mongo Storage: 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}));

//Rutas
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter); 

//Login simple de usuario: 
// app.get("/login", (req, res) => {
//     let usuario = req.query.usuario;

//     req.session.usuario = usuario;
//     res.send("Guardamos el usuario por medio de una query");
// })

//Verificamos el usuario: 

// app.get("/usuario", (req, res) => {
//     if (req.session.usuario) {
//         return res.send(`El usuario registrado es el siguiente: ${req.session.usuario}`);
//     }
//     res.send("No tenemos un usuario registrado, vamos a morir");
// })


app.listen(PUERTO, () => console.log(`Escuchando en el ${PUERTO}`)); 