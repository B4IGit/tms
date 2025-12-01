const express = require("express");
const Ajv = require("ajv");
const createError = require("http-errors");
const { Task } = require("../../models/task");
const { addTaskSchema } = require("../../schemas");
const router = express.Router();


// POST request to create a new task to the task's collection
router.post("/:projectId", async (req, res, next) => {
  try {

    const task = new Task(req.body);
    await task.save();

    res.send({
      message: "Task created successfully",
      taskId: task.taskId,
    });
  } catch (err) {
    console.error(`Error while creating task: ${err}`);
    next(err);
  }
});

module.exports = router;
