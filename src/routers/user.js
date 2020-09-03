const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth'); //middleware
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');

//SIGNUP - will use JWT
router.post('/users',async (req, res)=>{
    //create new user instance
    const user = new User(req.body);
    try {
       //save
        await user.save();
        //this is async below but no need to await
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.message})
    }
})

//LOGIN - will use JWT
router.post('/users/login', async (req, res)=>{
    console.log("users route");
    try {
        //creating a custom middleware -- static middleware function because we use it on Model - User
        const user = await User.findByCredentials(req.body.email, req.body.password);
        
        //creating a custom middleware -- method middleware function because we use it on instance - user
        //send token
        const token = await user.generateAuthToken();
        
        //save token(s) to db
        user.tokens = user.tokens.concat({token: token});
        await user.save();
        
        // send back user and token to client- if error isnt thrown above this below line will run
        //toJSON is a model method function that runs on model to filter what we send back to user
        res.send({user, token});
    } catch (e) {
        console.log("my error", e.message);
        res.status(400).send({error: e.message});
    }
})

//LOGOUT
router.post('/users/logout', auth, async (req, res)=>{
    //we have access to user and token
    try {
        /*
        we loop through the tokens array and filter out the token
        on the device user is logging out in, essentially removing that token only
        */
       //create new keys called tokens(new array which is model format) on user obj
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        //success
        res.send({success: 'logged out'});
    } catch (e) {
        console.log(e);
        res.status(500).send({error: e.message});
    }
})
//LOGOUT ALL
router.post('/users/logoutAll', auth, async (req, res)=>{
    try {
        //have acccess to tokens, simply empty token array
        req.user.tokens = []
        await req.user.save();
        //success
        res.send();
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

//altered to get one profile
router.get('/users/me', auth, async (req,res)=>{
    //auth was already done
    res.send(req.user)
})

router.patch('/users/me', auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    console.log("req.body",req.body);
    const allowedUpdates = ['name', 'email','password','age'];
    //check the properties to update are allowed
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation) {
 
        return res.status(400).send({error: 'Invalid updates'})
    }
   /*
    const options = {
        new: true, //return the updated user
        runValidators: true
    }
*/
    try {
        //changed findByIdAndUpdate to findById because pre.save(middleware) wont work on former
        const user = req.user;
        //then dynamically update user 
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        //now middleware will run
        await user.save();
        res.status(200).send(user);
    } catch (e) {
       console.log("e catch",e);
        //could be 2 types of erros, 1: server, 2: validation
        //2: validation
        res.status(400).send(e);
    }
})

//DELETE USER
router.delete('/users/me', auth, async (req, res)=>{
    try {
        await req.user.remove();
        // sendCancellationEmail(req.user.email,req.user.name)
        res.status(200).send({success: 'user deleted'});
    } catch (e) {
        console.log(e);
        res.send(500).send({error: 'coudlnt delete user'});
    }
})

const upload = multer({
    //by removing dest, the data is passed into the function (route below: req.file)
    // dest: 'avatars',
    limits: {
        //1mb = one million
        fileSize: 1000000,  
    },
    // filter certain files
    fileFilter(req, file, cb) {
        //to throw error cb(new Error('file must be pdf'))
        //success = cb(undefined, true)
        //reject upload = cb(undefined, false)
        
        //
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('images only'))
        }
        cb(undefined, true)
    }
})
// const middle =(req, res, next)=>{
//     throw new Error('i can be customized in a middleware')
// }


//'upload' needs to match key in postman
//2 middlewares is possible
router.post('/users/me/avatars', auth, upload.single('avatar') , async (req, res)=>{
    console.log("file", req.file);
    //using sharp here
    //convert to png (all images will be png) + resize
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
   
    //because middleware is in place, req may not even get here below
    //all images checking has been done in middleware
    req.user.avatar = buffer;
    await req.user.save()
    res.send();
    //redner html src="data:images;base64,[data]"
    //this 4th param handles an error that is throw
}, (error, req, res, next)=>{
    console.log(error);
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatars', auth, async(req, res)=>{
    req.user.avatar = undefined; 
    await req.user.save();
    res.send();
}, (error, req, res, next)=>{
    //will receive an error thrown in a middleware function

    res.status(400).send({error: error.message})
})
//url to paste in browser http://localhost:3000/users/5f1ea7b14888f3644abe20e5/avatar
router.get('/users/:id/avatar', async(req, res)=>{
    
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error();
        }
        //set a response header
        //its automatically set to application/json
        //here we seding images
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        console.log("e",e.message);
        res.status(404).send({error: e.message});
    }
})

module.exports = router;