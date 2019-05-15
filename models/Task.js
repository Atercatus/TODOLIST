import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: "Title is required"
  },
  description: {
    type: String,
    required: "Description is required"
  },
  startDate: {
    type: String,
    required: "StartDate is required"
  },
  deadline: {
    type: String
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

const model = mongoose.model("Task", TaskSchema);

export default model;
