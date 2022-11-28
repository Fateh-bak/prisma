const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swaggerConfig");
const express = require("express");
const {usersRouter} = require('./routes/users')

const app = express();
app.use(express.json());
app.use('/api',usersRouter)

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(3333);
