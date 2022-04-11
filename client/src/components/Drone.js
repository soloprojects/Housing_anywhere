import React from "react";
import PropTypes from 'prop-types';

class Drone extends React.PureComponent {
  render() {
    const { id, x,y } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <span className="">
            ID,
            {id}
          </span>
          <span className="">
            X,
            {x}
          </span>
          <span className="">
            Y,
            {y}
          </span>
        </div>
      </div>
    );
  }
}

Drone.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Drone;
