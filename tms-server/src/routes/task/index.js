const express = require("express");
const router = express.Router();
const { Task } = require("../../models/task");

// POST request to create a new task to the task's collection
router.post("/", async (req, res, next) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.send({
      message: "Task created successfully",
      taskId: newTask.taskId,
    });
  } catch (err) {
    console.error(`Error while creating new task: ${err}`);
    next(err);
  }
});

module.exports = router;
