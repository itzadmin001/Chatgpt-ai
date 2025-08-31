const express = require("express");
const { GetallMassage } = require("../Controllars/MessageControllar");
const MessageRouter = express.Router()


MessageRouter.get("/:id", GetallMassage)



module.exports = { MessageRouter }