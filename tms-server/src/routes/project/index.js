const express = require("express");
const router = express.Router();
const { Project } = require("../../models/project");
const { addProjectSchema } = require("../../schemas");

// GET return all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (err) {
    console.error(`Error while getting projects: ${err}`);
    next(err);
  }
});

module.exports = router;
