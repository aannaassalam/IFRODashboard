import React from "react";

import "./login.style.css";
import logo from "./logo.png";
import firebase from "firebase";
import Loader from "../components/loader/loader";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pwd: "",
      loading: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      if (user) {
        window.location.href = "/dashboard";
      }
    });
  }

  handleInput = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  };

  handleLogin = () => {
    this.setState({
      loading: true,
    });
    console.log("Logging In");
    firebase
      .firestore()
      .collection("admin")
      .where("email", "==", this.state.email)
      .get()
      .then((snap) => {
        if (snap.size > 0) {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.pwd)
            .then(() => {
              this.setState({
                loading: false,
              });
            })
            .catch((error) => {
              this.setState({
                loading: false,
              });
              alert(error);
            });
        } else {
          this.setState({
            loading: false,
          });
          alert("You are not a admin");
        }
      });
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <div className="form-header">
            <img src={logo} alt="logo" />
          </div>

          <div className="form-body">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter email"
                id="email"
                onChange={this.handleInput}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Enter password"
                id="pwd"
                onChange={this.handleInput}
              />
            </div>
            <div className="input-group">
              {this.state.loading ? (
                <div style={{ width: "30px", height: "30px" }}>
                  <Loader color="#d65a31" />
                </div>
              ) : (
                <button onClick={this.handleLogin}>Login</button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
