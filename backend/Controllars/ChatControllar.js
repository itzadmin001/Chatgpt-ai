const ChatModel = require("../Models/ChatModel");

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

module.exports = { ChatCreate };