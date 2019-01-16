import React, { Component } from "react";
import classes from "./OpinionCard.module.css";

class OpinionCard extends Component {
  selectedImgStyle = {
    transition: "all 0.2s",
    opacity: "0.7",
    transform: "scale(1.1)"
  };

  unselectImgStyle = {
    transition: "all 0.2s",
    opacity: "1",
    transform: "scale(1)"
  };

  selectedText = {
    transition: "all 0.2s",
    transform: "scale(1.1)",
    background: "#4f3b70",
    color: "#fefefe"
  };

  unselectText = {
    transition: "all 0.2s",
    background: "#fefefe",
    color: "#4f3b70",
    transform: "scale(1)"
  };

  render() {
    const { data } = this.props;
    return (
      <div className="col-lg-4 col-6 text-center my-2">
        <div
          className={`shadow-sm ${classes.OpinionCard}`}
          onClick={() => this.props.selected(data)}
        >
          <p
            className={classes.header}
            style={{
              color: data.selected ? "white" : "#333333",
              background: data.selected ? "#4f3b70" : "#f8f9fa"
            }}
          >
            {data.name}
          </p>
          <div
            className={` h-100 w-100 ${classes.opinionTextWrapper}`}
            style={data.selected ? this.selectedText : this.unselectedText}
          >
            <p className="p-3 m-0">{data.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OpinionCard;
