const express = require("express");
const router = express.Router();
const { mongo } = require("../../src/utils/mongo");

router.get("/", function (req, res, next) {
  try {
    mongo(async (db) => {
      const tasks = await db.collection("tasks").find().toArray();
      console.log("List of all tasks in the database:", tasks);
      res.send(tasks);
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
