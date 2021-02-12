import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
  },
  title: {
    type: String,
    // required: "Tilte is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Board", BoardSchema);
export default model;
