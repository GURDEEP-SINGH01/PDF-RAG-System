import { Worker } from 'bullmq';
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { vectorStore } from './utils/utils.js';

const worker = new Worker('file-upload-queue', async job => {
    // console.log('worker is running', job.data);
    try {
        const data = (job.data)
        const loader = new PDFLoader(data.path);
        const docs = await loader.load();

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