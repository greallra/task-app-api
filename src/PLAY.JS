//encryption is two way
//hashing is one way
const funk = async ()=>{
    //this generates token and provides to client
    const token = jwt.sign({
        _id: 'abc123' //info embedded in token: publicly viewable
    }, 'mysecret',//secret
    {expiresIn: '7 days'}); //expiratoin
    //token composed of = base64.payload.signature
    console.log(token);

    //verify token //if wrong an error will be thrown
    const data = jwt.verify(token, 'mysecret') //needs to be exact same secret
    console.log(data);
}
// funk();

// const Task = require('./models/task');
// async function funk () {
//     const u = await Task.findOneAndDelete({_id:"5f1e9afa1e6d15614559c26f",
//     owner: "5f1e8cd4229efc5d6cdcd9e1"
//     })
//     console.log(u);
// }
// funk()
