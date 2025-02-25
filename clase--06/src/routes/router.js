//Creando un Custom Router: 

import express from "express"; 
const router = express.Router(); 

class Router {
    constructor() {
        this.router = router; 
        this.init(); 
    }

    getRouter() {
        //Devuelve el objeto router. 
        return this.router; 
    }

    get(path, ...callbacks) {
        //Definimos una ruta get en el router. 
        //El primer argumento es la ruta. 
        //Los siguientes son los callbacks que se ejecutaran cuando haga get en esta ruta determinada. 
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (req, res, next) => {
            try {
                await callback(req, res, next); 
            } catch (error) {
                res.status(500).send("Error mortal"); 
            }
        })
    }

    //Custom Responses: 
    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload}); 
        res.sendServerError = error => res.status(500).send({
            status: "error", error
        }); 
        res.sendUserError = error => res.status(400).send({status: "Error terrible", error}); 
        next(); 
    }
}

export default Router; 

