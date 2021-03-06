import mongoose from "mongoose";

const TodolistSchema = new mongoose.Schema({
  listTitle: {
    type: String,
    required: "Title is required"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const model = mongoose.model("TodoList", TodolistSchema);
export default model;
