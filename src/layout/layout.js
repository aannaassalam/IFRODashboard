import React from "react";
import "./layout.css";
import firebase from "firebase";
import Sidebar from "./sidebar/sidebar";
import Dashboard from "./dashboard/dashboard";
import Users from "./users/users";
import Products from "./products/products";
import ContactDesk from './conatctDesk/conatctDesk'
import Loader from "../components/loader/loader";
import logo from "../layout/sidebar/logo.jpg";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 1,
      showProfileMenu: false,
      currentUser: [],
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("admin")
          .where("email", "==", user.email)
          .onSnapshot((snap) => {
            console.log(snap.size);
            snap.docChanges().forEach((change) => {
              this.setState(
                {
                  currentUser: change.doc.data(),
                  loading: false,
                },
                () => {
                  console.log(this.state.currentUser);
                }
              );
            });
          });
      } else {
        this.setState({
          currentUser: [],
        });
        window.location.href = "/";
      }
    });
  }

  handleProfile = (data) => {
    this.setState({
      userData: data,
      loading: false,
    });
  };

  handleLogout = () => {
    firebase.auth().signOut();
  };

  handleTab = (e) => {
    this.setState({
      tab: e,
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              background: "#15202B",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "50px", height: "50px" }}>
              <Loader color={"#d65a31"} />
            </div>
          </div>
        ) : (
          <div className="layout-container">
            <div className="sidebar">
              <Sidebar
                tab={this.state.tab}
                handleTab={(e) => this.handleTab(e)}
              />
            </div>
            <div className="body">
              <div className="header">
                <h1 className="profile-name">
                  <span>Hello, </span>
                  Admin
                </h1>
                <div className="header-buttons">
                  {/* <i className="fas fa-bell">
                    <div className="noti"></div>
                  </i> */}
                  <div className="profile">
                    <img
                      src={logo}
                      className="profile-logo"
                      onClick={() =>
                        this.setState({
                          showProfileMenu: !this.state.showProfileMenu,
                        })
                      }
                    />
                    <i
                      className="fas fa-caret-down"
                      onClick={() =>
                        this.setState({
                          showProfileMenu: !this.state.showProfileMenu,
                        })
                      }
                    ></i>
                    {this.state.showProfileMenu ? (
                      <div className="profile-menu">
                        <p onClick={this.handleLogout}>Log Out</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="content">
                {this.state.tab === 1 ? <Dashboard /> : null}
                {this.state.tab === 2 ? <Users /> : null}
                {this.state.tab === 3 ? <Products /> : null}
                {this.state.tab === 4 ? <ContactDesk /> : null}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
