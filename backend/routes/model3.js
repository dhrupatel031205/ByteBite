const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  const inputData = req.body.inputData || null;

  const pythonProcess = spawn("python", [path.join(__dirname, "../ml_models/model3.py")]);

  if (inputData) {
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();
  }

  let modelOutput = "";

  pythonProcess.stdout.on("data", (data) => {
    modelOutput += data.toString();
    console.log("Model 3 Output:", modelOutput);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Model 3 Error:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.status(200).json({ message: "Model 3 executed successfully", output: modelOutput });
    } else {
      res.status(500).json({ message: "Model 3 execution failed" });
    }
  });
});

module.exports = router;
