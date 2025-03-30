const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const Model3Data = require("../models/model3.js");  // Import the Model3Data schema

const router = express.Router();

// Run Model 3
router.post("/", async (req, res) => {
    const inputData = req.body.inputData;  // Assuming input data is sent via POST body
    
    const pythonProcess = spawn("python", [path.join(__dirname, "../ml_models/model3.py")]);

    pythonProcess.stdin.write(inputData);  // Send input data to the model
    pythonProcess.stdin.end();

    let modelOutput = "";
    
    pythonProcess.stdout.on("data", (data) => {
        modelOutput += data.toString();  // Capture the output
        console.log(`Model Output: ${modelOutput}`);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Model Error: ${data}`);
    });

    pythonProcess.on("close", async (code) => {
        if (code === 0) {
            // Save the input and output to the database
            try {
                const newModel3Data = new Model3Data({
                    input: inputData,
                    output: modelOutput
                });
                await newModel3Data.save();
                res.json({ msg: "Model 3 Launched. Open Gradio UI!", modelData: newModel3Data });
            } catch (err) {
                console.error("Error saving to database:", err);
                res.status(500).json({ msg: "Failed to save model data to database" });
            }
        } else {
            res.status(500).json({ msg: "Model execution failed" });
        }
    });
});

module.exports = router;
