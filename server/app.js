//importar los modulos necesarios
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const {connection} = require ("../databse/connection");



//importar nuestras rutas 
const userRoutes = require("../routes/user.routes")

//configurar dotenv para leer variable de entorno 
dotenv.config();

//crear una instancia de express
const app = express();

//configurar express para manejar solicitudes json
app.use(express.json());

//configurar morgan 
app.use(morgan("dev"))



//definir las rutas
app.use("/users", userRoutes);

//obteniendo el valor del puerto
const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`estamos escuchando el puerto ${port}`)
});

connection();
