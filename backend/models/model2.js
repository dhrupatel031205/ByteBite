const mongoose = require("mongoose");

const model2DataSchema = new mongoose.Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Model2Data = mongoose.model("Model2Data", model2DataSchema);

module.exports = Model2Data;
