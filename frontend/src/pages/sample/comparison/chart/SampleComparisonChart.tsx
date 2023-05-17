import { ApexOptions } from "apexcharts";
import { FC, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { ISample } from "../../../../API/bn_manager/bn_managerType";
import { APP_COLOR } from "../../../../assets/utils/constants";

const SampleComparisonChart: FC<{
  data: ISample;
}> = ({ data }) => {
  const xMin = Math.min(...data.xvals);
  const xMax = Math.max(...data.xvals);

  const series: ApexAxisChartSeries = [
    {
      type: "scatter",
      data: data.xvals.map<[number, number]>((x, index) => [
        x,
        data.data[index],
      ]),
    },
    {
      type: "line",
      data: [
        [xMin, xMin],
        [xMax, xMax],
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: [APP_COLOR],
    markers: { size: [4, 0] },
    stroke: { width: [0, 1] },
    xaxis: {
      type: "numeric",
      title: {
        text: "Real data",
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
        text: "Sample",
        style: {
          fontFamily: "'Roboto'",
          fontWeight: 300,
          fontSize: "16px",
          color: "#000000",
        },
      },
      labels: {
        style: {
          fontFamily: "'Roboto'",
          fontWeight: 300,
          fontSize: "10px",
          colors: "#000000",
        },
      },
    },
    tooltip: {
      enabled: true,
      x: { show: false },
      custom: () => null,
    },
    legend: { show: false },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  };

  return <ReactApexChart series={series} options={options} height={200} />;
};

export default memo(SampleComparisonChart);
