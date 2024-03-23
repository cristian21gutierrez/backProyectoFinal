 //importar modulos necesarios 
const express = require("express");
const {jwtValidator} = require("../middleware/jwtValidator");

//importar controladores 
const {createUser, loginUsers, getAllUser} = require("../controllers/user.controller")

const route = express ();

//ruta para crear usuarios 
route.post("/", createUser)

//ruta para logear usuario 
route.post("/login",  loginUsers)

//ruta para obtener todos los usuarios 
route.get("/", jwtValidator, getAllUser)

module.exports = route;