const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie"); // npm install cookie
const UserModel = require("../Models/UserModel"); // adjust path as needed
const MessageModel = require("../Models/MessageModel");
const { AiResponseGenrate, GenrateVectors } = require("../Services/Ai-Model");
const { CreateMemory, QueryMemory } = require("../Services/Vector.Db")
const { text } = require("express");


function initSocketServer(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173", // frontend ka URL
            credentials: true
        }

    });



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

        socket.on("verify-user", async () => {

            const Userfind = await UserModel.findOne({ _id: socket.user.id })

            if (Userfind) {
                socket.emit("verify-response", {
                    email: Userfind.email,
                    id: Userfind._id,
                    fullname: Userfind.fullname,
                })
            }
        })
        socket.on("ai-message", async (Message) => {
            const [MesageCreate, vectors] = await Promise.all([
                MessageModel.create({
                    chat: Message.chat,
                    user: socket.user.id,
                    content: Message.content,
                    role: "user"
                }),
                GenrateVectors(Message.content)
            ]);

            const memory = await QueryMemory({
                queryVector: vectors,
                limit: 3,
                metadata: {
                    user: socket.user.id,
                }
            })


            const [memoryRes, ChatHistory] = await Promise.all([
                CreateMemory({
                    vectors,
                    messageId: MesageCreate._id,
                    metadata: {
                        chat: Message.chat,
                        user: socket.user.id,
                        text: Message.content
                    }
                }),
                MessageModel.find({ chat: Message.chat })
                    .sort({ createdAt: -1 })
                    .limit(10)
                    .lean()
                    .then(res => res.reverse())
            ]);



            const Stm = ChatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            })

            const Ltm = [
                {
                    role: "user",
                    parts: [
                        {
                            text: ` these are some previos messages from the chat ,use them to genrate a response  
                            ${memory.map(item => item.metadata.text).join("\n")}  `
                        }
                    ]
                }
            ]


            const response = await AiResponseGenrate([...Ltm, ...Stm,])
            socket.emit("ai-response", {
                content: response,
                chat: Message.chat,
                role: "model",
            })
            const [responseMessage, ResponseVectors] = await Promise.all([
                MessageModel.create({
                    chat: Message.chat,
                    user: socket.user.id,
                    content: response,
                    role: "model"
                }),
                GenrateVectors(response)
            ]);
            await CreateMemory({
                vectors: ResponseVectors,
                messageId: responseMessage._id,
                metadata: {
                    chat: Message.chat,
                    user: socket.user.id,
                    text: response
                }

            })

        })
    });
}






module.exports = initSocketServer