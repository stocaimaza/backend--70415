import { Router } from "express";
const router = Router(); 
import ProductoController from "../controllers/producto.controller.js";
const productoController = new ProductoController(); 

//Usaremos dos metodos muy simples: 

router.get("/", productoController.getProductos);
router.post("/", productoController.postProducto);


export default router; 
