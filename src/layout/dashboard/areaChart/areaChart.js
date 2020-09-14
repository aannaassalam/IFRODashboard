import React from "react";

import Chart from "react-apexcharts";

export default class AreaChart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      series: [
        {
          name: props.name,
          data: props.data,
        },
      ],
      options: {
        chart: {
          foreColor: "#d65a31",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["#d65a31"],
        },
        fill: {
          colors: ["#FF7F50"],
        },
        xaxis: {
          type: "text",
          categories: props.months,
        },
        markers: {
          colors: ["#15202B"],
        },
        tooltip: {
          x: {
            show: true,
            format: "month",
          },
          marker: {
            show: false,
          },
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
          type="area"
          width={555}
          height={320}
        />
      </div>
    );
  }
}
