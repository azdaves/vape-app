import React, { Component } from "react";
// import Card from "../Card/Card";
import OpinionCard from "./OpinionCard/OpinionCard";
import { Link } from "react-router-dom";
import classes from "./Opinions.module.css";

class Opinions extends Component {
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
          {this.props.opinions.map((opinion, i) => (
            <OpinionCard
              key={i}
              data={opinion}
              selected={this.props.selected}
            />
          ))}
        </div>
        {this.props.opinionLength > 0 && (
          <div className="row">
            <div className="col-12 text-right">
              <Link
                to="/survey"
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

export default Opinions;
