import React from "react";
// import "./donations.css";
import ListView from "../../components/listView/listView";
import firebase from "firebase";
import Loader from "../../components/loader/loader";

export default class Donations extends React.Component {
  constructor() {
    super();
    this.state = {
      donaters: [],
      actualDonaters: [],
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
      .collection("Donations")
      .get()
      .then((snap) => {
        var i = 0;
        snap.forEach((doc) => {
          i++;
          var donater = {};
          donater["sr"] = i;
          donater["name"] = doc.data().name;
          donater["purpose"] = doc.data().purpose;
          donater["email"] = doc.data().email;
          donater["region"] = doc.data().region;
          donater["phone"] = doc.data().phone;
          donater["address"] = doc.data().address;
          donater["created"] = doc.data().dateTime;
          donater["amount"] = doc.data().amount;
          donater["payId"] = doc.data().payId;
          // user["la"] = doc.data().locationaccess;
          // user["logintype"] = doc.data().loginType;
          // volunteer["active"] =
          //   doc.data().dateTime && !doc.data().logout ? true : false;
          // console.log(doc.data());
          this.setState({
            donaters: [...this.state.donaters, donater],
            actualDonaters: [...this.state.actualDonaters, donater],
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
          donaters: [],
          actualDonaters: [],
        });
        var i = 0;
        snap.forEach((doc) => {
          i++;
          var donater = {};
          donater["sr"] = i;
          donater["name"] = doc.data().name;
          donater["purpose"] = doc.data().purpose;
          donater["email"] = doc.data().email;
          donater["region"] = doc.data().region;
          donater["phone"] = doc.data().phone;
          donater["address"] = doc.data().address;
          donater["created"] = doc.data().dateTime;
          donater["amount"] = doc.data().amount;
          donater["payId"] = doc.data().payId;
          // user["logintype"] = doc.data().loginType;
          // user["la"] = doc.data().locationaccess;
          // volunteer["active"] =
          //   doc.data().dateTime ? true : false;
          // console.log(volunteer["active"], 85);
          this.setState({
            donaters: [...this.state.donaters, donater],
            actualDonaters: [...this.state.actualDonaters, donater],
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
    var donaters = [];
    if (e.target.value !== "") {
      this.state.actualDonaters.map((donater) => {
        if (
          donater.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          donater.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          donater.sr.toString().includes(e.target.value)
        ) {
          donaters.push(donater);
        }
      });
    } else {
      donaters = this.state.actualDonaters;
    }
    this.setState({
      donaters: donaters,
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
                Donaters List
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
                data={this.state.donaters}
                showinfo={false}
                showphoto={false}
                type={[
                  "Sr No.",
                  "Name",
                  "Email",
                  "Phone",
                  "Address",
                  "Amount",
                  "Payment ID",
                  // "Login Type",
                  "Date",
                  // "App Location Access",
                ]}
                value={[
                  "sr",
                  "name",
                  "email",
                  "phone",
                  "address",
                  "amount",
                  "payId",
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
