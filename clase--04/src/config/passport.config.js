//Instalamos: npm i passport passport-local

//Importamos los módulos: 

import passport from "passport";
import local from "passport-local"; 

import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";

const LocalStrategy = local.Strategy; 

//Passport con GitHub: 
//Importamos la estrategia nueva: GitHub
import GitHubStrategy from "passport-github2"; 


const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true, 
        //Le permito acceder al objeto request con esta configuracion. 
        usernameField: "email"
    }, async (req, username, password, done) => {
        
        const {first_name, last_name, email, age} = req.body; 
        
        try {
            //Verificamos si ya existe un registro con ese email: 
            let user = await UserModel.findOne({email}); 
            if(user) return done(null, false); 
            //Si no existe un usuario con ese email en mi bd voy a crear un registro nuevo: 
            let newUser = {
                first_name, 
                last_name, 
                email, 
                age, 
                password : createHash(password)
            }

            const result = await UserModel.create(newUser); 
            return done(null, result); 

        } catch (error) {
            return done(error); 
        }
    })); 

    //Agregamos otra estrategia ahora para el Login: 
    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {

        try {
            //Busco el usuario por el email: 
            const user = await UserModel.findOne({email}); 
            if(!user) {
                console.log("Este usuario no existe ahhhhhhh policiaaaaaa"); 
                return done(null, false); 
            }

            //Si existe verifico la contraseña: 
            if(!isValidPassword(password, user)) return done(null, false); 
            return done(null, user); 

        } catch (error) {
            return done(error); 
        }
    }))

    //Tenemos que serializar y deserializar usuarios. 

    passport.serializeUser((user, done) => {
        done(null, user._id); 
    })

    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById({_id: id}); 
        done(null, user);
    })

    //Acá desarrollamos nuestra nueva estrategia con GitHub: 
    passport.use("github", new GitHubStrategy({
        clientID: "Iv23li6ysvMQvS4IYMj2", 
        clientSecret: "0a23fafb383d58380311cd1d5de79f3985b58b18", 
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        console.log("Perfil re loco ahh: ", profile); 

        try {
            let user = await UserModel.findOne({email: profile._json.email})

            if(!user) {
                let newUser = {
                    first_name: profile._json.name, 
                    last_name: "", 
                    age: 37, 
                    email: profile._json.email,
                    password: ""
                }

                let result = await UserModel.create(newUser);
                done(null, result); 
            } else {
                done(null, user); 
            }
        } catch (error) {
            return done(error); 
        }

    }))
    

}

export default initializePassport; 