# 🤖 SmartDoc AI — Multimodal RAG Assistant

SmartDoc AI is a multimodal AI chatbot that can understand **text, images, and PDF documents**. It uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant information from uploaded documents and provide context-aware answers.

The application also includes a calculator tool for performing mathematical operations.

## 🚀 Live Demo

**Live Demo:** `https://multimodal-rag-chatbot-nc0boucdt-goundlaharinivas.vercel.app/`

## 📌 Features

* 💬 **Text Chat** — Ask questions using natural language.
* 🖼️ **Image Understanding** — Upload an image and ask the AI to analyze it.
* 📄 **PDF Upload** — Upload PDF documents directly through the chatbot.
* 🔎 **Retrieval-Augmented Generation (RAG)** — Retrieve relevant information from uploaded documents before generating an answer.
* 🧠 **Vector Search** — Document embeddings are stored and searched using Supabase and pgvector.
* 🧮 **Calculator Tool** — Perform mathematical calculations directly through the chatbot.
* ☁️ **Cloud Deployment** — Application deployed using Vercel.
* 🔐 **Environment Variables** — API credentials are stored securely using environment variables.

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Chat API Route   │
                    └──────┬───────┬──────┘
                           │       │
                ┌──────────┘       └──────────┐
                ▼                             ▼
       ┌────────────────┐            ┌────────────────┐
       │   RAG Search   │            │ Image Analysis │
       └───────┬────────┘            └───────┬────────┘
               │                             │
               ▼                             ▼
       ┌────────────────┐            ┌────────────────┐
       │ Supabase +     │            │     Groq       │
       │ pgvector       │            │      AI        │
       └───────┬────────┘            └───────┬────────┘
               │                             │
               └──────────────┬──────────────┘
                              ▼
                    ┌─────────────────────┐
                    │    AI Response      │
                    └─────────────────────┘
```

## 🛠️ Technologies Used

| Technology | Purpose                            |
| ---------- | ---------------------------------- |
| Next.js    | Frontend and backend API routes    |
| TypeScript | Application development            |
| React      | User interface                     |
| Groq API   | AI text and image processing       |
| Supabase   | Database and vector storage        |
| pgvector   | Vector similarity search           |
| PDF Parser | Extracting text from PDF documents |
| Vercel     | Cloud deployment                   |
| GitHub     | Source code management             |

## 📂 Project Structure

```text
multimodal-rag-chatbot/
│
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│
├── lib/
│   ├── embeddings.ts
│   ├── rag.ts
│   ├── supabase.ts
│   ├── tools.ts
│   └── vectorstore.ts
│
├── public/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

## 🔄 How RAG Works

The application uses Retrieval-Augmented Generation to answer questions using information from uploaded documents.

### Step 1 — Upload PDF

The user uploads a PDF document.

### Step 2 — Extract Text

The application extracts the text from the PDF.

### Step 3 — Create Embedding

The extracted document text is converted into a numerical vector representation.

### Step 4 — Store in Supabase

The document content and its vector representation are stored in Supabase using pgvector.

### Step 5 — User Asks a Question

The user's question is converted into a vector.

### Step 6 — Vector Search

The application searches the stored document vectors to find relevant information.

### Step 7 — Generate Answer

The retrieved document information is provided to the AI model as context, allowing it to generate an answer based on the uploaded document.

## 🧮 Calculator Tool

SmartDoc AI also includes a calculator tool.

For example:

```text
125 * 24
```

The application returns:

```text
The answer is 3000
```

This allows simple mathematical operations to be handled directly without asking the language model to perform the calculation.

## 🖼️ Multimodal Image Processing

The chatbot supports image queries.

Users can upload an image and ask questions such as:

```text
What do you see in this image?
```

The image is converted into a format that can be sent to the multimodal AI model, which analyzes the image and generates a response.

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit `.env.local` or expose API keys publicly.

## 💻 Running the Project Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Enter the project directory

```bash
cd multimodal-rag-chatbot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create:

```text
.env.local
```

and add the required API credentials.

### 5. Start the development server

```bash
npm run dev
```

Open the local application in your browser.

## 🧪 Testing

The following features have been tested successfully:

* Text query
* Calculator operation
* PDF upload
* Document-based question answering
* Image upload
* Image understanding
* Production deployment

Example RAG question:

```text
How many days of annual leave do employees receive?
```

Example answer:

```text
Employees receive 18 days of annual leave.
```

## ☁️ Deployment

The application is deployed on **Vercel**.

The source code is maintained on **GitHub**.

Environment variables are configured in the Vercel project settings so that sensitive credentials are not stored in the source code.

## 🔒 Security

API keys are stored using environment variables and are not included in the GitHub repository.

The `.env.local` file is excluded using `.gitignore`.

For a production-scale application, additional authentication, authorization, rate limiting, and stricter database access policies should be added.

## 🔮 Future Enhancements

Possible future improvements include:

* Conversation history
* User authentication
* Multiple document collections
* Better document chunking
* Streaming AI responses
* More advanced tool calling
* Web search integration
* Generative UI
* Document citations
* Improved vector retrieval
* Multi-user support

## 👨‍💻 Author

**Goundla Harinivas**

Built as a multimodal AI and Retrieval-Augmented Generation project using Next.js, Groq, Supabase, pgvector, GitHub, and Vercel.
