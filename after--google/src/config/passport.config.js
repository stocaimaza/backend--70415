import passport from "passport";
import UserModel from "../models/user.model.js";

//Nueva Estrategia con Google: 
import GoogleStrategy from "passport-google-oauth20";

const initializePassport = () => {
    //Nueva estrategia de Google
    passport.use("google", new GoogleStrategy({
        clientID:"111",
        clientSecret: "11",
        callbackURL: "4555"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({email: profile._json.email})

            if(!user) {
                let newUser = {
                    first_name: profile._json.given_name, 
                    last_name: profile._json.family_name, 
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

    //Serializar y Deserializar: 

    passport.serializeUser((user, done) => {
        done(null, user._id); 
    })

    passport.deserializeUser(async(id, done) => {
        let user = await UserModel.findById({_id: id}); 
        done(null, user); 
    })
}

export default initializePassport; 