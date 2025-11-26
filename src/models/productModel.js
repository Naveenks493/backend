const mongoose = require('mongoose');

const poojaProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category:{type:String , required:true},
    reviews:{type:Number, required:true},
    image:{type:String},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PoojaProduct', poojaProductSchema);
