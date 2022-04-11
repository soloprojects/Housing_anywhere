const mongoose = require("mongoose");
/**
 * List all drones with ​ ID ​,​ quadrant ​ and ​ current position ​ (x, y float).
 * Position is relative to quadrant. ​ Current position ​ should change over time.
 * It’s up to you to use a random values or a ​ formula ​ that makes movement over
 * time look realistic.
 *
 *
 * // x, y are coords
 // (values sent as strings, but must be treated as floating point number)
 * */
const droneSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  quadrant: {
    type: Number,
    required: true
  },
  typeOfMovement: {
    type: String,
    required: true
  },
  randomNumber: {
    type: Number,
    required: true
  },
  xPositiveSign: {
    type: Boolean,
    required: true
  },
  yPositiveSign: {
    type: Boolean,
    required: true
  }
});

const Drone = mongoose.model("Drone", droneSchema, "dronesCollection");

module.exports.Drone = Drone;