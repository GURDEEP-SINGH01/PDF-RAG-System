import { Worker } from 'bullmq';
import { Document } from "@langchain/core/documents";
import { QdrantVectorStore } from "@langchain/qdrant";
import { OllamaEmbeddings } from "@langchain/ollama";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

const worker = new Worker('file-upload-queue', async job => {
    // console.log('worker is running', job.data);
    try {
        const data = (job.data)
        const loader = new PDFLoader(data.path);
        const docs = await loader.load();

        const embeddings = new OllamaEmbeddings({
            model: "qwen2.5:3b", // Default value
            baseUrl: "http://localhost:11434", // Default value
        });

        const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: 'http://localhost:6333',
            collectionName: "pdf-agent",
        });
        await vectorStore.addDocuments(docs);
    } catch (err) {
        console.error(err);
    }

}, {
    concurrency: 100, connection: {
        host: "localhost",
        port: 6379
    }
});