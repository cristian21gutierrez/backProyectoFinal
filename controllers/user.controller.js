//importar modulos necesarios 
const {createUserService, loginUserService, getUsersService} = require("../services/user.services")

const createUser = async (req, res) => {
    try {
      const newUser = await createUserService(req.body);
      res.status(201).send("el usuario fue creado");
    } catch (error) {
        res.status(500).json({error})
    }

};
 
const loginUsers = async (req, res) => {
    try {
      const loguedUser = await loginUserService(req.body);
        res.status(200).json({loguedUser});
    } catch (error) {
        res.status(500).json({error});
    }

}

const getAllUser = async (req, res) => {
    try {
      const users = await getUsersService(req.query);
      res.status(200).json({users})
    } catch (error) {
       res.status(500).json({error})
    }

}

module.exports = {
    createUser,
    loginUsers,
    getAllUser,
}