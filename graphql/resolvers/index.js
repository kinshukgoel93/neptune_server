const users = require("../../models/users");
const category = require("../../models/category");

module.exports = {
  users: () => {
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
};
