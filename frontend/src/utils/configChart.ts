import { ApexOptions } from "apexcharts";

import { ModelType } from "../types/model";
import { getModelColor } from "./theme";

export const configChart: (props: {
  data: number[];
  title?: string;
  model?: ModelType;
}) => {
  series: ApexAxisChartSeries;
  options: ApexOptions;
} = ({ data, title, model }) => {
  return {
    series: [{ data }],
    options: {
      chart: { toolbar: { show: false } },
      colors: [model ? getModelColor(model) : "#ccc"],
      plotOptions: { bar: { dataLabels: { position: "top" } } },
      dataLabels: {
        enabled: true,
        offsetY: -25,
        style: {
          fontFamily: "'Roboto'",
          fontWeight: 400,
          fontSize: "16px",
          colors: ["#000000"],
        },
      },
      xaxis: {
        categories: data,
        title: {
          text: "Tectonic regime",
          style: {
            fontFamily: "'Roboto'",
            fontWeight: 300,
            fontSize: "16px",
            color: "#000000",
          },
        },
        labels: { show: false },
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
      tooltip: { enabled: false },
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
