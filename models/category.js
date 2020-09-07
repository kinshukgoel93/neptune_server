const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const categoriesSchema = new Schema({
    Name: {
        type : String,
        required :true
    },
    CategoryType : {
        type : String,
    },   
});

module.exports = mongoose.model('categories', categoriesSchema);