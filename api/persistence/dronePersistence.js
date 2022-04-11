const droneModels = require("./../models/drone");
const logger = require("../config/logger")(module);

const {Drone} = droneModels;


module.exports = {
    async getAllDrones() {
        try {
            const result = await Drone.find();
            // logger.debug(`getAllDrones - success:`);
            return result;
        } catch (err) {
            logger.error(`getAllDrones - error:${  err}`);
            throw err;
        }
    },
    async saveDrone(drone) {
        logger.debug("saveDrone");
        try {
            const result = await drone.save();
            logger.debug(`saveDrone - success:`);
            return result;
        } catch (err) {
            logger.error(`saveDrone - error:${  err}`);
            throw err;
        }
    }
};