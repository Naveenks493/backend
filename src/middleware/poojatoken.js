const jwt = require( "jsonwebtoken" );
require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

const generateToken = (id) =>{
    const token = jwt.sign( 
        { id }, 
        jwt_secret,
        { expiresIn :"1h" }
     )
     return token;
};

module.exports = generateToken;