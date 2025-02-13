import { Router } from "express";
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
import passport from "passport";

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failedregister"}), async (req, res) => {
   res.redirect("/login"); 
})

router.get("/failedregister", (req, res) => {
    res.send("Tenes un registro fallido, moriras!!"); 
})


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

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}), async (req, res) => {
    //Aca creamos la session: 
    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name, 
        age: req.user.age, 
        email: req.user.email
    }

    res.redirect("/profile"); 

})

router.get("/faillogin", (req, res) => {
    res.send("Fallo el login se suspende el invierno! "); 
})


//Logout: 

router.get("/logout", (req, res) => {
    if(req.session.user) {
        req.session.destroy(); 
    }
    res.redirect("/login"); 
})


export default router; 