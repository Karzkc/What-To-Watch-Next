import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: String,
});

export const Test =
  mongoose.models.Test || mongoose.model("Test", TestSchema);