import React from "react";
import Moment from "react-moment";
import "./listView.css";

export default class ListView extends React.Component {
  render() {
    console.log(this.props.type);
    return (
      <>
        <table className="list-table">
          <thead>
            <tr>
              {this.props.type.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
              {this.props.showinfo ? (
                <th>Action</th>
              ) : (
                <>{this.props.showphoto ? <th>Photo</th> : null}</>
              )}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((item, index) => {
              return (
                <tr className="table-data" key={index}>
                  {this.props.value.map((val, index) => {
                    if (typeof item[val] === "object") {
                      return (
                        <td className="txt-bold" key={index}>
                          <Moment
                            format="MMMM Do YYYY, h:mm:ss a"
                            date={item[val].toDate()}
                          />
                        </td>
                      );
                    } else {
                      return <td key={index} className="txt-bold">{item[val]}</td>;
                    }
                  })}
                  {this.props.showphoto ? (
                    <td>{item.photo ? <img src={item.photo} alt="profile" /> : "N/A"}</td>
                  ) : null}
                  {this.props.showinfo ? (
                    <td>
                      <button
                        onClick={() => this.props.handleInfo(item)}
                        className="info-button"
                      >
                        <i className="fas fa-info-circle"></i>
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.props.data.length === 0 ? (
          <div className="no-data-container">
            <p>No Data Available</p>
          </div>
        ) : null}
      </>
    );
  }
}
