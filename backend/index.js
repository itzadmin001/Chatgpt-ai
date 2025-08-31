const express = require('express');
const UserRouter = require('./Routers/UserRouter');
const cors = require('cors');
const dotenv = require('dotenv');
const { ChatRouter } = require('./Routers/ChatRouter');
const cookieParser = require("cookie-parser");
const { MessageRouter } = require('./Routers/MessageRouter');
const path = require("path");


dotenv.config();



const app = express();



app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
}

app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));






app.use("/user", UserRouter)
app.use("/chat", ChatRouter)
app.use("/message", MessageRouter)




app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});



module.exports = app;