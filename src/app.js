const express = require('express');
//just loads file so that it runs, not actually grabbing anything
require('./db/mongoose');
const app = express();

//import router and use below
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//MIDDLEWARE CUSTOM
// app.use((req, res, next)=>{
//     console.log("MIDDLEWARE CUSTOM", req.method, req.path);
//     if(req.method === 'GET') {
//         res.send('get requests are disbled')
//     } else {
//         next();
//     }

//     //req wont move on until we call next
// })
//now these are defined in certain routes
//MIDDLEWARE CUSTOM -END

//MIDDLEWARE PROVIDED BY EXPRESS
//should run on all request
app.use(express.json());
//use routers
app.use(userRouter);
app.use(taskRouter);
//MIDDLEWARE PROVIDED BY EXPRESS -END

module.exports = app;
/*
Flow of this file
->middleware runs (runs before route handler)
->route handler runs
*/

