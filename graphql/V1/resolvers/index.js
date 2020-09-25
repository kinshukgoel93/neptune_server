const users = require("../../../models/users");
const category = require("../../../models/category");
const auth = require("../../../auth/auth");
const bcrypt = require('bcryptjs');

module.exports = {
  users: () => {
    if(auth.authToken){
      return users
      .find()
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc, _id: user.id };
        });
      })
      .catch((err) => {
        throw err;
      });
    }
    
  },

  addCategory: async (args) => {
    const categorymodel = new category({
      Name: args.categoryInput.Name,
      CategoryType: args.categoryInput.CategoryType,
    });
    return categorymodel
      .save()
      .then((result) => {
        console.log(result);
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  addUsers: async (args) => {
    const usersmodel = new users({
      FirstName: args.usersInput.FirstName,
      LastName: args.usersInput.LastName,
      Email: args.usersInput.Email,
      Password: args.usersInput.Password,
      PhoneNo: args.usersInput.PhoneNo,
      Date_of_Joining: new Date(args.usersInput.Date_of_Joining),
    });

    return usersmodel
      .save()
      .then((result) => {
        console.log(result);
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  registerUser: async (args) => {

    const EmailExists = await users.find({
      Email:args.usersInput.Email}, ["id"])
    console.log(EmailExists.length)
    if(EmailExists.length!==0){
      console.log(EmailExists)
        throw Error("Email already exists")
    }
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(args.usersInput.Password, salt);
    const newUser = {
      FirstName: args.usersInput.FirstName,
      LastName: args.usersInput.LastName,
      Email: args.usersInput.Email,
      Password: hash,
      PhoneNo: args.usersInput.PhoneNo,
      Date_of_Joining: new Date(args.usersInput.Date_of_Joining),
    }
    // newUser.accessToken = auth.generateToken(newUser)
    const usersmodel = new users(newUser);

    return usersmodel
      .save()
      .then((result) => {
        return { ...result._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  login: async (args) => {
    const user = await users.find({
      Email:args.loginInput.Email})
      
    if(user.length==0){
        throw Error("Invalid email or password")
    }

    user[0].accessToken = auth.generateToken({...user[0]._doc})
    user[0].refreshToken = auth.generateRefreshToken({...user[0]._doc})
    
    return {...user[0]._doc}
  },
};
