
const ChatModel = require("../Models/ChatModel")
const MessageModel = require("../Models/MessageModel")

async function GetallMassage(req, res) {
    const ChatId = req.params.id

    try {
        if (!ChatId) {
            return res.status(400).json({ success: false, message: 'Chat id is required in params.' })
        }

        const chat = await ChatModel.findById({ _id: ChatId })
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found.' })
        }

        const messages = await MessageModel.find({ chat: ChatId }).sort({ createdAt: 1 })

        if (!messages || messages.length === 0) {
            return res.status(200).json({ success: true, message: 'No messages found for this chat.', messages: [] })
        }

        return res.status(200).json({ success: true, messages })

    } catch (err) {
        console.error('Error in GetallMassage:', err)
        return res.status(500).json({ success: false, message: 'Internal server error.', error: err.message })
    }

}


module.exports = { GetallMassage }