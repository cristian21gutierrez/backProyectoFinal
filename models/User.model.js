//imporar modelos y esquemas 

const {Schema, model}  = require("mongoose");

//crear un nuevo schema para el modelo de usuarios 

const userSchema = new Schema({
  //definir campo userName
  userName: {
    type: String,
    require: true, 
    unique: true,  
  }, 
  email: {
    type: String,
    require: true, 
    unique: true, 
  }, 
  password: {
    type: String,
    require: true, 
     
  },
  admin: {
    type: Boolean, 
    default: false 
  }
})

//exportar el modelo User utilizando el Schema userSchema

module.exports = model("User", userSchema);