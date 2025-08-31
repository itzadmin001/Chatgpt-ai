const express = require("express")
const { VerifyUser } = require("../Middlewares/AuthUser")
const { ChatCreate, GetAllChats } = require("../Controllars/ChatControllar")

const ChatRouter = express.Router()



ChatRouter.post("/", VerifyUser, ChatCreate)
ChatRouter.post("/all", GetAllChats)


module.exports = { ChatRouter }