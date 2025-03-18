// import MongoDBDao from "../dao/mongoDBDao.js";
// import MemoryDao from "../dao/memoryDao.js";
// import FileSystemDao from "../dao/fileSystemDao.js";

import DAO from "../dao/factory.js";
const productoServices = new DAO(); 

import ProductoDTO from "../dto/producto.dto.js";

class ProductoController {
    async getProductos(req, res) {
        try {
            const productos = await productoServices.obtenerProductos(); 
            res.send(productos); 
        } catch (error) {
            res.send("Todo mal, ya tenemo sueño, que lindo dormir con 10 grados"); 
        }
    }

    async postProducto(req, res) {
        // const { nombre, categoria, precio } = req.body; 
        try {

            const productoDTO = new ProductoDTO(req.body); 
            const producto = await productoServices.crearProducto(productoDTO); 
            res.send(producto); 
        } catch (error) {
            res.send("Todo mal, vuelve el verano... siiiiii!!"); 
        }

    }
}

export default ProductoController; 