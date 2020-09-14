import React from "react";

import Chart from "react-apexcharts";

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: props.name,
          data: props.data,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        fill: {
          colors: ["#FF7F50"],
        },
        plotOptions: {
          bar: {
            horizontal: props.type === 1 ? true : false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: props.cat,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width={555}
          height={320}
        />
      </div>
    );
  }
}
