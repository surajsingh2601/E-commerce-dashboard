const mongoose = require ('mongoose');    // imprting mongoose db config file 

// now we`ll make Schema to define whic types of fields we need in db collection & also we`ll define fields of type.

const  userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});




module.exports = mongoose.model("users", userSchema);