const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;
const { isValidObjectId } = require('mongoose');



//auth routes
router.post('/register', async (req,res) =>{

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt)
    // creer un user
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashedPass,

    });

    //sauvegarder le user
    //et renvoyer response
    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }
})

router.get('/all', async (req,res) =>{
    
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users)
    } catch (error) {
        res.send('unable to get users')
    }
    
}),
router.get('/search', async (req,res) =>{
    let {username,} = req.query;
    try {
        const users = await User.find().select("-password").where("username").equals(username);
        res.status(200).json(users)
    } catch (error) {
        res.send('unable to get users')
    }
    
}),

router.get('/single/:id',  (req,res) =>{
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).send({"message":"Cet utilisateur n'existe pas"})
    }

    // try {
        
         User.findOne({_id:id}, (err,docs)=>{
            if (!err) {
                console.log('loooog1111');
                res.send(docs)
                
            } else {
                console.log('loooog2222');

                res.status(400).send('Id unknown' + id)

            }
        });
   
    
}),

router.put("/update/:id", async (req,res) =>{
    console.log('loooog1111');

    const id = req.params.id;

    // if (!ObjectId.isValid(id)) {
    //     res.status(400).send({"message":"Cet utilisateur n'existe pas"})
    // }
    try {
    console.log('loooog1111');

        await User.findOneAndUpdate(
            
            {_id:id},
            {              
               $set: {
                username:req.body.username,
                // email:req.body.email,
                // password:req.body.password,
               }                
            },
            {new:true,upsert:true, setDefaultsOnInsert:true 
            },
            (err, doc)=>{
                console.log('loooog11((((');

                if (!err) {
                     res.status(200).send(doc)
                }
                else{
                    res.status(400).json(err)
                }

            }
        
        );
        

    } catch (err) {
    console.log('looo(--11');

        res.status(400).json({"erreur":err})
    }
}),

router.delete("/delete/:id",async (req, res)=>{
    const id = req.params.id;
    await User.findOneAndDelete(id, (err,doc)=>{
        if(!err) res.status(200).json({"message":"deleted"});
        else res.send(err)
    })
})
module.exports = router;