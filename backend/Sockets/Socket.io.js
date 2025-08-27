const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie"); // npm install cookie
const UserModel = require("../Models/UserModel"); // adjust path as needed
const MessageModel = require("../Models/MessageModel");
const { AiResponseGenrate } = require("../Services/Ai-Model");
const { text } = require("express");


function initSocketServer(httpServer) {

    const io = new Server(httpServer, { /* options */ });



    io.use(async (socket, next) => {
        try {
            const cookies = socket.handshake.headers.cookie;
            let token;
            if (cookies) {
                const parsed = cookie.parse(cookies);
                token = parsed.token;
            }
            if (!token) {
                return next(new Error("Access denied. Please Login first"));
            }
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return next(new Error("Invalid or expired token"));
                }
                const FindUser = await UserModel.findOne({
                    $or: [
                        { email: decoded.email },
                        { _id: decoded.id }
                    ]
                });
                if (!FindUser) {
                    return next(new Error("User not found Login First"));
                }
                socket.user = decoded;
                next();
            });
        } catch (err) {
            return next(new Error("Invalid or expired token."));
        }
    });

    io.on("connection", (socket) => {
        // ...


        socket.on("ai-message", async (Message) => {

            await MessageModel.create({
                chat: Message.chat,
                user: socket.user.id,
                content: Message.content,
                role: "user"
            })


            const ChatHistory = (await MessageModel.find({
                chat: Message.chat
            }).sort({ createdAt: -1 }).limit(10).lean()).reverse()

            const response = await AiResponseGenrate(ChatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }))

            await MessageModel.create({
                chat: Message.chat,
                user: socket.user.id,
                content: response,
                role: "model"
            })

            socket.emit("ai-response", {
                content: response,
                chat: Message.chat
            })
        })



    });
}




module.exports = initSocketServer