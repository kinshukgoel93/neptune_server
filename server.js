require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/V1/schema/index');
const graphQlResolvers = require('./graphql/V1/resolvers/index');
const sawaggerJS = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const cors = require('cors')
const app = express(); 
const auth = require("./auth/auth")
/* Extend swagger Info Object */
const swaggerOptions = {
  openapi: "3.0.0",
  swaggerDefinition:{
      info:{
          title:"Neptune Next",
          description:"API's Used for App and Admin Panel",
          contact:{
              name:"Neptune Next Developers"
          },
          server:["localhost:"+process.env.PORT]
      },
      schemes: ["https"],
      securityDefinitions: {
          Bearer: {
            type: "apiKey",
            scheme: "bearer",
            name: "Authorization",
            bearerFormat: "JWT",
            in: "header",
            description:
              'The following syntax must be used in the "Authorization" header xxxxxx.yyyyyyy.zzzzzz',
          },
      },
  },    
  apis:["./routes/*.js"],
}

const swaggerDocs = sawaggerJS(swaggerOptions)

app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(cors());

 
app.use(bodyParser.json());

app.get('/', (req,res,next) => {
    res.send("Welcome to Node Server");
});

// app.use(auth.authToken)
app.use(
    '/api/v1',
    graphqlHttp((req, res) =>({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
      context: { req, res }
    }))
  );
  
 
const url = process.env.DB_CONNECTION || "mongodb://localhost:27017/neptune";
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>
console.log("listening on 3000"),
app.listen(process.env.PORT)).catch(err =>{ console.log(err)})