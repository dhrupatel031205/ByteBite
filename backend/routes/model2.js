const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const ModelData = require("../models/model2"); // Import Mongoose model

const router = express.Router();

router.post("/", async (req, res) => {
    const inputData = req.body.inputData || null;
    
    const pythonProcess = spawn("python", [path.join(__dirname, "../ml_models/model2.py")]);

    if (inputData) {
        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();
    }

    let modelOutput = "";

    pythonProcess.stdout.on("data", (data) => {
        modelOutput += data.toString();
        console.log("Model 2 Output:", modelOutput);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Model 2 Error:", data.toString());
    });

    pythonProcess.on("close", async (code) => {
        if (code === 0) {
            try {
                // Save input and output to MongoDB
                const newEntry = new ModelData({
                    input: inputData,
                    output: modelOutput
                });

                await newEntry.save();
                res.status(200).json({ message: "Model 2 executed successfully", output: modelOutput });
            } catch (error) {
                console.error("Error saving data:", error);
                res.status(500).json({ message: "Failed to save model data" });
            }
        } else {
            res.status(500).json({ message: "Model 2 execution failed" });
        }
    });
});

module.exports = router;
