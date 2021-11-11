const mongoose = require("mongoose");

 mongoose.connect('mongodb://localhost:27017/WebApp').then(()=>{
    console.log("db connected")
}).catch((error)=>{
    console.log(error)
});
