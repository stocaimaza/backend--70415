import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/Juguetes?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD"))
    .catch((error) => console.log("Tenemos un error: ", error))
