const express = require("express");
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


const app = express();  
app.use(bodyParser.json());

app.get('/', (req,res,next) => {
    res.send("Welcome to Node Server");
});


app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );
  
 
const url = "mongodb://localhost:27017/neptune";
mongoose.connect(url,{useNewUrlParser: true}).then(()=>
console.log("listening on 3000"),
app.listen(3000)).catch(err =>{ console.log(err)})


app.listen();