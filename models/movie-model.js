const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const movieSchema = new Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: String },
    releaseYear: { type: String },
    rating: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "auth", required: true },
});

module.exports = model("movie", movieSchema);
