import React from "react";
import "./loader.css";
export default class Loader extends React.Component {
  render() {
    return (
      <div
        className="loader"
        style={{ borderTop: "5px solid " + this.props.color }}
      ></div>
    );
  }
}
