//PATRON DE DISEÑO SINGLETON: 
//Lo usamos pra tener una instancia GLOBAL en toda la aplicación. 
//Este patron verifica si ya existe una instancia de esta clase, en caso de que si exista, retorna esa instancia, caso contrario la crea. 


import mongoose from "mongoose";



class BaseDatos {
    static #instancia; 
    constructor() {
        mongoose.connect("mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }

    static getInstancia() {
        if(this.#instancia) {
            return this.#instancia; 
        }
        this.#instancia = new BaseDatos(); 
        console.log("DB funcionando!"); 
        return this.#instancia; 
    }
}

export default BaseDatos; 