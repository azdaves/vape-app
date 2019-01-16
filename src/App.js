import React, { Component } from "react";
import SelectSection from "./components/SelectSection/SelectSection";
import logo from "./assets/images/logo.png";
import vapingBG from "./assets/images/vapingBG.jpeg";
import vape1 from "./assets/images/vapingDevices/vape1.jpeg";
import vape2 from "./assets/images/vapingDevices/vape2.jpeg";
import vape3 from "./assets/images/vapingDevices/vape3.jpg";
import vape4 from "./assets/images/vapingDevices/juul.jpeg";
import vape5 from "./assets/images/vapingDevices/pod.jpeg";
import none from "./assets/images/vapingDevices/none.jpeg";
import brain from "./assets/images/bodyParts/brain.jpeg";
import foot from "./assets/images/bodyParts/foot.jpeg";
import heart from "./assets/images/bodyParts/heart.jpeg";
import knee from "./assets/images/bodyParts/knee.jpeg";
import lungs from "./assets/images/bodyParts/lungs.jpeg";
import stomach from "./assets/images/bodyParts/stomach.jpeg";
import loading from "./assets/images/loading.svg";

import classes from "./App.module.css";

class App extends Component {
  state = {
    loadingImg: true,
    count: 0,
    headerCount: 0,
    sectionNumber: 1,
    partsLength: 0,
    opinionLength: 0,
    devices: [
      { url: vape1, name: "Device 1" },
      { url: vape2, name: "Device 2" },
      { url: vape3, name: "Device 3" },
      { url: vape4, name: "Device 4" },
      { url: vape5, name: "Device 5" },
      { url: none, name: "None" }
    ],
    bodyParts: [
      { url: brain, name: "Brain", point: 1 },
      { url: foot, name: "Foot", point: -1 },
      { url: heart, name: "Heart", point: 1 },
      { url: knee, name: "Knee", point: -1 },
      { url: lungs, name: "Lungs", point: 1 },
      { url: stomach, name: "Stomach", point: 1 }
    ],
    opinions: [
      { id: 1, text: "Vaping is a HUGE problem but I am not affected" },
      { id: 2, text: "Vaping is a HUGE problem AND I am affected" },
      { id: 3, text: "Vaping is a slight problem but I am not affected" },
      { id: 4, text: "Vaping is a slight problem AND I am affected" },
      { id: 5, text: "Vaping is not a problem" },
      { id: 6, text: "I choose not to give an opinion" }
    ]
  };

  handleDevice = device => {
    const devices = this.state.devices.filter(d => {
      if (d.name === device.name) {
        d.selected = !d.selected;
        return d;
      }
      return d;
    });
    const selection = this.state.devices.filter(d => d.selected);
    localStorage.setItem("devices", selection.map(s => s.name));
    const count = selection.length > 0 ? 3 : 0;
    this.setState({ devices, count });
  };

  handlePart = part => {
    const bodyParts = this.state.bodyParts.filter(p => {
      if (p.name === part.name) {
        if (p.selected) {
          const count = this.state.count - p.point;
          p.selected = !p.selected;
          this.setState({ count });
          return p;
        }
        p.selected = !p.selected;
        const count = this.state.count + p.point;
        this.setState({ count });
        return p;
      }
      return p;
    });

    const selection = this.state.bodyParts.filter(p => p.selected);
    const partsLength = this.state.bodyParts.filter(p => p.selected).length;
    localStorage.setItem("body_parts", selection.map(s => s.name));
    this.setState({ bodyParts, partsLength });
  };

  handleOpinion = option => {
    const opinions = this.state.opinions.filter(o => {
      o.selected = false;
      if (o.id === option.id) {
        o.selected = !o.selected;
        return o;
      }
      return o;
    });
    const selection = this.state.opinions.filter(o => o.selected);
    const opinionLength = this.state.opinions.filter(o => o.selected).length;
    const currentCount = opinionLength + this.state.headerCount;
    localStorage.setItem("opinion", selection.map(s => s.text));
    this.setState({
      opinions,
      opinionLength,
      count: currentCount
    });
  };

  handleImgLoad = e => {
    e.target.style.opacity = 1;
    this.setState({ loadingImg: false });
  };

  handleUpdateScore = () => {
    const headerCount = this.state.count;
    const sectionNumber = this.state.sectionNumber + 1;
    this.setState({ headerCount, sectionNumber });
  };

  render() {
    return (
      <React.Fragment>
        <nav
          className="navbar border-bottom w-100 navbar-light bg-light"
          style={{ position: "fixed", zIndex: "100" }}
        >
          <div className="container">
            <div className="row w-100">
              <div className="col-6">
                <a href="/" className="navbar-brand m-0">
                  <img width="60" src={logo} alt="logo" />
                  <span style={{ color: "#4f3b70" }}>Wranglers</span>
                </a>
              </div>
              <div className="col-6">
                <h5 className={classes.count}>
                  <span className="text-muted d-none d-sm-inline">score </span>
                  <span
                    className={`badge ${
                      this.state.headerCount > 0
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {this.state.headerCount}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </nav>
        {this.state.loadingImg && (
          <div className="text-center" style={{ paddingTop: "120px" }}>
            <img width="75" src={loading} alt="loading" />
          </div>
        )}

        <img
          src={vapingBG}
          style={{ opacity: "0", transition: "all 0.3s" }}
          onLoad={e => this.handleImgLoad(e)}
          className="w-100 h-auto pt-5 d-none d-md-block"
          alt="background"
        />
        <div className="container mb-5">
          <SelectSection
            count={this.state.count}
            devices={this.state.devices}
            bodyParts={this.state.bodyParts}
            partsLength={this.state.partsLength}
            opinions={this.state.opinions}
            opinionLength={this.state.opinionLength}
            selectedDevice={this.handleDevice}
            selectedPart={this.handlePart}
            selectedOpinion={this.handleOpinion}
            updateScore={this.handleUpdateScore}
            sectionNumber={this.state.sectionNumber}
          />
        </div>

        <footer className="bg-light text-center">
          <p className="py-3 text-muted m-0">
            Copyright&copy; {new Date().getFullYear()}
          </p>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
