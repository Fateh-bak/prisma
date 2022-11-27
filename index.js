const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swaggerConfig");
const express = require("express");

const app = express();
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - Users
 *     description: Create new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: user name
 *         in: body
 *         required: true
 *       - name: posts
 *         description: user posts
 *         in: body
 *         required: false
 *       - name: email
 *         description: user email
 *         in: body
 *         required: true
 * 
 *       
 *     responses:
 *       200:
 *         description: User Created
 *       400:
 *         description: User Alredy Exist
 *       401:
 *         description : Bad request
 */

app.post("/api/user", async (req, res) => {
  try {
    console.log(req.body)
    const usr = {
      name: req.body.name,
      email: req.body.email,
      posts: { create: { title: "helloworld" } },
    };
    const user = await prisma.user.create({ data: usr });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { posts: true } });
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.get("/getUserByEmail", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const users = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { posts: true },
    });
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.post("/updateUserName", async (req, res) => {
  try {
    const name = req.body.name;
    const newName = req.body.newName;
    const user = await prisma.user.updateMany({
      where: { name: name },
      data: { name: newName },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.post("/deleteUser", async (req, res) => {
  try {
    // const name = req.body.name;
    // const user = await prisma.user.deleteMany({ where: { name: name } });
    // res.json(user);
    const id = req.body.id;
    const deletePosts = prisma.post.deleteMany({
      where: {
        authorId: id,
      },
    });

    const deleteUser = prisma.user.delete({
      where: {
        id: id,
      },
    });

    const transaction = await prisma.$transaction([deletePosts, deleteUser]);
    res.json(transaction);
  } catch (err) {
    res.status(400).json(err);
  }
});
app.listen(3333);
