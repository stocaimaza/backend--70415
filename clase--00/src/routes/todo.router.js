import { Router } from "express";
const router = Router(); 
import TodoModel from "../models/todo.model.js";

//Rutitas

//Recuperamos todas las actividades del dia:
router.get("/", async (req, res) => {
    try {
        const todos = await TodoModel.find().lean();
        res.render("todos", {todos}); 
    } catch (error) {
        res.status(500).send("Error en el servidor, nos vamos a morir sin dinero y jovenes")
    }
})


//Ruta para crear un nuevo Tuduuuuu

router.post("/todos", async (req, res ) => {
    const {title, description} = req.body; 
    const nuevoTodo = new TodoModel({title, description}); 

    try {
        await nuevoTodo.save(); 
        res.redirect("/"); 
    } catch (error) {
        res.status(500).send("Si sale esto Eliana no aprueba"); 
    }
})

//Rutita para ver el formulario para crear nuevo: 
router.get("/new", (req, res) => {
    res.render("new"); 
})

//Ruta para marcar tudu como completado. 

router.post("/todos/:id/complete", async (req, res) => {
    try {
        const todoBuscado = await TodoModel.findById(req.params.id); 
        todoBuscado.completed = true; 
        await todoBuscado.save(); 
        res.redirect("/");
    } catch (error) {
        res.status(500).send("No se olviden de entregar el TP Final de backend 1");
    }
})

//Ruta para eliminar una actividad o tudu

router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id); 
        res.redirect("/");
    } catch (error) {
        res.status(500).send("No se olviden de entregar el TP Final de backend 1");
    }
})


export default router; 