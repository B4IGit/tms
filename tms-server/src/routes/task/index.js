const express = require("express");
const Ajv = require("ajv");
const createError = require("http-errors");
const { Task } = require("../../models/task");
const { addTaskSchema } = require("../../schemas");
const router = express.Router();

const ajv = new Ajv();

const validateAddTask = ajv.compile(addTaskSchema);

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
    const valid = validateAddTask(req.body);

    if (!valid) {
        return next(createError(400, ajv.errorsText(validateAddTask.errors)));
    }

    const payload = {
        ...req.body,
        projectId: req.params.projectId
    };

    const task = new Task(payload);
    await task.save();

    res.send({
      message: "Task created successfully",
      taskId: task._id,
    });
  } catch (err) {
    console.error(`Error while creating task: ${err}`);
    next(err);
  }
});
module.exports = router;
