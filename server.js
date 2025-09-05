import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT; // ✅ use only process.env.PORT

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Answer very concise, two to three sentences if possible, without losing meaning. This website is about burgers. Only answer questions related to burger business (delivery, quality of ingredients, justify high prices, etc.). Dont use word 'beef' because it's India.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 50,
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

// ✅ Let Render assign the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
