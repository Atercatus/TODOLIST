import mongoose from "mongoose";

const TodolistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is required"
  },
  description: {
    type: String,
    required: "Description is required"
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  },
  // 1: low, 2: middle, 3: high
  priority: {
    type: Number,
    default: 1
  },
  // 0: not started, 1: processing, 2: finished, 3: over
  status: {
    type: Number,
    default: 0
  }
});

const model = mongoose.model("TodoList", TodolistSchema);
export default model;
