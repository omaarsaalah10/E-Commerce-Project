import mongoose from "mongoose";


export const dbConnection =   mongoose.connect("mongodb+srv://omarsalah:omar1022005@cluster0.mnr5yfb.mongodb.net/ECommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB Connected to ECommerce"))
.catch((error) => console.log(error));
