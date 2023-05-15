import { ApexOptions } from "apexcharts";
import { FC, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { ISample } from "../../../../API/bn_manager/bn_managerType";
import { APP_COLOR } from "../../../../assets/utils/constants";
// import { useAppSelector } from "../../../../hooks/redux";

const SampleComparisonChart: FC<{
  data: ISample;
}> = ({ data }) => {
  // const { selectedNode } = useAppSelector((state) => state.sample);

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
    // chart: { toolbar: { show: false } },

    markers: {
      size: [4, 0],
    },
    stroke: {
      width: [0, 1],
    },
    colors: [APP_COLOR],
    // plotOptions: { bar: { dataLabels: { position: "top" } } },
    // dataLabels: {
    //   enabled: true,
    //   offsetY: -25,
    //   formatter: (v) => Math.round(100 * +v) / 100,
    //   style: {
    //     fontFamily: "'Roboto'",
    //     fontWeight: 400,
    //     fontSize: "16px",
    //     colors: ["#000000"],
    //   },
    // },
    // xaxis: {
    //   // categories: data.xvals,
    //   title: {
    //     // text: selectedNode?.node_name,
    //     text: "Real data",
    //     style: {
    //       fontFamily: "'Roboto'",
    //       fontWeight: 300,
    //       fontSize: "16px",
    //       color: "#000000",
    //     },
    //   },
    //   labels: {
    //     show: true,
    //     style: {
    //       fontFamily: "'Roboto'",
    //       fontWeight: 300,
    //       fontSize: "10px",
    //       colors: ["#000000"],
    //     },
    //   },
    // },
    // yaxis: {
    //   title: {
    //     text: "Sample",
    //     style: {
    //       fontFamily: "'Roboto'",
    //       fontWeight: 300,
    //       fontSize: "16px",
    //       color: "#000000",
    //     },
    //   },
    //   labels: { show: false },
    // },
    // tooltip: { enabled: true, marker: { show: false } },
    tooltip: { enabled: false },
    legend: { show: false },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
  };

  return <ReactApexChart series={series} options={options} height={200} />;
};

export default memo(SampleComparisonChart);
