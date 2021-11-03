const router = require('express').Router();
const User = require('../models/userModel')


//auth routes
router.post('/register', async (req,res) =>{
    // creer un user
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,

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
        const users = await User.find().select();
        res.status(200).json(users)
    } catch (error) {
        res.send('unable to get users')
    }
    
}),

router.get('/single/:id', async (req,res) =>{
    const id = req.params.id;
    // try {
        await User.findById(id, (err,docs)=>{
            if (!err) {
                console.log('loooog1111');
                res.json().send(docs)
                
            } else {
                console.log('loooog2222');

                res.status(400).send('Id unknown')

            }
        });
    //     // res.json(singleUser);
    // } catch (err) {
    //     console.log('loooog3333');

    //     res.status(400).send(err)

    // }
    
}),
module.exports = router;