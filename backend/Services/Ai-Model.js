const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function AiResponseGenrate(content) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
            temperature: 0.7
        }
    });
    return response.text
}


async function GenrateVectors(content) {

    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: {
            outputDimensionality: 768
        }
    });

    return response.embeddings[0].values
}


module.exports = { AiResponseGenrate, GenrateVectors }