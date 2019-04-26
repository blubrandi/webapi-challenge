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
        message: "There was an error retrieving posts.  Please try again."
      });
    });
});

module.exports = router;
