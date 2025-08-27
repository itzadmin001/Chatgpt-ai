const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function AiResponseGenrate(content) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
    });
    return response.text
}

module.exports = { AiResponseGenrate }