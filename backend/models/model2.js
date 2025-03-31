const mongoose = require("mongoose");

const modelDataSchema = new mongoose.Schema({
    input: Object,
    output: Object,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ModelData", modelDataSchema);
