import { ApexOptions } from "apexcharts";
import { FC, memo } from "react";
import ReactApexChart from "react-apexcharts";
import { APP_COLOR } from "../../../../assets/utils/constants";
import { useAppSelector } from "../../../../hooks/redux";
import { IComparisonData } from "../../../../types/experiment";

const SampleComparisonChart: FC<{
  data: IComparisonData;
  title: string;
}> = ({ data, title }) => {
  const { selectedNode } = useAppSelector((state) => state.sample);

  const series: ApexAxisChartSeries = [{ data: data.data, name: "" }];
  const options: ApexOptions = {
    chart: { toolbar: { show: false } },
    colors: [APP_COLOR],
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
        text: selectedNode?.node_name,
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
          colors: ["#000000"],
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
  };

  return (
    <ReactApexChart series={series} options={options} type="bar" height={400} />
  );
};

export default memo(SampleComparisonChart);
