const express = require("express");

const actions = require("../data/helpers/actionModel");

const router = express.Router();

// GET all actions
router.get("/", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message:
          "There was an error retrieving actions information.  Please try again."
      });
    });
});

//GET action by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  actions
    .get(id)
    .then(actions => {
      if (actions === 0) {
        res(404).json({
          message:
            "Ooops!  Something went wrong.  We cannot find that action.  Please try again"
        });
      }
      res.json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Something went terribly wrong trying to get this action."
      });
    });
});

//POST add project
router.post("/", (req, res) => {
  const { project_id, description, notes } = req.body;
  actions
    .insert({ project_id, description, notes })
    .then(actions => {
      res.json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Cannot add action.  Please try again."
      });
    });
});

//PUT edit an action
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { description, notes } = req.body;
  actions
    .update(id, { description, notes })
    .then(actions => {
      res.json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Cannot update action, please try again."
      });
    });
});

// - DELETE remove an action by ID

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  actions
    .remove(actions)
    .then(actions => {
      res.json({ message: "Your action has been removed" });
    })
    .catch(error => {
      res.status(500).json({ error: error, message: "Cannot remove action" });
    });
});

module.exports = router;
