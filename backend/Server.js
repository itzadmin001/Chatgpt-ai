require("dotenv").config()
const app = require("./index");
const connectDB = require('./Db/Db.js');
const initSocketServer = require("./Sockets/Socket.io.js")
const { createServer } = require("http");


const httpServer = createServer(app);


connectDB()
initSocketServer(httpServer)
const PORT = process.env.PORT || 3000;


httpServer.listen(PORT, () => {
    console.log("server started")
})

