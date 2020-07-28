const jwt = require('jsonwebtoken');
//validate token provided by user
const User = require('../models/user');
//find token in db
//HANLDES LOGIN BY ADDING TOKEN
//HANDLES LOGOUT BY DELETING A PARTICULAR TOKEN
const auth = async (req, res, next) => {
    console.log("auth middleware");
    try {
        //get token from header
        const token =  req.header('Authorization').replace('Bearer ', '');
        //check token validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //get user from token to get them from db // 2nd param checks token array to see if token exists
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        console.log("req.headers---", req.headers);
        console.log("token---", token);
        console.log("user----", user);
        console.log("decoded._id,----", decoded._id);
        if(!user) {
            throw new Error()
        }  
        //success // pass user + token to the req so we dont have to do it again in the route
        req.token = token;
        req.user = user;
        next()
    } catch (e) { //if not valid this will run, next wont be called
        console.log(e);
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth;