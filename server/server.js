import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting: max 20 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure OpenAI SDK to point to OpenRouter
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.YOUR_SITE_URL,
    'X-Title': process.env.YOUR_SITE_NAME,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Chat endpoint (Streaming)
app.post('/api/chat', apiLimiter, async (req, res) => {
  try {
    const { messages, model = 'openai/gpt-4o' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_api_key_here') {
      return res.status(500).json({ error: 'OpenRouter API Key is missing or invalid in backend .env' });
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Create a streaming completion request to OpenRouter
    const stream = await openai.chat.completions.create({
      model: model,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
      max_tokens: 1000,
    });

    let tokenCount = 0;

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        // Send each chunk as an SSE message
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
        tokenCount += 1; // Basic heuristic token count
      }
    }

    // Send final analytics/token count message
    res.write(`data: ${JSON.stringify({ done: true, tokens: tokenCount })}\n\n`);
    res.end();

  } catch (error) {
    console.error('OpenRouter API Error:', error);
    // If headers haven't been sent, we can send a JSON error
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to communicate with OpenRouter API' });
    } else {
      // If streaming has already started, send error event
      res.write(`data: ${JSON.stringify({ error: 'API Error occurred mid-stream' })}\n\n`);
      res.end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Make sure to set your OPENROUTER_API_KEY in the .env file!`);
});
