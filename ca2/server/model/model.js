const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    type : {
        type: String,
        required: true,
                    },
    price : String    
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;