const express = require('express');
const UserRouter = require('./Routers/UserRouter');
const cors = require('cors');
const dotenv = require('dotenv');
const { ChatRouter } = require('./Routers/ChatRouter');
const cookieParser = require("cookie-parser");
const { MessageRouter } = require('./Routers/MessageRouter');

dotenv.config();



const app = express();



app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}));
app.use(cookieParser())




app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.use("/user", UserRouter)
app.use("/chat", ChatRouter)
app.use("/message", MessageRouter)






module.exports = app;