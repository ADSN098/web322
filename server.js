/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part * of this assignment has
been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.
Name: __Adson Davis____________________
Student ID: __164876229____________
Date: ___10/09/2024_____________
Cyclic Web App URL: _______________________________________________________
GitHub Repository URL: ______________________________________________________
********************************************************************************/

const projectData = require("./modules/projects");

const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
  projectData.initialize();
});

//app.use(express.static(__dirname + '/data'));

app.get("/", (req, res) => {
  res.send("Assignment 2: Lap Fai Tam - 126575232");
});

let needInit = true;
app.use(async (req, res, next) => {
  if (needInit) {
    await projectData.initialize();
    needInit = false;
  }
    next();
});

app.get("/solutions/projects", (req, res) => {
  projectData
    .getProjects()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/solutions/projects/:id(\\d+)", (req, res) => {
  projectData
    .getProjectById(parseInt(req.params.id))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/solutions/projects/:sector([a-zA-Z]+)", (req, res) => {
  projectData
    .getProjectsBySector(req.params.sector)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
