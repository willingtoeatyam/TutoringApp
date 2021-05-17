const User = require('../models/User');
const { validationResult }  = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@route    GET   api/auth/
//@desc Auth user(student, tutor, admon) and get token
//@accesss  Public
exports.getLoggedInUser = async (req, res) =>{
    try {
        //Get User from db
        const user = await User.findById(req.user.id).select('-password')

        res.json({
            statusCode: 200,
            message: 'user gitten succesfully'
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error!");
    }
}

//@route    POST   api/auth/login
//@desc Auth user(student, tutor, admon) and get token
//@accesss  Public
exports.loginUser = async(req, res) => {
    //Check for errors
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });;
    } else {
        //destructure request body
        const { email, password } = req.body;
        try {
            //initialise user
            let user = await User.findOne({ email });

            if(!user) 
                return res.status(400).json({statusCode: 400, message: "Invalid Credentials"});
            else
            //else check password
            const isMatch = await bcrypt.compare(password. user.password);

            if(!isMatch)
                return res.status(400).json({
                    statusCode: 400, 
                    message: "Invalid credentials"
                })
            else //send token, payload and signed token
                const payload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    payload,
                    SECRET,
                    {
                        expiresIn: 360000
                    }, (err, token)  => {
                        if (err) throw err;
                        res.json({
                            statusCode: 200,
                            message: "Logged in successfully",
                            user: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                userRole: user.userRole,
                                isTutor: user.isTutor,
                                isAdmin: user.isAdmin
                            },
                            token
                        })
                    }
                )

        } catch (error) {
            console.error(err.message)   ;
            res.status(500).send("Server Error");
        }
    }
}