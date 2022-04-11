import React from "react";
import { Scatter } from "react-chartjs-2";
import PropTypes from "prop-types";
import Drone from "./Drone";

// https://github.com/jerairrest/react-chartjs-2

class Quadrant extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getScatterConfig() {
    return {
      data: {
        datasets: [], labels: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{ ticks: { min: 0, max: 100, stepSize: 20 } }],
          xAxes: [{ ticks: { min: 0, max: 100, stepSize: 20 } }]
        }
      }
    };
  }

  getScatterConfigrFromDroneMap() {
    const scatterConfig = this.getScatterConfig();
    if (this.props && this.props.droneMap) {
      const droneMapData = Object.keys(this.props.droneMap).map(key => {
        const drone = this.props.droneMap[key];
        return { x: drone.x, y: drone.y };
      });

      scatterConfig.data.datasets = [{
        data: droneMapData
      }];
    }
    return scatterConfig;


  }

  render() {
    const { id } = this.props;
    const { data, options } = this.getScatterConfigrFromDroneMap();
    const divStyle = {
      width: "250px",
      height: "250px"
    };
    return (
      <div>
        <h2>
          Quadrant
          {` ${id}`}
        </h2>
        <div style={divStyle}>
          <Scatter data={data} options={options} width={250} height={250} />
        </div>
      </div>
    )
      ;
  }
}

Quadrant.propTypes = {
  id: PropTypes.string,
  droneMap: PropTypes.object
};
export default Quadrant;
