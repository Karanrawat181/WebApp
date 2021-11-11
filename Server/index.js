// npm
const mongoose = require('mongoose');
const express = require('express')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

//model
const userModel = require('./database/user')
const productModel = require('./database/product/index');

const router = express();

router.use(express.json());

//mongodb connection
mongoose.connect('mongodb://localhost:27017/WebApp').then(() => {
    console.log("db connected")
}).catch((error) => {
    console.log(error)
});

// test route
router.get('/', async (req, res) => {

    res.send("hello");
})

// add product
router.post('/addProduct', async (req, res) => {

    const productObj = req.body.data;

    const newProduct = await productModel.create(productObj)

    res.status(200).send({
        status: "success",
        data: newProduct
    })
})

// sign in and hash the password
router.post("/addUser", async (req, res) => {

    const userObj = req.body.data;
    const password = userObj.password;
    const hash = bcrypt.hashSync(password, 10);
    userObj.password = hash;
    const newUser = await userModel.create(userObj);
         
    res.status(200).send({
        status: "success",
        message:"add user Successfully"
    })
})

// login and genrate token
router.post("/login",async(req,res)=>{
    let userObj = req.body.data;
    let pass = userObj.password;
    const user = await userModel.findOne({
        email: userObj.email,
    });

    bcrypt.compare(pass, user.password, function(err, results){
                if(err){
                    throw new Error(err)
                 }
                 if (results) {                    
                    var token = JWT.sign( userObj , "WebApp");
                    return res.status(200).send({ "message": "Login success",
                    data:token
                })
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }
               })
})

// port
router.listen(4000, () => {
    console.log("server is running");
})


