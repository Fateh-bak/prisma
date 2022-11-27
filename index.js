const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();

app.use(express.json());

app.post("/createUser", async (req, res) => {
  try {
    console.log(req);
    const usr = {
      name: req.body.name,
      email: req.body.email,
      posts:{create:{title:"helloworld"}}
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
    const id = req.body.id
    const deletePosts = prisma.post.deleteMany({
        where: {
          authorId: id,
        },
      })
      
      const deleteUser = prisma.user.delete({
        where: {
          id: id,
        },
      })
      
      const transaction = await prisma.$transaction([deletePosts, deleteUser])
      res.json(transaction)
  } catch (err) {
    res.status(400).json(err);
  }
});
app.listen(3333);
