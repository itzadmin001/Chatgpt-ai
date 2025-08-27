const express = require('express');
const { CreateUser, LoginUser } = require('../Controllars/UserControllar');

const UserRouter = express.Router();


UserRouter.post("/create", CreateUser)
UserRouter.post("/login", LoginUser)



module.exports = UserRouter;