const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

// Define the route for handling the model execution
router.post("/", (req, res) => {
  // You can send input data via the request body if necessary
  const inputData = req.body.inputData || null;  // Example of passing data (if required)
  
  // Spawn a child process to run the Python script (Gradio)
  const pythonProcess = spawn("python", [path.join(__dirname, "../ml_models/model1.py")]);

  // Send the input data to the Python process via stdin (if needed)
  if (inputData) {
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();
  }

  let modelOutput = "";
  
  // Capture the output from the Python script
  pythonProcess.stdout.on("data", (data) => {
    modelOutput += data.toString();
    console.log("Model Output:", modelOutput);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Error in Python process:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.status(200).json({ message: "Model executed successfully", output: modelOutput });
    } else {
      res.status(500).json({ message: "Model execution failed" });
    }
  });
});

module.exports = router;
