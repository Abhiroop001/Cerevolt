const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "parent", "school"], required: true },
    meta: { type: Object } // store extra info like class, schoolId, etc.
});

module.exports = mongoose.model("User", userSchema);
