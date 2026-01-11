const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = 2000; // Unified port

// MongoDB connection
mongoose.connect("mongodb+srv://abhiroopm001:abhiroop1234@cluster0.zwluqem.mongodb.net/cerevolt?retryWrites=true&w=majority&appName=Cluster0");

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.send("hello abhii");
});

const pr = require("./routes/product_r");
app.use("/product", pr);

const ar = require("./routes/admin");
app.use("/admin", ar);

const rr = require("./routes/retreat_r");
app.use("/retreat", rr);

const ur = require("./routes/user");
app.use("/user", ur);

const videoRoutes = require("./routes/video");
app.use("/video", videoRoutes);

const doctorRoute = require("./routes/doctor_r");
app.use("/doctor", doctorRoute);

app.use("/doctor_img", express.static("public/doctor_img"));

// Chatbot endpoint
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:2000",
        "X-Title": "Secure Chatbot"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
