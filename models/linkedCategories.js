const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const linkedcategoriesSchema = new Schema({
   user :{
       type: Schema.Types.ObjectId ,
       ref : 'users'
   }
});

module.exports = mongoose.model('LinkedCategories', linkedcategoriesSchema);