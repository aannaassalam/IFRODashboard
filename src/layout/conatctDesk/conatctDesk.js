import React from "react";
import "./contactDesk.css";
import ListView from "../../components/listView/listView";
import firebase from "firebase";
import Loader from "../../components/loader/loader";

export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: [],
      actualcontact: [],
      viewDetail: false,
      viewData: [],
      refreshing: false,
      loading: true,
      search: "",
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("ContactDesk")
      .orderBy("dateTime", "asc")
      .get()
      .then((snap) => {
        var i = 0;
        snap.forEach((doc) => {
          i++;
          var contact = {};
          contact["sr"] = i;
          contact["name"] = doc.data().name;
          contact["email"] = doc.data().email;
          contact["message"] = doc.data().message;
          contact["phone"] = doc.data().phone;
          contact["created"] = doc.data().dateTime;
          // user["la"] = doc.data().locationaccess;
          // user["logintype"] = doc.data().loginType;
          // contact["active"] =
          //   doc.data().dateTime && !doc.data().logout ? true : false;
          console.log(contact);
          this.setState({
            contact: [...this.state.contact, contact],
            actualcontact: [...this.state.actualcontact, contact],
          });
        });
        this.setState({
          loading: false,
        });
      });
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      search: [],
    });
    firebase
      .firestore()
      .collection("ContactDesk")
      .orderBy("dateTime", "asc")
      .get()
      .then((snap) => {
        this.setState({
          contact: [],
          actualcontact: [],
        });
        var i = 0;
        snap.forEach((doc) => {
          i++;
          var contact = {};
          contact["sr"] = i;
          contact["name"] = doc.data().name;
          contact["email"] = doc.data().email;
          contact["message"] = doc.data().message;
          contact["phone"] = doc.data().phone;
          contact["created"] = doc.data().dateTime;
          // user["logintype"] = doc.data().loginType;
          // user["la"] = doc.data().locationaccess;
          // contact["active"] =
          //   doc.data().dateTime ? true : false;
          this.setState({
            contact: [...this.state.contact, contact],
            actualcontact: [...this.state.actualcontact, contact],
          });
        });
        this.setState({
          refreshing: false,
        });
      });
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    this.setState({
      search: e.target.value,
    });
    var contact = [];
    if (e.target.value !== "") {
      this.state.actualcontact.map((user) => {
        if (
          user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.sr.toString().includes(e.target.value)
        ) {
          contact.push(user);
        }
      });
    } else {
      contact = this.state.actualcontact;
    }
    this.setState({
      contact: contact,
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "50px", height: "50px" }}>
              <Loader color={"#d65a31"} />
            </div>
          </div>
        ) : (
          <div className="users-container">
            <div className="top">
              <h1>
                Contact List
                <div className={this.state.refreshing ? "active" : "deactive"}>
                  <i onClick={this.handleRefresh} className="fas fa-sync-alt"></i>
                </div>
              </h1>
              <div className="search-bar">
                <input value={this.state.search} onChange={this.handleSearch} />
                <i className="fas fa-search"></i>
              </div>
            </div>
            <div className="seller-list">
              <ListView
                handleInfo={(e) => this.handleInfo(e)}
                data={this.state.contact}
                showinfo={false}
                showphoto={false}
                type={[
                  "Sr No.",
                  "Name",
                  "Email",
                  "Phone",
                  "Message",
                  // "Login Type",
                  "Date",
                  // "App Location Access",
                ]}
                value={[
                  "sr",
                  "name",
                  "email",
                  "phone",
                  "message",
                  // "logintype",
                  "created",
                  // "la",
                ]}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}
