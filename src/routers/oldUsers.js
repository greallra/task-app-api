router.patch('/users/:id', async(req,res)=>{
    
    const id = req.params.id;
    const updates = Object.keys(req.body);
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
        const user = await User.findById(id);
        //then dynamically update user 
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        //now middleware will run
        await user.save();
        
        // const user = await User.findByIdAndUpdate(id, req.body, options);
        if(!user) return res.status(404).send();
        res.status(200).send(user);
    } catch (e) {
        //could be 2 types of erros, 1: server, 2: validation
        //2: validation
        res.status(400).send(e);
    }
})


router.delete('/users/:id', auth, async (req, res)=>{
    const id = req.params.id;
   
    try {
        const userDeleted = await User.findByIdAndDelete(id);
        if(!userDeleted) {res.status(404).send()}
        res.send(userDeleted);
    } catch (e) {
        console.log(e);
        res.send(500).send();
    }
})

//this route is now done by login user
// router.get('/users/:id',async (req,res)=>{
//     const id = req.params.id;
//     try {
//         const oneUser = await User.findById(id);
//         res.status(200).send(oneUser);
//     }catch (e) {
//         res.status(500).send(e)
//     }
// })
