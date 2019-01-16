import React, { Component } from "react";
import classes from "./NotFound.module.css";
class NotFound extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div className={`col-12 ${classes.notFound}`}>Page is not found</div>
      </div>
    );
  }
}

export default NotFound;
