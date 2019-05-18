import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: "Title is required"
  },
  description: {
    type: String
  },
  startDate: {
    type: String,
    required: "StartDate is required"
  },
  deadline: {
    type: String
  },
  priority: {
    // 1: low, 2: middle, 3: high
    type: Number,
    default: 1
  },
  status: {
    // 0: not started, 1: processing, 2: finished
    type: Number,
    default: 0
  }
});

const model = mongoose.model("Task", TaskSchema);

export default model;
