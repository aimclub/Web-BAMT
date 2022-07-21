import { ApexOptions } from "apexcharts";
import { IComparisonData } from "../types/experiment";

import { ModelType } from "../types/model";
import { getModelColor } from "./theme";

export const configChart: (props: {
  data: IComparisonData;
  node_name?: string;
  title?: string;
  model?: ModelType;
}) => {
  series: ApexAxisChartSeries;
  options: ApexOptions;
} = ({ data, node_name, title, model }) => {
  return {
    series: [{ data: data.data, name: "" }],
    options: {
      chart: { toolbar: { show: false } },
      colors: [model ? getModelColor(model) : "#ccc"],
      plotOptions: { bar: { dataLabels: { position: "top" } } },
      dataLabels: {
        enabled: true,
        offsetY: -25,
        formatter: (v) => Math.round(100 * +v) / 100,
        style: {
          fontFamily: "'Roboto'",
          fontWeight: 400,
          fontSize: "16px",
          colors: ["#000000"],
        },
      },
      xaxis: {
        categories: data.xvals,
        title: {
          text: node_name,
          style: {
            fontFamily: "'Roboto'",
            fontWeight: 300,
            fontSize: "16px",
            color: "#000000",
          },
        },
        labels: {
          show: true,
          style: {
            fontFamily: "'Roboto'",
            fontWeight: 300,
            fontSize: "10px",
            color: "#000000",
          },
        },
      },
      yaxis: {
        title: {
          text: "Probability",
          style: {
            fontFamily: "'Roboto'",
            fontWeight: 300,
            fontSize: "16px",
            color: "#000000",
          },
        },
        labels: { show: false },
      },
      tooltip: { enabled: true, marker: { show: false } },
      title: {
        text: title,
        align: "right",
        style: {
          fontFamily: "'Roboto'",
          fontWeight: 400,
          fontSize: "16px",
          color: "#000000",
        },
      },
      grid: {
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: false } },
      },
    },
  };
};
