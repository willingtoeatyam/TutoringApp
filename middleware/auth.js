//Check to see if theres a token and header
require('dotenv').config;
const { SECRET }= process.env;
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header("x-auth-token");

    //Check if token doesn't exist
    if(!token)
        return res.status(401).json({ statusCode: 401, message: "No token, author denied!"})
    else //if token exists
        try {
            const decoded = jwt.verify(token, SECRET)

            //assign user to decoded object
            req.user = decoded.user;

            next();
        } catch (error) {
            return res.status(401).json({
                statusCode: 401,
                message: "Token is invalid"
            })
        }
}