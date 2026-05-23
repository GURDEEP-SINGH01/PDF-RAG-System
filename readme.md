# PDF Agent - AI Powered RAG Chat Application

## Overview

PDF Agent is a Retrieval-Augmented Generation (RAG) application that allows users to:

* Upload PDF documents
* Generate embeddings from PDF content
* Store embeddings inside Qdrant Vector Database
* Query uploaded documents using AI
* Stream AI responses in real-time like ChatGPT

The project uses:

* React + Vite frontend
* Express.js backend
* LangChain
* Ollama for local LLMs
* Qdrant Vector Database
* BullMQ for background processing
* Redis queue
* Multer for PDF uploads

---

# Architecture

```text
Frontend (React + Vite)
        ↓
Express Backend API
        ↓
BullMQ Queue
        ↓
Worker Process
        ↓
PDF Loader + Chunking
        ↓
Ollama Embeddings
        ↓
Qdrant Vector Database
        ↓
Retriever
        ↓
Ollama LLM
        ↓
Streaming AI Response
```

---

# Features

* PDF Upload
* Vector Embeddings
* RAG Pipeline
* AI Chat Interface
* Streaming Responses
* Local LLM Support
* Async PDF Processing
* Real-time Chat Experience

---

# Tech Stack

## Frontend

* React
* Vite
* TailwindCSS

## Backend

* Node.js
* Express.js
* BullMQ
* Redis
* LangChain
* Qdrant
* Ollama
* Multer

---

# Prerequisites

Before running the project install:

* Node.js v22+
* Docker Desktop
* Ollama
* Redis

---

# 1. Install Ollama

Download and install Ollama:

[https://ollama.com/download](https://ollama.com/download)

Verify installation:

```bash
ollama --version
```

---

# 2. Pull Required Models

Example:

```bash
ollama pull qwen2.5:3b
```

You can use any Ollama supported model.

Examples:

```bash
ollama pull llama3
ollama pull mistral
ollama pull gemma3
ollama pull phi4
```

---

# 3. Start Ollama

```bash
ollama serve
```

Default Ollama URL:

```text
http://localhost:11434
```

---

# 4. Start Redis and Qdrant Using Docker Compose
Run the below command to run redis and QdrantDB

```bash
docker compose up -d
```

---

# Backend Setup

## Navigate

```bash
cd backend-ai
```

---

# Install Dependencies

```bash
npm install
```

---

# Run Backend

## Start API Server

```bash
npm run dev
```

## Start Worker

Open another terminal:

```bash
npm run dev:worker
```

---

# Frontend Setup

## Navigate

```bash
cd frontend-ai
```

---

# Install Dependencies

```bash
npm install
```

---

# Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Important Configuration

## Ollama URL

Inside backend:

```js
baseUrl: "http://localhost:11434"
```

You can change this if Ollama runs on another server.

---

# Change LLM Model

Inside backend:

```js
const model = new ChatOllama({
    model: "qwen2.5:3b",
    baseUrl: "http://localhost:11434",
});
```

Replace:

```js
model: "qwen2.5:3b"
```

with your preferred model:

```js
model: "llama3"
model: "mistral"
model: "gemma3"
model: "phi4"
```

---

# Change Embedding Model

Inside backend:

```js
const embeddings = new OllamaEmbeddings({
    model: "qwen2.5:3b",
    baseUrl: "http://localhost:11434",
});
```

You can replace the embedding model as needed.

---

# Environment Variables (Recommended)

Instead of hardcoding values create a `.env` file.

Example:

```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:3b
QDRANT_URL=http://localhost:6333
REDIS_HOST=localhost
REDIS_PORT=6379
```

Then use:

```js
process.env.OLLAMA_URL
```

inside your backend.

---

# API Endpoints

## Upload PDF

```http
POST /upload/pdf
```

FormData:

```text
pdf -> file
```

---

## Chat Endpoint

```http
POST /chat
```

Request:

```json
{
  "query": "Does the candidate know Java?"
}
```

Streaming response:

```text
AI generated streamed response
```

---

# How The Pipeline Works

## Upload Flow

```text
User uploads PDF
        ↓
Multer stores file
        ↓
BullMQ queue created
        ↓
Worker processes PDF
        ↓
PDF chunking
        ↓
Embeddings generated
        ↓
Stored in Qdrant
```

---

# Query Flow

```text
User enters query
        ↓
Retriever searches vector DB
        ↓
Relevant chunks retrieved
        ↓
LLM receives context
        ↓
AI streams answer
        ↓
Frontend displays response
```

---

# Learning Concepts Used

* RAG (Retrieval Augmented Generation)
* Vector Databases
* Embeddings
* Streaming Responses
* Chunking Strategies
* Async Job Queues
* Local LLM Hosting
* Semantic Search
* Full-stack AI Engineering

---
