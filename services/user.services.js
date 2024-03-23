//importar modulos o modelos necesarios 
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//servicio para crear usuarios 
const createUserService = async ({
    userName,
    email,
    password,
    admin,
}) => {
    //generamos un saltRound
    const saltRounds = 10;

    //hashear la contraseña para guardarla en la db
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        admin,
    });

    if (!newUser) throw new Error("hubo un error al crear el usuario")
        return newUser;   
};


const loginUserService = async ({
    userName,
    email,
    password,
}) => {
    let userFounded;
    const secretKey= process.env.SECRET_KEY;

    if(userName) {
        userFounded = await User.findOne({userName})
    }else if(email) {
      userFounded = await User.findOne({email})
    }

    if(!userFounded) throw new Error ("Las credenciales no sol validas");

    const passwordMatch = await bcrypt.compare(password, userFounded.password);

    if(!passwordMatch) throw new Error("las credenciales no son validas");

    const userWhitoutPassword = userFounded._doc;
    delete userWhitoutPassword.password
    delete userWhitoutPassword.admin

    const payload = {
        userWhitoutPassword,
    }

    const token = await jwt.sign(payload, secretKey, {
        expiresIn: "10h"
    })

    return {
        token,
        userWhitoutPassword,
    }

};

const getUsersService = async ({
    userName,
    email,
    admin,
}) => {
  const query = {};

  if(userName) {
    query.userName = userName
  }
   
  if(email) {
    query.email = email
  }

  if(admin) {
    query.admin = admin
  }

  const users = await User.find(query);

  if(users.length === 0) {
    throw new Error("no se encontraron usuarios con los filtros seleccionsados")
  }
 
  return users
}

module.exports = {
   createUserService,
   loginUserService,
   getUsersService,
}
