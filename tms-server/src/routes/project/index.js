const express = require("express");
const router = express.Router();
const { Project } = require("../../models/project");
const { addProjectSchema } = require("../../schemas");
const Ajv = require("ajv");
const createError = require("http-errors");

const ajv = new Ajv();
const validateAddProject = ajv.compile(addProjectSchema);


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

// POST request to add a new project
router.post("/", async (req, res) => {
    try {
        const valid = validateAddProject(req.body);

        console.log(req.body);
        console.log(valid);
        if (!valid) {
            return res.status(400).send({
                message: ajv.errorsText(validateAddProject.errors),
            });
        }

        const projectWithId = {
            ...req.body,
            projectId: Math.floor(1000 + Math.random() * 9000)
        }

        const newProject = new Project(projectWithId);
        await newProject.save();

        return res.status(201).send({
            message: "Project created successfully",
            projectId: newProject._id,
        });
    } catch (err) {
        console.error(`Error while creating project: ${err}`);
        return res.status(500).send({ message: "Server error" });
    }
});


module.exports = router;
