const constants = require("../util/constants");
const logger = require("../config/logger")(module);
const www = require("../bin/www");

function getNextQuadrantX(drone) {
  if (drone.x > 100) {
    if (drone.quadrant === 1) {
      drone.quadrant = 4;
    }
    if (drone.quadrant === 2) {
      drone.quadrant = 3;
    }
    if (drone.quadrant === 3) {
      drone.quadrant = 2;
    }
    if (drone.quadrant === 4) {
      drone.quadrant = 1;
    }
    drone.x = 100;
    drone.xPositiveSign = false;
  } else if (drone.x < 0) {
    if (drone.quadrant === 1) {
      drone.quadrant = 4;
    }
    if (drone.quadrant === 2) {
      drone.quadrant = 3;
    }
    if (drone.quadrant === 3) {
      drone.quadrant = 2;
    }
    if (drone.quadrant === 4) {
      drone.quadrant = 1;
    }
    drone.x = 0;
    drone.xPositiveSign = true;
  }
  return drone;
}

function getNextQuadrantY(drone) {
  if (drone.y > 100) {
    if (drone.quadrant === 1) {
      drone.quadrant = 2;
    }
    if (drone.quadrant === 2) {
      drone.quadrant = 1;
    }
    if (drone.quadrant === 3) {
      drone.quadrant = 4;
    }
    if (drone.quadrant === 4) {
      drone.quadrant = 3;
    }
    drone.y = 100;
    drone.yPositiveSign = false;

  } else if (drone.y < 0) {
    if (drone.quadrant === 1) {
      drone.quadrant = 4;
    }
    if (drone.quadrant === 2) {
      drone.quadrant = 3;
    }
    if (drone.quadrant === 3) {
      drone.quadrant = 4;
    }
    if (drone.quadrant === 4) {
      drone.quadrant = 3;
    }
    drone.y = 0;
    drone.yPositiveSign = true;
  }
  return drone;
}

function getNextQuadrant(drone) {
  const droneCopy = JSON.parse(JSON.stringify(drone));
  let myDrone = drone;
  myDrone = getNextQuadrantX(drone);
  myDrone = getNextQuadrantY(drone);
  if (droneCopy.quadrant !== drone.quadrant) {
    logger.error(`getNextQuadrant, myDrone ${myDrone}, droneCopy ${droneCopy}`);
    www.io.emit("droneQuadrantUpdated", myDrone);
  }
  return myDrone;
}

function getNextPositionLinear(drone) {
  const myDrone = drone;
  let STEP_SIZE = drone.randomNumber / 2;
  let slope = drone.randomNumber / 10; // THIS IS AN IMPORTANT NUMBER
  const intercept = drone.randomNumber / 2;
  if (!drone.xPositiveSign) {
    STEP_SIZE = -STEP_SIZE;
  }
  if (!drone.yPositiveSign) {
    slope = -slope;
  }
  myDrone.x += STEP_SIZE;
  myDrone.y = intercept + (slope * (drone.x));
  logger.debug(`getNextPositionLinear ${myDrone}`);
  const nextQuadrant = getNextQuadrant(myDrone);
  return nextQuadrant;
}


exports.updatePositionByDrone = (drone) => {
  if (drone.typeOfMovement === constants.TYPE_OF_MOVEMENT_LINEAR) {
    return getNextPositionLinear(drone);
  }
  return null;
};