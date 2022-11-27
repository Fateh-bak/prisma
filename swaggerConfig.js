
const swaggerJSDoc = require('swagger-jsdoc')

// swagger definition
var swaggerDefinition = {
    info: {
      title: "Node Swagger API",
      version: "1.0.0",
      description: "Demonstrating how to describe a RESTful API with Swagger",
    },
    host: "localhost:3333",
    basePath: "/",
  };
  
  // options for the swagger docs
  var options = {
    explorer: true,
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ["./index.js"],
  };
  
  // initialize swagger-jsdoc
  var swaggerSpec = swaggerJSDoc(options);


module.exports={swaggerSpec:swaggerSpec}

