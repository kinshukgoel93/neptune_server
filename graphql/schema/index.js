const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type user {
    _id : ID!,
    FirstName : String!
    LastName  : String
    Email     : String!
    Password  : String!
    PhoneNo   : String
    Date_of_Joining : String
}

type AddCategory{
    _id : ID! ,
    Name : String!
    CategoryType : String!
}


input CategoryInput {
    Name : String!
    CategoryType : String!
}

input UsersInput {
    FirstName:String!
    LastName: String 
    Email : String!
    Password: String!
    PhoneNo : String
    Date_of_Joining : String 
}

type RootQuery {
   users : [user!]!
   category :[AddCategory!]! 
}

type RootMutation {
   addUsers(usersInput: UsersInput): user
   addCategory(categoryInput : CategoryInput) : AddCategory
}
schema {
    query: RootQuery
    mutation:RootMutation
}
`
)