import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import classes from "./Survey.module.css";
import loading from "../../assets/images/loading.svg";

class Survey extends Component {
  state = {
    showSubmit: false,
    showSeen: false,
    showWhere: false,
    redirectToThank: false,
    saveLoading: false,
    problemIsChecked: false,
    locationErr: "",
    problemErr: ""
  };

  handleSubmit = async e => {
    this.setState({ locationErr: "", problemErr: "" });
    e.preventDefault();
    const places = [];
    if (e.target.place) {
      e.target.place.forEach(p => {
        if (p.checked) {
          places.push(p.value);
        }
      });
    }

    const obj = {
      devices: localStorage.getItem("devices").split(","),
      body_parts: localStorage.getItem("body_parts").split(","),
      opinion: localStorage.getItem("opinion"),
      whereSeen: places.length > 0 ? places : [],
      isItProblem: e.target.problem.value === "true" ? true : false,
      oftenSeen: e.target.seen ? e.target.seen.value : "",
      message: e.target.msg.value,
      score: Number(this.props.count)
    };

    if (!this.state.problemIsChecked) {
      this.setState({ problemErr: "Field is required" });
      return false;
    }
    if (obj.oftenSeen !== "Never" && places.length === 0) {
      this.setState({ locationErr: "At least one selection is requied!" });
      return false;
    }

    try {
      this.setState({ saveLoading: true });
      await axios.post("https://vape-be.herokuapp.com/api/vaping", obj);
      this.setState({ redirectToThank: true, saveLoading: false });
    } catch (ex) {
      console.log("Error:", ex);
    }
  };

  handleShowWhere = e => {
    const showSubmit = this.state.showWhere ? true : false;
    this.setState({
      showSubmit,
      showWhere: true
    });
  };

  handleHideWhere = e => {
    this.setState({ showWhere: false, showSubmit: true });
  };

  handleWhere = e => {
    if (e.target.checked) {
      this.setState({ locationErr: "" });
    }
    this.setState({ showSubmit: true });
  };

  handleProblemChange = () => {
    this.setState({ problemIsChecked: true, problemErr: "" });
  };

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)} className={classes.form}>
        {this.state.redirectToThank && <Redirect to="/submit" />}
        {this.state.saveLoading ? (
          <div className="text-center">
            <img width="75" src={loading} alt="loading" />
          </div>
        ) : (
          <React.Fragment>
            <div className="form-group">
              <h5>Do you think vaping is a problem on this campus?</h5>
              {this.state.problemErr !== "" && (
                <div className="alert alert-danger">
                  {this.state.problemErr}
                </div>
              )}
              <div className="form-check">
                <input
                  id="yes"
                  type="radio"
                  name="problem"
                  value="true"
                  className="form-check-input"
                  onChange={this.handleProblemChange}
                />
                <label htmlFor="yes" className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  id="no"
                  type="radio"
                  name="problem"
                  value="false"
                  className="form-check-input"
                  onChange={this.handleProblemChange}
                />
                <label htmlFor="no" className="form-check-label">
                  No
                </label>
              </div>
            </div>
            <hr />

            <div className="form-group">
              <h5>How often have you seen someone vaping on campus?</h5>
              <div className="form-check">
                <input
                  id="never"
                  type="radio"
                  name="seen"
                  value="Never"
                  onChange={e => this.handleHideWhere(e)}
                  className="form-check-input"
                />
                <label htmlFor="never" className="form-check-label">
                  Never
                </label>
              </div>
              <div className="form-check">
                <input
                  id="monthly"
                  type="radio"
                  name="seen"
                  value="Monthly"
                  onChange={e => this.handleShowWhere(e)}
                  className="form-check-input"
                />
                <label htmlFor="monthly" className="form-check-label">
                  Monthly
                </label>
              </div>
              <div className="form-check">
                <input
                  id="weekly"
                  type="radio"
                  name="seen"
                  value="Weekly"
                  onChange={e => this.handleShowWhere(e)}
                  className="form-check-input"
                />
                <label htmlFor="weekly" className="form-check-label">
                  Weekly
                </label>
              </div>
              <div className="form-check">
                <input
                  id="daily"
                  type="radio"
                  name="seen"
                  value="Daily"
                  onChange={e => this.handleShowWhere(e)}
                  className="form-check-input"
                />
                <label htmlFor="daily" className="form-check-label">
                  Daily
                </label>
              </div>
              <div className="form-check">
                <input
                  id="hourly"
                  type="radio"
                  name="seen"
                  value="Hourly"
                  onChange={e => this.handleShowWhere(e)}
                  className="form-check-input"
                />
                <label htmlFor="hourly" className="form-check-label">
                  Hourly
                </label>
              </div>
              <hr />
            </div>

            {this.state.showWhere && (
              <div className="form-group">
                <h5>
                  Where do you see it?
                  <small className="text-muted ml-2">
                    (selected all that apply)
                  </small>
                </h5>
                {this.state.locationErr !== "" && (
                  <div className="alert alert-danger">
                    {this.state.locationErr}
                  </div>
                )}
                <div className="form-check">
                  <input
                    id="G_BLDG_Bathroom"
                    type="checkbox"
                    name="place"
                    value="G BLDG Bathroom"
                    onChange={e => this.handleWhere(e)}
                    className="form-check-input"
                  />
                  <label htmlFor="G_BLDG_Bathroom" className="form-check-label">
                    G BLDG Bathroom
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="H_BLDG_Bathroom"
                    type="checkbox"
                    name="place"
                    value="H BLDG Bathroom"
                    onChange={e => this.handleWhere(e)}
                    className="form-check-input"
                  />
                  <label htmlFor="H_BLDG_Bathroom" className="form-check-label">
                    H BLDG Bathroom
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="Cafeteria_Bathroom"
                    type="checkbox"
                    name="place"
                    value="Cafeteria Bathroom"
                    className="form-check-input"
                    onChange={e => this.handleWhere(e)}
                  />
                  <label
                    htmlFor="Cafeteria_Bathroom"
                    className="form-check-label"
                  >
                    Cafeteria Bathroom
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="Gym_Bathroom"
                    type="checkbox"
                    name="place"
                    value="Gym Bathroom"
                    className="form-check-input"
                    onChange={e => this.handleWhere(e)}
                  />
                  <label htmlFor="Gym_Bathroom" className="form-check-label">
                    Gym Bathroom
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="Classroom"
                    type="checkbox"
                    name="place"
                    value="Classroom"
                    className="form-check-input"
                    onChange={e => this.handleWhere(e)}
                  />
                  <label htmlFor="Classroom" className="form-check-label">
                    Classroom
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="other"
                    type="checkbox"
                    name="place"
                    value="Other"
                    className="form-check-input"
                    onChange={e => this.handleWhere(e)}
                  />
                  <label htmlFor="other" className="form-check-label">
                    Other
                  </label>
                </div>
                <hr />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="msg">Message</label>
              <textarea id="msg" rows="3" name="msg" className="form-control" />
            </div>
            {this.state.showSubmit && (
              <button type="submit" className={`btn ${classes.nextBtn}`}>
                Submit
              </button>
            )}
          </React.Fragment>
        )}
      </form>
    );
  }
}

export default Survey;
