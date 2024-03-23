//importar modulos necesarios 
const jwt = require("jsonwebtoken");

const jwtValidator = async (req, res, next) => {
    const authHeader= req.headers["authorization"];

    if(!authHeader) {
        return res.status(401).json({
           msge: "yout token is not valid"
        })
    }

    const [bearer, token] = authHeader.split(" ")

    if(bearer !== "Bearer" || !token) {
        return res.status(401).json({
            msge: "yout token is not valid"
         }) 
    }

    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, (error) => {
        if (error) {
            return res.status(401).json({
                msge: "yout token is not valid"
             }) 
        }
    })
     
 next();
}


module.exports = {
    jwtValidator,
}