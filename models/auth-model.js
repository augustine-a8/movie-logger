const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const authSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
});

module.exports = model("auth", authSchema);
