import React, { Component } from "react";
import classes from "./Submit.module.css";
class Submit extends Component {
  render() {
    return (
      <div className="row">
        <div className={`col-12 ${classes.submit}`}>
          <p>Thanks Chief</p>
          <h2>Total Score: {this.props.count}</h2>
        </div>
      </div>
    );
  }
}

export default Submit;
