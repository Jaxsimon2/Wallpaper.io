const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure API key is set in environment variables
});

// Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://10.0.2.2:3000", "http://10.0.0.64:3000"], // Your frontend IPs
  methods: "GET,POST",
};
app.use(cors(corsOptions));

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send({ error: "Prompt is required." });
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3", // Specify DALL-E 3 model
      prompt,
      n: 1,
      size: "1024x1024", // Higher resolution
    });

    const imageUrl = response.data[0].url;
    console.log("Generated Image URL:", imageUrl); // Log the image URL
    res.send({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send({ error: "Failed to generate image." });
  }
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
