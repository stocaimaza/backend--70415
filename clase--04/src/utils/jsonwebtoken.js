import jwt from "jsonwebtoken"; 

const private_key = "palabrasecretaparatoken"; 

export const generateToken = (user) => {
    const token = jwt.sign(user, private_key, {expiresIn: "24h"}); 
    //En este objeto de configuración le puedo colocar una fecha de expiración. 
    return token; 
}