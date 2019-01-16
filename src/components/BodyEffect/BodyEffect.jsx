import React, { Component } from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import classes from "./BodyEffect.module.css";
class BodyEffect extends Component {
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
          {this.props.bodyParts.map((part, i) => (
            <Card key={i} data={part} selected={this.props.selected} />
          ))}
        </div>
        {this.props.partsLength > 0 && (
          <div className="row">
            <div className="col-12 text-right">
              <Link
                to="/opinions"
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

export default BodyEffect;
