import Router from "./router.js";

class UserRouter extends Router {
    init() {
        //Aca colocamos todas las rutas: 
        this.get("/", (req, res) => {
            //res.send("Get de Usuarios"); 
            //res.sendSuccess("Hola Alumnos, tenemos hambre, casi es la cena"); 
            res.sendServerError("Error del servidor, vamos a morir, el chatgtp3 cobro vida"); 
        })
    }
}

export default UserRouter; 