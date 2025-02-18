import { Router } from "express";
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { generateToken } from "../utils/jsonwebtoken.js";
const router = Router(); 
//import UserModel from "../models/user.model.js";
//import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

//Ruta para registrar nuevo usuario: 

// router.post("/register", async (req, res) => {
//     const {first_name, last_name, email, password, age} = req.body; 
    
//     try {
//         //Verificamos si el correo electronico ya esta registrado: 
//         const existeUsuario = await UserModel.findOne({email: email}); 

//         if(existeUsuario) {
//             return res.status(400).send("El email ya esta registrado, rata!"); 
//         }

//         //Creamos un nuevo usuario: 
//         const nuevoUsuario = await UserModel.create({first_name, last_name, email, password: createHash(password), age}); 

//         //res.status(200).send("Usuario creado con exito"); 
//         res.redirect("/login"); 
//     } catch (error) {
//         console.log(error);
//         res.send("Error fatal, todos moriremos!"); 
//     }
// })

//Version de registro usando Passport: 

//No se olviden de importar "passport": 
// import passport from "passport";

// router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failedregister"}), async (req, res) => {
//    res.redirect("/login"); 
// })

// router.get("/failedregister", (req, res) => {
//     res.send("Tenes un registro fallido, moriras!!"); 
// })


//Ruta para hacer el login: 


// router.post("/login", async (req, res) => {
//     const {email, password} = req.body; 

//     try {
//         const usuario = await UserModel.findOne({email: email}); 
//         if(usuario) {
//             //if(usuario.password === password) {
//             if(isValidPassword(password, usuario)) {
//                 req.session.user = {
//                     email: usuario.email, 
//                     age: usuario.age, 
//                     first_name: usuario.first_name, 
//                     last_name: usuario.last_name
//                 }

//                 res.redirect("/profile"); 
//             } else {
//                 res.send("Contraseña no valida, vete hacker, no me robes!"); 
//             }

//         } else {
//             res.status(404).send("Usuario no encontrado, escribi bieeen!"); 
//         }
        
//     } catch (error) {
        
//     }
// })

//LOGIN VERSION PASSPORT: 

// router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}), async (req, res) => {
//     //Aca creamos la session: 
//     req.session.user = {
//         first_name: req.user.first_name, 
//         last_name: req.user.last_name, 
//         age: req.user.age, 
//         email: req.user.email
//     }

//     res.redirect("/profile"); 

// })

// router.get("/faillogin", (req, res) => {
//     res.send("Fallo el login se suspende el invierno! "); 
// })


//Logout: 

// router.get("/logout", (req, res) => {
//     if(req.session.user) {
//         req.session.destroy(); 
//     }
//     res.redirect("/login"); 
// })

//////////////////////////////////////////////////////////////////////////////////

//VERSION CON GITHUB: 

// router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {})

// router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
//     //La estrategia de Passport-Github nos retornará el usuario, entonces lo agregamos a nuestro objeto de session. 
//     req.session.user = req.user;  
//     res.redirect("/profile"); 
// })

//////////////////////////////////////////////////////////////////////////////////

//REGISTRO CON JSONWEBTOKEN: 

router.post("/register", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body; 

    try {
        const existeUsuario = await UserModel.findOne({email:email}); 

        if(existeUsuario) {
            return res.status(400).send("El email ya esta usado en nuestra base de datos, por que te equivocas tanto? Deberias estudiar mas!"); 
        }

        //Creamos un nuevo usuario: 
        const nuevoUsuario = await UserModel.create({
            first_name, 
            last_name, 
            email, 
            password:createHash(password), 
            age
        })

        //Generamos  un token: 
        const token = generateToken({
            id:nuevoUsuario._id, 
            nombre: nuevoUsuario.first_name, 
            apellido: nuevoUsuario.last_name
        })

        res.status(201).send({mensaje: "Usuario creado con exito, la vida te sonrie, el sol brilla como el de los teletubbies", token}); 

    } catch (error) {
        console.log(error); 
        res.status(500).send("Dedicate a otra cosa"); 
    }
})

//Login para JSON WEB TOKEN: 

router.post("/login", async(req, res) => {
    const {email, password} = req.body; 

    try {
        const usuario = await UserModel.findOne({email: email}); 

        if(!usuario) {
            return res.status(400).send("Y ese usuario de donde salio? Registrate papaaaa"); 
        }

        if(!isValidPassword(password, usuario)) {
            return res.status(401).send("Credenciales embrujadas! Esta cuenta no te pertenece! Vete ladron malvado!"); 
        }

        //Si la contraseña es correcta, generamos el token: 

        const token = generateToken({
            id: usuario._id,
            first_name: usuario.first_name,
            apellido: usuario.last_name, 
            email: usuario.email
        })

        res.send({mensaje: "Todo perfecto! podes pasar!", token}); 
    } catch (error) {
        console.log(error); 
        res.status(500).send("Todo mal, mira la consola que esta ahi el error"); 
    }
})


export default router; 