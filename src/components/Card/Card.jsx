import React, { Component } from "react";
import classes from "./Card.module.css";

class Card extends Component {
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
          className={`shadow-sm ${classes.card}`}
          onClick={() => this.props.selected(data)}
        >
          {data.url ? (
            <React.Fragment>
              <p
                className={classes.header}
                style={{
                  color: data.selected ? "white" : "#333333",
                  background: data.selected ? "#4f3b70" : "#f8f9fa"
                }}
              >
                {data.name}
              </p>

              <div className={classes.img}>
                {data.selected && <div className={classes.backdrop} />}
                <img
                  width="100%"
                  style={
                    data.selected
                      ? this.selectedImgStyle
                      : this.unselectImgStyle
                  }
                  src={data.url}
                  alt="something"
                />
              </div>
            </React.Fragment>
          ) : (
            <p
              className="p-3 m-0"
              style={data.selected ? this.selectedText : this.unselectedText}
            >
              {data.text}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
