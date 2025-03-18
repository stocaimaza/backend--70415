class MemoryDao {
    constructor() {
        this.productos = []; 
    }
    async crearProducto(datosProducto) {
        try {
            this.productos.push(datosProducto)
        } catch (error) {
            throw new Error("Erorr al crear un producto en memoria");
        }
    }

    async obtenerProductos() {
        try {
            return this.productos; 
        } catch (error) {
            throw new Error("Erorr al obtener los productos de memoria");
        }
    }
}

export default MemoryDao; 