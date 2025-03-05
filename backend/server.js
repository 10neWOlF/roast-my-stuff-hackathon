const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5500;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/roast-resume", upload.single("resume"), async (req, res) => {
  let filePath;
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File uploaded:", req.file);

    const { roastLevel } = req.body;

    let extractedText = "";
    filePath = req.file.path;
    const fileExt = req.file.originalname.split(".").pop().toLowerCase();

    if (fileExt === "pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      extractedText = data.text;
      console.log("PDF text extracted:", extractedText);
    } else if (fileExt === "docx") {
      const data = await mammoth.extractRawText({ path: filePath });
      extractedText = data.value;
      console.log("DOCX text extracted:", extractedText);
    } else {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: "Unsupported file format" });
    }

    let systemPrompt = "You are a professional resume reviewer.";
    if (roastLevel === "spicy") {
      systemPrompt = "You are a brutally honest resume reviewer.";
    } else if (roastLevel === "extra_burn") {
      systemPrompt = "You are a savage resume reviewer with maximum intensity.";
    }
    const userPrompt = `Roast this resume harshly. Your response must follow this exact format:
  
1. A brutal roast (3-5 sentences max) highlighting the major flaws
2. A brief overall assessment (1-2 sentences)
3. A rating out of 10

Keep your entire response under 200 words. Be direct and savage:

${extractedText}`;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OpenRouter response:", response.data);

    res.json({ roast: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error roasting resume:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the resume." });
  } finally {
    if (filePath) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
  }
});

app.post("/api/roast-project", async (req, res) => {
  try {
    const { projectDescription, projectLink, roastLevel } = req.body;

    if (!projectDescription || !projectLink) {
      return res.status(400).json({ error: "Both project description and project link are required." });
    }


    let systemPrompt =
      "You are an expert at reviewing and roasting project ideas.";
    if (roastLevel === "spicy") {
      systemPrompt =
        "You are a brutally honest expert at roasting project ideas.";
    } else if (roastLevel === "extra_burn") {
      systemPrompt =
        "You are a savage expert at roasting project ideas with maximum intensity.";
    }
    const userPrompt = `Roast this project idea harshly. Your response must follow this exact format:

    1. A brutal roast (3-5 sentences max) highlighting the major flaws
    2. A brief overall assessment (1-2 sentences)
    3. A rating out of 10
    
    Keep your entire response under 200 words. Be direct and savage:
    
    Project Description: ${projectDescription}
    Project Link: ${projectLink}`;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ roast: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error roasting project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while roasting the project." });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
