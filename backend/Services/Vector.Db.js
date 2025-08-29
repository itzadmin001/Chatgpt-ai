const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,

});


const Indexname = pc.index("chatgpt")


async function CreateMemory({ vectors, metadata, messageId }) {

    await Indexname.upsert([{
        id: messageId,
        values: vectors,
        metadata
    }])

}


async function QueryMemory({ queryVector, limit = 5, metadata }) {
    try {
        const data = await Indexname.query({
            vector: queryVector,
            topK: limit,
            filter: metadata ? metadata : undefined,
            includeMetadata: true,
        });
        return data.matches;
    } catch (err) {
        console.error("QueryMemory Error:", err.message);
        throw err;
    }
}


module.exports = { CreateMemory, QueryMemory }