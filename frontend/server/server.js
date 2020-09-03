const express = require('express')
const app = express();
const path = require('path')
// const publicPath = path.join(__dirname, '..','dist')
const publicPath = path.join(__dirname, '..','public')
//heroku provides this var, local machine will be undefined but exists on heroku 
const port = process.env.PORT || 4000;
// console.log("port",process.env);

app.use(express.static(publicPath));

app.get('*',(req,res)=>{
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port,()=>{
    console.log('server running', port);
});