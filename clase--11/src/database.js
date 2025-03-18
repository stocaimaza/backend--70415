import mongoose from "mongoose";

mongoose.connect("mongodb+srv://coderhouse70410:coderhouse@cluster0.34nyl.mongodb.net/dao?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados"))
    .catch(() => console.log("Error"))
    