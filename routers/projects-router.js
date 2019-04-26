const express = require("express");

const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

const router = express.Router();

// GET all posts
router.get("/", (req, res) => {
  projects
    .get()
    .then(projects => {
      res.json(projects);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "There was an error retrieving projects.  Please try again."
      });
    });
});

//GET post by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      if (project === 0) {
        res(404).json({
          message:
            "Ooops!  Something went wrong.  We cannot find that post.  Please try again"
        });
      }
      res.json(project);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Something went terribly wrong trying to get this project."
      });
    });
});

//POST add project
router.post("/", (req, res) => {
  const { name, description } = req.body;
  projects
    .insert({ name, description })
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Cannot add project.  Please try again."
      });
    });
});

//PUT edit a project
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  projects
    .update(id, { name, description })
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Cannot update project, please try again."
      });
    });
});

// - DELETE remove a post by ID

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  projects
    .remove(id)
    .then(project => {
      res.json({ message: "Your project has been removed" });
    })
    .catch(error => {
      res.status(500).json({ error: error, message: "Cannot remove project" });
    });
});

module.exports = router;
