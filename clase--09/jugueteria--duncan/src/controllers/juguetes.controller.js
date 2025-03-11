// Importamos el Juguete Services: 
import JugueteService from "../services/juguete.services.js";
const jugueteService = new JugueteService(); 


class JugueteController {
    async crearJuguete(req, res) {
        try {
            const juguete = await jugueteService.crearJuguete(req.body)
            res.json(juguete); 
        } catch (error) {
            res.status(500).json({error: error.message}); 
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes(); 
            res.json(juguetes); 
        } catch (error) {
            res.status(500).json({error: error.message}); 
        }
    }
}


export default JugueteController; 