import express from "express"; 
const app = express(); 
const PUERTO = 8080;
import './database.js';
import jugueteRouter from "./routes/juguetes.js"; 

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.get("/", (req, res) => {
    res.send("Hola");
});

//Rutas: 
app.use("/juguetes", jugueteRouter); 

app.listen(PUERTO, () => console.log("Todo funciona"));