const express = require("express");

const server = express();

const projectsRouter = require("./routers/projects-router");
const actionsRouter = require("./routers/actions-router");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(
    `
        <h1>Hey there!  This is going to be an awesome Sprint Challenge!
        </h1>
        `
  );
});

module.exports = server;
