const express = require ('express'); 

// const cors = require('cors');                   // importing cors to debug the cors errors
require('./db/config');                          // importin db config
const User= require('./db/User');             // importin db users
const Product= require('./db/Product');       // importin db users

const app = express();

app.use(express.json());             // using middileware to control data`s whose we send api datas through postman.
// app.use(cors());                  // using CORS as a middilewere to 
// we`ll make route........

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result= await user.save();
    result= result.toObject();
    delete result.password 
    resp.send(result);
})

app.post("/login",async (req,resp)=>{
    console.log(req.body);
    if ( req.body.password  && req.body.email )
    {

        // resp.send(req.body);
    let user =await User.findOne(req.body).select("-password");
    if (user) 
    {
     resp.send(user)          
    } else {
     resp.send({result: "No User Found"});
    }
    }
    else {
        resp.send({result: "No User Found"});
       }
})

app.post("/add-product", async (req,resp)=>{
    let product = new Product(req.body);
    let result= await product.save();
    resp.send(result);
})

app.get("/products", async(req, resp) => {
   // resp.send('data get successfully');
   let products= await Product.find();
   if (products.length > 0) {
    resp.send(products);
   } else{
    resp.send({result:"No Products Found"})
   }
});


app.delete("/delete-product/:id", async (req, resp) => {
   // resp.send(req.params.id);
    const result = await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});


app.get("/search/:key",  async(req, resp)=> {
   // resp.send('loading....')
    const result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    resp.send(result);
});

app.get("/users/",  async(req, resp)=> {
    // resp.send('loading....')
     const result = await User.find({});
     resp.send(JSON.stringify(result));
 });

app.listen(5000);