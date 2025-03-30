const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Authentication Routes
app.use("/api/auth", require("./routes/authRoutes.js"));

// Model Routes
app.use("/api/model1", require("./routes/model1.js"));
app.use("/api/model2", require("./routes/model2.js"));
app.use("/api/model3", require("./routes/model3.js"));
app.use("/api/model4", require("./routes/model4.js"));

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
