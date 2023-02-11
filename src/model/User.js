const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    tasks:[String]
})

const User=new mongoose.model('users',userSchema);

module.exports=User;