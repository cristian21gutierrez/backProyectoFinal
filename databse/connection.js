const mongoose = require("mongoose");

const connection = async () => {
    try {
        const conectionString = process.env.CONECTION_STRING;
        await mongoose.connect(conectionString);
        console.log("la conexion fue exitosa")
    } catch (error) {
        
    }

}


module.exports = {
    connection,
}