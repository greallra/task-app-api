// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectID;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const { MongoClient, ObjectID} = require('mongodb');

const id = new ObjectID();
// console.log(id.toHexString());
/*
command to start server
/Users/macbookprolate2012/mongodb/bin/mongod --dbpath /Users/macbookprolate2012/mongodb-data
*/
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client)=>{
    if(error){
        return console.log("db connection error");
    }
    console.log("connected!!");
    const db = client.db(databaseName);

    const prom = db.collection('users').updateOne(
        {name: 'mikey'},
        {
            $inc: {age : 3}
        }
    )
    prom.then((r)=>{
        console.log("yes", r.count);
    })
   .catch(()=>{
       console.log("e");
   })
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'mile',
    //     age: 23
    // },(err,result)=>{
    //     if(err)return console.log('insert problem');
    //     console.log(result);
    // })
    // db.collection('tasks').insertMany([
    //     {  description: 'walk dog',
    //        isDone: false
    //     },
    //     {  description: 'clean shed',
    //        isDone: true
    //     },
        
    // ],(err,result)=>{
    //         if(err)return console.log('insert problem');
    //         console.log(result.ops);
    // })
});