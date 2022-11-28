const express = require('express')
const prisma = require('prisma')
const router = express.Router()

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
 *       - name: body
 *         description: user name is required/email is required/posts is optional {"email":"User Email","name":"User name","posts":[]}
 *         in: body
 *         required: true
 *
 *
 *     responses:
 *       200:
 *         description: User Created
 *       400:
 *         description: bad request
 */

 router.post("/user", async (req, res) => {
    try {
      if (req.body.name && req.body.email) {
        const usr = {
          name: req.body.name,
          email: req.body.email,
          posts: { create: { title: "helloworld" } },
        };
        const user = await prisma.user.create({ data: usr });
        res.json(user);
      }else{
        res.status(400).send("bad request")
      }
    } catch (err) {
      if(err.code === "P2002"){    res.status(400).send("email alredy used");
      }else{res.status(400).send("there was a problem");}
    }
  });
  /**
   * @swagger
   * /api/users:
   *   get:
   *     tags:
   *       - Users
   *     description: get all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: sucsses
   *       400:
   *         description: bad request
   */
  router.get("/users", async (req, res) => {
    try {
      const users = await prisma.user.findMany({ include: { posts: true } });
      res.json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  /**
   * @swagger
   * /api/user/{id}:
   *   get:
   *     tags:
   *       - Users
   *     description: get user by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *           description: The user ID
   *     responses:
   *       200:
   *         description: sucsses
   *       400:
   *         description: bad request
   */
  router.get("/user/:id", async (req, res) => {
    try {
      console.log(req.params)
      const userId = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { "id": userId },
        include: { posts: true },
      });
      console.log(user)
  
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  /**
   * @swagger
   * /api/user/{id}:
   *   put:
   *     tags:
   *       - Users
   *     description: change user name accept {name:newname}
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *           description: The user ID
   *       - in: body
   *         name: body
   *         required: true
   *         description: change user name accept {name:new name}
   *         schema:
   *           type: string
   *           description: change user name
   *     responses:
   *       200:
   *         description: sucsses
   *       400:
   *         description: bad request
   */
  router.put("/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const newName = req.body.name;
      const user = await prisma.user.updateMany({
        where: { id: id },
        data: { name: newName },
      });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  /**
   * @swagger
   * /api/user/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     description: delete user by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *           description: The user ID
   *     responses:
   *       200:
   *         description: sucsses
   *       400:
   *         description: bad request
   */
  
  router.delete("/user/:id", async (req, res) => {
    try {
      // const name = req.body.name;
      // const user = await prisma.user.deleteMany({ where: { name: name } });
      // res.json(user);
      const id = parseInt(req.params.id);
      console.log(id)
      const deletePosts = prisma.post.deleteMany({
        where: {
          authorId: id,
        },
      });
  
      const deleteUser = prisma.user.deleteMany({
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



module.exports= {usersRouter:router}