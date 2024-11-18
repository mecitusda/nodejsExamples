const jwt = require('jsonwebtoken');
const blackList =  require('../models/blacklist');
module.exports =async (req,res,next) => {
    const token = req.header('x-auth-token'); // x-auth-token is the key in the header
    
    if(!token) return res.status(401).json({message: 'Access Denied: No token provided'}); // 401 is unauthorized
    try{
        const isTokenExist = await blackList.findOne({token: token});//to check if the token is in the blacklist
        if(isTokenExist) return res.status(401).json({message: 'Access Denied: Token in blacklist'});//if the token is in the blacklist
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);//to verify the token
        req.user = verified;//to get the user id from the token for user interface
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}