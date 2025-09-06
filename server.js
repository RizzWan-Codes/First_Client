import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Log whether API key is loaded
console.log("Loaded key:", process.env.OPENAI_API_KEY ? "✅ Found" : "❌ Missing");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Log the incoming message
    console.log("🟡 User said:", userMessage);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4o" if available
      messages: [
        {
          role: "system",
          content: "You are Globurg AI Bot. Always reply concisely using one sentence only.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 20,
      temperature: 0.3,
    });

    const botMessage = completion.choices[0].message.content;

    // Log AI response
    console.log("🟢 Bot replied:", botMessage);

    res.json({ reply: botMessage });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);

    const message = error.response?.data?.error?.message || error.message || "Unknown error";

    res.status(500).json({ reply: `Error with AI API: ${message}` });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
