import { Router } from "express";
const router = Router(); 

//Ejemplo 1: Espero un nombre de cliente

// router.get("/nombre/:cliente([a-z]+)", (req, res) => {
//     //Aca en esta situacion yo estoy esperando un parametro por url, el nombre de un cliente. 
//     //¿Que pasa si el usuario ingresa numeros  o caracteres especiales en lugar de palabras?

//     if(req.params.cliente) {
//         res.send("Cliente valido: " + req.params.cliente);
//     } else {
//         res.send("Cliente invalido"); 
//     }
// })

//Otra forma de hacerlo: 

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = req.params.email; 

    if(patronCorreo.test(email)) {
        res.send("Email Valido: " + email); 
    } else {
        res.send("Email invalido, todos moriremos de calor"); 
    }
})

//3) Validando Parametros: 
//Supongamos que al crecer mi aplicación, voy a tener que generar muchas rutas que reciban el mismo parametro. Por ejemplo: 

//Metodo GET
router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a obtener un recurso a partir del parametro cliente. 
    res.send("Obteniendo recurso para el cliente: " + req.params.cliente); 
})

//Metodo POST
router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a enviar un recurso a partir del parametro cliente. 
    res.send("Enviando recurso para el cliente: " + req.params.cliente); 
})

//Metodo PUT
router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a actualizar un recurso a partir del parametro cliente. 
    res.send("Actualizando recurso para el cliente: " + req.params.cliente); 
})


//Metodo DELETE
router.delete("/nombre/:cliente([a-z]+)", (req, res) => {
    //Voy a eliminar un recurso a partir del parametro cliente. 
    res.send("Eliminando recurso para el cliente: " + req.params.cliente); 
})


//Nos encontramos que en los 4 metodos hay lineas de codigo que van a ser iguales y se van a repetir. 

//a) Obtener el parametro Cliente. 
//b) Buscar el parametro en la base de datos. 
//c) Una vez validado, continuar con la operacion que corresponda. 

//Esto lo simplificamos creando un middleware llamado "router.param": 


router.param("cliente", (req, res, next, cliente) => {
    const clientes = ["firulais", "lionel", "pepe"]; 

    if(clientes.includes(cliente)) {
        req.cliente = cliente; 
        next(); 
    } else {
        res.status(404).send("Cliente no encontrado"); 
    }
})

export default router; 