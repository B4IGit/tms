/*const express = require("express");
const router = express.Router();
const { Project } = require("../../models/project");
const { addProjectSchema } = require("../../schemas");

// GET return all projects
router.get("/:id", async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.send(projects);
  } catch (err) {
    console.error(`Error while getting projects: ${err}`);
    next(err);
  }
});
router.post("/projectId",async (req, res, next) => {
  
  try {
     console.log("here")
     const payload = {
      ...req.body,
     }
     const project = new Project(payload)
     project.save()
     res.send({
      message:"project created succesfully"
     })
  } catch (err) {
    console.error(`Error while getting projects: ${err}`);
    next(err);
  }
})






module.exports = router;
*/



const express = require("express");
const router = express.Router();
const { Project } = require("../../models/project");
const { addProjectSchema } = require("../../schemas");


// GET /api/projects/:id  

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    return res.status(200).send(project);
  } catch (err) {
    console.error(`Error while getting project by id: ${err}`);
    return res.status(500).send({ message: "Server error" });
  }
});


// GET /api/projects  Return all projects

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find({});
    return res.status(200).send(projects);
  } catch (err) {
    console.error(`Error while getting projects: ${err}`);
    return res.status(500).send({ message: "Server error" });
  }
});


// POST /api/projects  Create a new project

router.post("/", async (req, res, next) => {
  try {
    const payload = { ...req.body };

    const project = new Project(payload);
    await project.save();

    return res.status(201).send({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    console.error(`Error while creating project: ${err}`);
    return res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
