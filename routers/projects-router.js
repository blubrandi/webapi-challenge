const express = require("express");

const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

const router = express.Router();

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      if (project === 0) {
        return res(404).json({
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

module.exports = router;
