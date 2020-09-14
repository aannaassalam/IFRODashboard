import React from "react";
import "./dashboard.css";
import AreaChart from "./areaChart/areaChart";
import Loader from "../../components/loader/loader";

import firebase from "firebase";
import BarChart from "./barChart/barChart";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      vadata: [],
      vam: [],
      donationdata: [],
      dam:[],
      tv: 0,
      td: 0,
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    this.handleInit();
  }

  handleInit = () => {
    var done = false,
      done2 = false;
    firebase
      .firestore()
      .collection("Donations")
      .orderBy("dateTime", "asc")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var data = doc.data();
          this.setState({
            data: [...this.state.data, doc.data()],
          });
          console.log(data);
          this.setState({
            td: this.state.td + Number(data.amount),
          });
        });
        var data = this.state.data;
        var m = [];
        var acm = [];
        var donationsdata = [];
        data.map((user) => {
          console.log(user, 66);
          var date = user.dateTime.toDate();
          var mn = date.getMonth() + 1;
          if (!m.includes(mn)) {
            m.push(mn);
          }
        });
        console.log(m);
        for (var i = 0; i < m.length; i++) {
          var count = 0;
          data.map((user) => {
            var date = user.dateTime.toDate();
            var mn = date.getMonth() + 1;
            if (mn === m[i]) {
              count++;
            }
          });
          donationsdata.push(count);
        }
        console.log(donationsdata);
        m.map((mn) => {
          if (mn === 1) {
            acm.push("Jan");
          } else if (mn === 2) {
            acm.push("Feb");
          } else if (mn === 3) {
            acm.push("Mar");
          } else if (mn === 4) {
            acm.push("Apr");
          } else if (mn === 5) {
            acm.push("May");
          } else if (mn === 6) {
            acm.push("Jun");
          } else if (mn === 7) {
            acm.push("Jul");
          } else if (mn === 8) {
            acm.push("Aug");
          } else if (mn === 9) {
            acm.push("Sep");
          } else if (mn === 10) {
            acm.push("Oct");
          } else if (mn === 1) {
            acm.push("Dec");
          } else if (mn === 11) {
            acm.push("Nov");
          } else {
            acm.push("Dec");
          }
        });
        console.log(acm);
        this.setState({
          dam: acm,
          donationsdata: donationsdata,
        });
        done = true;
      });
    firebase
      .firestore()
      .collection("volunteers")
      .orderBy("dateTime", "asc")
      .get()
      .then((snap) => {
        this.setState({
          tv: snap.size,
        });
        var data = [];
        snap.forEach((doc) => {
          data.push(doc.data());
        });
        var m2 = [],
          vadata = [],
          acm2 = [];
        data.map((volunteer) => {
          var date = volunteer.dateTime.toDate();
          var mn = date.getMonth() + 1;
          if (!m2.includes(mn)) {
            m2.push(mn);
          }
        });
        console.log(m2, 131);
        for (var i = 0; i < m2.length; i++) {
          var count = 0;
          data.map((volunteer) => {
            var date = volunteer.dateTime.toDate();
            var mn = date.getMonth() + 1;
            if (mn === m2[i]) {
              count++;
            }
          });
          vadata.push(count);
        }
        console.log(vadata);
        m2.map((mn) => {
          if (mn === 1) {
            acm2.push("Jan");
          } else if (mn === 2) {
            acm2.push("Feb");
          } else if (mn === 3) {
            acm2.push("Mar");
          } else if (mn === 4) {
            acm2.push("Apr");
          } else if (mn === 5) {
            acm2.push("May");
          } else if (mn === 6) {
            acm2.push("Jun");
          } else if (mn === 7) {
            acm2.push("Jul");
          } else if (mn === 8) {
            acm2.push("Aug");
          } else if (mn === 9) {
            acm2.push("Sep");
          } else if (mn === 10) {
            acm2.push("Oct");
          } else if (mn === 1) {
            acm2.push("Dec");
          } else if (mn === 11) {
            acm2.push("Nov");
          } else {
            acm2.push("Dec");
          }
        });
        done2 = true;
        if (done && done2) {
          this.setState({
            loading: false,
            vadata: vadata,
            vam: acm2,
          });
        }
      });
  };

  handleRefresh = () => {
    this.setState({
      loading: true,
      tv: 0,
      td: 0,
    });
    this.handleInit();
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
          <div className="dashboard-container">
            <div className="top">
              <h1>
                Analytics Overview{" "}
                <div className={this.state.loading ? "active" : "deactive"}>
                  <i
                    onClick={this.handleRefresh}
                    className="fas fa-sync-alt"
                  ></i>
                </div>
              </h1>
              <div className="box-container">
                <div className="box">
                  <i className="fas fa-male"></i>
                  <div className="stat">
                    <h1>Total Volunteers</h1>
                    <p>{this.state.tv}</p>
                  </div>
                </div>
                <div className="box">
                  <i className="fas fa-dollar-sign"></i>
                  <div className="stat">
                    <h1>Total Donations</h1>
                    <p>{this.state.td}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <div className="growth-chart">
                <h1>Volunteers</h1>
                <AreaChart
                  name={"Volunteers"}
                  data={this.state.vadata}
                  months={this.state.vam}
                />
              </div>
              <div className="growth-chart">
                <h1>Donations</h1>
                <AreaChart
                  name={"Donations"}
                  data={this.state.donationsdata.reverse()}
                  months={this.state.dam.reverse()}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
