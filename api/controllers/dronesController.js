const uuidv4 = require('uuid/v4');
const dronePersistence = require("../persistence/dronePersistence");
const logger = require("../config/logger")(module);
const Drone = require("../models/drone");
const dronePosition = require("../models/dronePosition");
const www = require("../bin/www");

exports.createDrone = (req, res) => {
  const uuid = uuidv4();
  const drone = new Drone.Drone({
    id: uuid,
    x: req.body.x,
    y: req.body.y,
    quadrant: req.body.quadrant,
    typeOfMovement: req.body.typeOfMovement,
    randomNumber: Math.floor(Math.random() * 10),
    xPositiveSign: Math.random() >= 0.5,
    yPositiveSign: Math.random() >= 0.5
  });
  dronePersistence.saveDrone(drone)
    .then(() => {
      logger.debug(` createDrone - success:${drone.id}`);
      res.send({ success: drone });
    })
    .catch((err) => {
      logger.error(` createDrone - error:${err}`);
      res.status(422).json(err);
    });
};

exports.getAllDrones = (req, res) => {
  logger.debug(" getAllDrones");

  dronePersistence.getAllDrones()
    .then((x) => {
      logger.debug(` getAllDrones - success:`);
      res.send(x);
    })
    .catch((err) => {
      logger.error(` getAllDrones - error:${err}`);
      res.status(422).json(err);
    });
};

exports.updatePositionAllDrones = (req, res) => {
  dronePersistence.getAllDrones()
    .then((dronesLis) => {
      dronesLis.forEach(drone => {
        const droneObjUpdated = dronePosition.updatePositionByDrone(drone);
        droneObjUpdated.save()
          .then(www.io.emit("droneUpdated", droneObjUpdated))
          .catch((err) => {
          logger.error(` getAllDrones - droneObjUpdated:${droneObjUpdated} - error:${err} `);
          throw Error();
        });
      });
      res.send({ STATUS: "OK" });
    })
    .catch((err) => {
      logger.error(` getAllDrones - error:${err}`);
      res.status(422).json(err);
    });
};


