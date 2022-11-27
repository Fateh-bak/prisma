# prisma
prisma basics querys&amp;config
link to officiel documentation (CRUD): https://www.prisma.io/docs/concepts/components/prisma-client/crud#create-a-deeply-nested-tree-of-records 



how to use swagger :
instalation :
- install swagger-jsdoc
- install swagger-ui-express
with npm.

configuration : 
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

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
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./index.js"],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


implementation :
const swaggerSpec = swaggerJsDoc(options)
for ui
app.use("/routeToSwagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec))


usage example : 
check out this doc : https://mherman.org/blog/swagger-and-nodejs/
