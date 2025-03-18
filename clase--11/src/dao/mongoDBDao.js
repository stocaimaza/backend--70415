import ProductoModel from "../models/producto.model.js";

class MongoDBDao {
    async crearProducto(datosProducto) {
        try {
            const producto = new ProductoModel(datosProducto); 
            return await producto.save(); 
        } catch (error) {
            throw new Error("Error al crear el Producto en MongoDB"); 
        }
    }

    async obtenerProductos() {
        try {
            return await ProductoModel.find(); 
        } catch (error) {
            throw new Error("Error al obtener los Productos de MongoDB"); 
        }
    }
}

export default MongoDBDao; 