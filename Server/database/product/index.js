const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name:{
        type: String
    },
    price:{
        type:Number
    },

});

const productModel = mongoose.model('products',productSchema); 

module.exports= productModel