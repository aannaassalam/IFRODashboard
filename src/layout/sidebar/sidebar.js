import React from "react";
import "./sidebar.css";
import logo from "./logo.jpg";

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <p>IFRO</p>
        </div>
        <div
          onClick={() => this.props.handleTab(1)}
          className={this.props.tab === 1 ? "item-active" : "item"}
        >
          <i className="fab fa-dashcube"></i>
          <p>Dashboard</p>
        </div>
        <div
          onClick={() => this.props.handleTab(2)}
          className={this.props.tab === 2 ? "item-active" : "item"}
        >
          <i className="fas fa-user-friends"></i>
          <p>Volunteers</p>
        </div>
        <div
          onClick={() => this.props.handleTab(3)}
          className={this.props.tab === 3 ? "item-active" : "item"}
        >
          <i className="fas fa-hand-holding-usd"></i>
          <p>Donations</p>
        </div>
        <div
          onClick={() => this.props.handleTab(4)}
          className={this.props.tab === 4 ? "item-active" : "item"}
        >
          <i className="fas fa-comment-dots"></i>
          <p>Contact</p>
        </div>
      </div>
    );
  }
}
