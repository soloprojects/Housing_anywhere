const express = require("express");
const dronesController = require("../controllers/dronesController");

const dronesRoute = express.Router();


/* GET users listing. */
dronesRoute.get("/", (req, res) => dronesController.getAllDrones(req, res));

dronesRoute.post(
  "/", (req, res) => dronesController.createDrone(req, res)
);

dronesRoute.post(
    "/updatePosition", (req, res) => dronesController.updatePositionAllDrones(req, res)
);
module.exports = dronesRoute;
