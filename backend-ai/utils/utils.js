import { QdrantVectorStore } from "@langchain/qdrant";
import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";

export const model = new ChatOllama({
    model: "qwen2.5:3b",
    baseUrl: "http://localhost:11434",
});

export const embeddings = new OllamaEmbeddings({
    model: "qwen2.5:3b", // Default value
    baseUrl: "http://localhost:11434", // Default value
});

export const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: 'http://localhost:6333',
    collectionName: "pdf-agent",
});
