class ProductoDTO {
    constructor(objeto) {
        this.nombre = objeto.nombre,
        this.categoria = objeto.categoria, 
        this.precio = objeto.precio, 
        this.fullname = `${objeto.nombre} ${objeto.categoria}`
    }
}

export default ProductoDTO; 