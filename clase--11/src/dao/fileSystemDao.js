import fs from "fs"; 

class FileSystemDao {
    //Métodos auxiliares: 

    async leerArchivo() {
        const data = await fs.promises.readFile("./src/data/productos.json"); 
        return JSON.parse(data); 
    }

    async escribirArchivo(data) {
        await fs.promises.writeFile("./src/data/productos.json", JSON.stringify(data, null, 2)); 
    }

    ////
    async crearProducto(datosProductos) {
        try {
            // Leer el archivo: 
            const productos = await this.leerArchivo(); 

            //Agregamos el nuevo producto
            productos.push(datosProductos);

            //Escribimos el archivo actualizando
            await this.escribirArchivo(productos); 
            
            return datosProductos; 

        } catch (error) {
            throw new Error("Error al crear un producto en archivo"); 
        }
    }

    async obtenerProductos() {
        try {
            //Leemos el archivo:
            const productos = await this.leerArchivo(); 
            return productos;    
        } catch (error) {
            throw new Error("Error al obtener los productos de archivo"); 
        }
    }
}

export default FileSystemDao; 