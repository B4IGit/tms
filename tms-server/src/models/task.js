const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: [true, "Task name is required"] },
  description: {
    type: String,
    required: [true, "Task description is required"],
  },
  status: {
    type: String,
    required: [true, "Task status is required"],
    enum: {
      values: ["Pending", "In Progress", "Completed"],
      message: "`{VALUE}` is not a valid enum value for path `status`.",
    },
  },
  priority: {
    type: String,
    required: [true, "Task priority is required"],
    enum: {
      values: ["Low", "Medium", "High"],
      message: "`{VALUE}` is not a valid enum value for path `priority`.",
    },
  },
  dueDate: { type: Date },
  dateCreated: { type: Date, default: Date.now },
  dateModified: { type: Date },
  projectId: { type: Number, required: [true, "Project ID is required"] },
});

taskSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.dateModified = new Date();
  }
  next();
});

module.exports = {
  Task: mongoose.model("Task", taskSchema),
};
