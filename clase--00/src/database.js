import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/Repaso?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Nos conectamos a la BD"))
    .catch((error) => console.log("Todo marcha mal: ", error))