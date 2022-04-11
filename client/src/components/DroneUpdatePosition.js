import React from "react";

class DroneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.jobPostDrone();
  }


  handleSubmit(event) {
    event.preventDefault();
    this.postUpdatePosition();
  }

  postUpdatePosition() {
    fetch("http://localhost:9000/api/v1/drones/updatePosition",
      {
        method: "post",
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch(console.log);
  }

  jobPostDrone() {
    setInterval(() => this.postUpdatePosition(), 500);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Drone Form</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Update Drone Position" className="btn btn-primary"/>
          </form>
        </div>
      </div>
    );
  }

}


export default DroneForm;
