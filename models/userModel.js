const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:6,
        max:225,

    },
    email:{
        type:String,
        min:6,
        max:225,
        require:true,

    },
    password:{
        type:String,
        min:8,
        max:225,
        require:true,

    },
    date: {
        type: Date, 
        default: Date.now 
    },
})


module.exports = mongoose.model('User', userSchema);