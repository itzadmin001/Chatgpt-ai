const ChatModel = require("../Models/ChatModel");
const UserModel = require("../Models/UserModel");

async function ChatCreate(req, res) {
    try {
        const userId = req.user.id;
        const { title } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User not found in request.' });
        }
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required.' });
        }

        const chat = await ChatModel.create({
            user: userId,
            title: title
        });

        return res.status(201).json({ success: true, chat });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function GetAllChats(req, res) {
    try {
        const userEmail = req.body.email;
        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found in request.',
            });
        }

        const findUser = await UserModel.findOne({ email: userEmail })
        if (findUser) {
            const chats = await ChatModel.find({ user: findUser._id }).sort({ createdAt: -1 });

            if (!chats || chats.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No chats found for this user.",
                    chats: [],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Chats fetched successfully.",
                chats,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "No chats found for this user.",
                chats: [],
            });
        }


    } catch (err) {
        console.error("Error fetching chats:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: err.message,
        });
    }
}

module.exports = { ChatCreate, GetAllChats };