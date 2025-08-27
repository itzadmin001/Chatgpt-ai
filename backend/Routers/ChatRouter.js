const express = require("express")
const { VerifyUser } = require("../Middlewares/AuthUser")
const { ChatCreate } = require("../Controllars/ChatControllar")

const ChatRouter = express.Router()



ChatRouter.post("/", VerifyUser, ChatCreate)



module.exports = { ChatRouter }