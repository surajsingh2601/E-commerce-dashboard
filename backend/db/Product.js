const mongoose = require ('mongoose');    // imprting mongoose db config file 

// now we`ll make Schema to define whic types of fields we need in db collection & also we`ll define fields of type.

const  productSchema= new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    user_id:String,
    company:String
});




module.exports = mongoose.model("product", productSchema);