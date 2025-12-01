const express = require("express");
const Ajv = require("ajv");
const createError = require("http-errors");
const { Task } = require("../../models/task");
const { addTaskSchema } = require("../../schemas");
const router = express.Router();

// GET return all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    console.error(`Error while getting tasks: ${err}`);
    next(err);
  }
});

// GET /task/:id - read a task by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    res.status(200).send(task);
  } catch (err) {
    next(err);
  }
});

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
