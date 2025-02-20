//TRABAJEMOS CON LA ESTRATEGIA PASSPORT-JWT: 
//1) Instalamos: npm i passport passport-jwt
//2) Recuerden instalar cookie parser!

import passport from "passport"; 
import jwt from "passport-jwt"; 

const JWTStrategy = jwt.Strategy;  //Core de la estrategia de JWT
const ExtractJwt = jwt.ExtractJwt; //Extractor de jwt ya sea de header, cookies, etc. 

//Creamos el Cookie Extractor: 

const cookieExtractor = (req) => {
    let token = null; 
    //Corroboramos que hay alguna cookie que tomar
    if(req && req.cookies) {
        token = req.cookies["coderCookieToken"]; 
        //Tomamos la cookie que necesitamos. 
    }
    return token; 
}


const initializePassport = () => {
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse"   
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload); 
        } catch (error) {
            return done(error); 
        }
    }))
}



//No se olviden configurar la App.js
export default initializePassport; 
