import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados con Exito!"))
    .catch((error) => console.log("Houston tenemos un problema: ", error))