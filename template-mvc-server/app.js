const path = require('path');
const express = require('express');
//we need to load this module to use the modules
const hbs = require('hbs');

const app = express();
//paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set templating view engine
//looks for views folder by default
app.set('view engine', 'hbs');
//or set custom view folder name
app.set('views', viewsPath);
//setup path to partials
hbs.registerPartials(partialsPath);

//res.render uses views, below is user for a public folder, not views
//so can just use this for our css/js
app.use(express.static(publicDirectoryPath));

app.use((req,res)=>{
console.log("hey");
})

app.get('',(req,res)=>{
    //can pass and object to the view
    res.render('index',{
        title: 'weather',
        createdBy: 'ronny'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
        createdBy: 'ronny'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about',
        createdBy: 'ronny'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error
        })
    }
    res.send({
        forecase: 'snow',
        location: 'Dublin',
        address: 'Dublin'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{error: 'generic 404'})
})

//uncaught routes
app.get('*',(req,res)=>{
    res.render('404',{error: 'generic 404'})
})


app.listen(3000,()=>{
    console.log('running 3000');
})