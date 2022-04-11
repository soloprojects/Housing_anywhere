import React, { Component } from "react";
import Quadrant from "./Quadrant";
import { subscribeToTimer, subscribeToDroneUpdate, subscribeToDroneQuadrantUpdated } from "../utils/socketClient";

class QuadrantList extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
    subscribeToDroneUpdate((err, drone) => this.setDroneUpdateToDroneMap(drone));

    subscribeToDroneQuadrantUpdated((err, drone) => this.droneQuadrantUpdated(drone));

    this.state = {
      loading: true,
      dronesList: [],
      droneMapByQuadrantMap: {},
      droneMap: {},
      timestamp: "no timestamp yet",
      drone: "no drone yet"
    };
  }

  static droneListToDroneMap(droneList) {
    const droneMapByQuadrantMap = droneList.reduce((map, obj) => {
      const result = { ...map };
      if (!result[obj.quadrant]) {
        result[obj.quadrant] = {
          [obj.id]: obj
        };
      } else {
        result[obj.quadrant][obj.id] = obj;
      }
      return result;
    }, {});
    for (let i = 1; i < 5; i++) {
      if (!droneMapByQuadrantMap[i] || (Object.keys(droneMapByQuadrantMap[i]) && !Object.keys(droneMapByQuadrantMap[i]).length)) {
        droneMapByQuadrantMap[i] = {};
      }
    }
    return droneMapByQuadrantMap;

  }

  componentDidMount() {
    this.getDrones();
  }

  // eslint-disable-next-line react/sort-comp
  droneQuadrantUpdated(drone){
    console.log('droneQuadrantUpdated', drone)
  }

  setDroneUpdateToDroneMap(drone) {
    const { droneMapByQuadrantMap, droneMap } = this.state;
    // NEW QUADRANT
    if (!droneMapByQuadrantMap[drone.quadrant]) {
      droneMapByQuadrantMap[drone.quadrant] = {};
    }
    // if drone's quadrant have changed, i have to remove it from the previous one
    if (droneMap[drone.id] && droneMap[drone.id].quadrant !== drone.quadrant) {
      delete droneMapByQuadrantMap[droneMap[drone.id].quadrant][drone.id];
    }
    droneMapByQuadrantMap[drone.quadrant][drone.id] = drone;
    this.addDroneMap(drone);
    this.setState({
      droneMapByQuadrantMap
    });
  }


  getDrones() {
    console.log("getDrones");
    fetch("http://localhost:9000/api/v1/drones")
      .then(res => {
        return res.json();
      })
      .then(data => {
        // Drone map
        const droneMap = data.reduce((map, obj) => {
          const result = { ...map };
          result[obj.id] = obj;
          return result
        }, {});
        this.setState({ droneMap });
        this.setState({ loading: false });

        return data;
      })
      .then(data => {
        this.setState({ dronesList: data });
        const droneMapByQuadrantMap = QuadrantList.droneListToDroneMap(data);
        console.log("droneMapByQuadrantMap", droneMapByQuadrantMap);
        this.setState({ droneMapByQuadrantMap });
        console.log("getDrones - Sucess", this.state);
      })
      .catch(error => {
        console.error("getDrones - Error", error);
      });
  }

  addDroneMap(drone) {
    const { droneMap } = this.state;
    droneMap[drone.id] = drone;
    this.setState({ droneMap });
  }



  render() {
    const { droneMapByQuadrantMap, loading } = this.state;
    if (loading) {
      return (<p>Loading..</p>);
    }
    return (
      <div>
        <div className="row">
          <div className="col-xs-6" key={`col-${4}`}>
            <Quadrant droneMap={droneMapByQuadrantMap[4]} id={4} key={4} />
          </div>
          <div className="col-xs-6" key={`col-${1}`}>
            <Quadrant droneMap={droneMapByQuadrantMap[1]} id={1} key={1} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6" key={`col-${3}`}>
            <Quadrant droneMap={droneMapByQuadrantMap[3]} id={3} key={3} />
          </div>
          <div className="col-xs-6" key={`col-${2}`}>
            <Quadrant droneMap={droneMapByQuadrantMap[2]} id={2} key={2} />
          </div>
        </div>
      </div>
    );
  }
}

export default QuadrantList;
