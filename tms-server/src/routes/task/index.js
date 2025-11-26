/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: index.js
 * Description: Routing for the index page.
 */

const express = require("express");
const router = express.Router();
const { mongo } = require("../../utils/mongo");
const { ObjectId } = require("mongodb");

// GET /task/:id read a task by id
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    mongo(async (db) => {
      const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });

      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }

      res.status(200).send(task);
    }, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

  