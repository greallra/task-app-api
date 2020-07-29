/*
-loads in app
-sets up port listen
WHY? - so we can test using supertest
*/
const app = require('./app');
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log("server running on port " + port);
})
