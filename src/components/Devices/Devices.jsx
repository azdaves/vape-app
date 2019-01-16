import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import classes from "./Device.module.css";

class Devices extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <div className={`bg-light border ${classes.desc}`}>
              <h4 className="text-center">{this.props.desc}</h4>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.devices.map((device, i) => (
            <Card key={i} data={device} selected={this.props.selected} />
          ))}
        </div>
        {this.props.count > 0 && (
          <div className="row">
            <div className="col-12 text-right">
              <Link
                to="bodyeffect"
                onClick={this.props.updateScore}
                className={`btn ${classes.nextBtn}`}
              >
                Next
              </Link>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Devices;
