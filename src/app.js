const express = require('express');
const path = require('path');
const publicPathDev = path.join(__dirname,'..','frontend', 'public')
const publicPathProd = path.join(__dirname,'..','frontend', 'production')
let publicPath;
//just loads file so that it runs, not actually grabbing anything
require('./db/mongoose');
const app = express();

//CHECK ENVIRONMENT
if(process.env.NODE_ENV === 'production') {
    publicPath = publicPathProd;
}
else {
    publicPath = publicPathDev;
}

//MIDDLEWARE CUSTOM
app.use((req, res, next)=>{
    console.log("*********** NEW REQUEST ***************");
    console.log("request methods: ",req.method);
    console.log("req.originalUrl",req.originalUrl);
    console.log("authorization header: ", !req.headers.authorization ? 'NO AUTH HEADER': req.headers.authorization.substr(0,12));
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
})
//MIDDLEWARE CUSTOM -END

//import router and use below
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//MIDDLEWARE PROVIDED BY EXPRESS
//should run on all request
app.use(express.json());
//MIDDLEWARE PROVIDED BY EXPRESS -END

//API use routers
app.use(userRouter);
app.use(taskRouter);

//serve assets for frontend
app.use(express.static(publicPath));
//serve react app
app.get('*', (req,res, next)=>{
    res.sendFile(path.join(publicPath, 'index.html'))
})

module.exports = app;

/*
Flow of this file
->middleware runs (runs before route handler)
->route handler runs
*/

