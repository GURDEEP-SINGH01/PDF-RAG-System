import express from 'express'
import multer from 'multer';
import { Queue } from "bullmq";
import { model, vectorStore } from './utils/utils.js';

const queue = new Queue("file-upload-queue", {
    connection: {
        host: "localhost",
        port: "6379"
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const app = express();

const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
    console.log(req)
    await queue.add("file-ready", {
        filename: req.file.originalname,
        source: req.file.destination,
        path: req.file.path
    });

    return res.json({ message: "uploaded" })
})

app.post('/chat', async (req, res) => {
    const query = req.body['query'];

    // const model = new ChatOllama({
    //     model: "qwen2.5:3b",
    //     baseUrl: "http://localhost:11434",
    // });
    const retriever = vectorStore.asRetriever({
        // Optional filter
        // filter: filter,
        k: 2,
    });
    const result = await retriever.invoke(query);
    const context = result.map(doc => doc.pageContent).join("\n");

    const response = await model.stream(`
        Answer the question based only on the context below.

        Context:
        ${context}

        Question:
        ${query}
    `);
    let finalAnswer = "";
    for await (const chunk of response) {

        const text = chunk.content;

        process.stdout.write(text);

        finalAnswer += text;

    }
    return res.json({
        answer: finalAnswer
    });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});