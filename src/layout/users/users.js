import React from "react";
import "./users.css";
import ListView from "../../components/listView/listView";
import firebase from "firebase";
import Loader from "../../components/loader/loader";

export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      volunteers: [],
      actualVolunteers: [],
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
      .collection("volunteers")
      .get()
      .then((snap) => {
        var i = 0;
        snap.forEach((doc) => {
          i++;
          var volunteer = {};
          volunteer["sr"] = i;
          volunteer["name"] = doc.data().name;
          volunteer["photo"] = doc.data().photo;
          volunteer["email"] = doc.data().email;
          volunteer["nationality"] = doc.data().nationality;
          volunteer["phone"] = doc.data().phone;
          volunteer["address"] = doc.data().address;
          volunteer["created"] = doc.data().dateTime;
          // user["la"] = doc.data().locationaccess;
          // user["logintype"] = doc.data().loginType;
          // volunteer["active"] =
          //   doc.data().dateTime && !doc.data().logout ? true : false;
          console.log(volunteer);
          this.setState({
            volunteers: [...this.state.volunteers, volunteer],
            actualVolunteers: [...this.state.actualVolunteers, volunteer],
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
      .collection("volunteers")
      .get()
      .then((snap) => {
        this.setState({
          volunteer: [],
          actualVolunteer: [],
        });
        var i = 0;
        snap.forEach((doc) => {
          i++;
          var volunteer = {};
          volunteer["sr"] = i;
          volunteer["name"] = doc.data().name;
          volunteer["photo"] = doc.data().photo;
          volunteer["email"] = doc.data().email;
          volunteer["created"] = doc.data().dateTime;
          volunteer["nationality"] = doc.data().nationality;
          volunteer["phone"] = doc.data().phone;
          volunteer["address"] = doc.data().address;
          // user["logintype"] = doc.data().loginType;
          // user["la"] = doc.data().locationaccess;
          // volunteer["active"] =
          //   doc.data().dateTime ? true : false;
          console.log(volunteer["active"], 85);
          this.setState({
            volunteers: [...this.state.volunteers, volunteer],
            actualVolunteers: [...this.state.actualVolunteers, volunteer],
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
    var volunteers = [];
    if (e.target.value !== "") {
      this.state.actualVolunteers.map((user) => {
        if (
          user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.sr.toString().includes(e.target.value)
        ) {
          volunteers.push(user);
        }
      });
    } else {
      volunteers = this.state.actualVolunteers;
    }
    this.setState({
      volunteers: volunteers,
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
                Volunteers List
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
                data={this.state.volunteers}
                showinfo={false}
                showphoto={true}
                type={[
                  "Sr No.",
                  "Name",
                  "Email",
                  "Nationality",
                  "Phone",
                  "Address",
                  // "Login Type",
                  "Date",
                  // "App Location Access",
                ]}
                value={[
                  "sr",
                  "name",
                  "email",
                  "nationality",
                  "phone",
                  "address",
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
