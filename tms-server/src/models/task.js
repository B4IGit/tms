const express = require("express");
const { mongo } = require("../../utils/mongo");
const { ObjectId } = require("mongodb");

const router = express.Router();

// GET /task/:id
router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    mongo(async (db) => {
      const task = await db
        .collection("tasks")
        .findOne({ _id: new ObjectId(id) });

      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }

      res.send(task);
    }, next);

  } catch (err) {
    next(err);
  }
});

module.exports = router;

