    const mongoose = require('mongoose');

    const Schema  = mongoose.Schema;

    const userSchema = new Schema({
        FirstName: {
            type : String,
            required :true
        },
        LastName : {
            type : String,
        },
        Email :{
            type :String,
            required :true
        },
        Password :{
            type :String,
            required :true
        },
        PhoneNo : {
            type : String,
        },
        Date_of_Joining : {
            type : Date,
        },
        accessToken : {
            type : String,
        },
        refreshToken : {
            type : String,
        },
        LinkedCategories : {
            type: Schema.Types.ObjectId,
            ref : 'categories'
        }
    });

    module.exports = mongoose.model('users', userSchema);