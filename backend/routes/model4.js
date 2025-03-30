const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  const inputData = req.body.inputData || null;

  const pythonProcess = spawn("python", [path.join(__dirname, "../ml_models/model4.py")]);

  if (inputData) {
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();
  }

  let modelOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    modelOutput += data.toString();
    console.log("Model 4 Output:", modelOutput);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Model 4 Error:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.status(200).json({ message: "Model 4 executed successfully", output: modelOutput });
    } else {
      res.status(500).json({ message: "Model 4 execution failed" });
    }
  });
});

module.exports = router;
