const express = require("express");

const server = express();

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
