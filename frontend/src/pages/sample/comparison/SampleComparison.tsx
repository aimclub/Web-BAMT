import ReactApexChart from "react-apexcharts";

import { nodeRealData } from "../../../assets/data/sample";
import { useAppSelector } from "../../../hooks/redux";
import { configChart } from "../../../utils/configChart";
import scss from "./sampleComparison.module.scss";

const SampleСomparison = () => {
  const { selectedNode } = useAppSelector((state) => state.sample);
  const { model } = useAppSelector((state) => state.model);

  const realData = configChart({
    data: nodeRealData,
    title: "Real Data",
    model,
  });
  const sampledData = configChart({
    data: nodeRealData,
    title: "Sampled Data",
    model,
  });

  return (
    <section className={scss.root}>
      <h2 className={scss.title}>Сomparison window</h2>
      <div className={scss.content}>
        {selectedNode ? (
          <>
            <article className={scss.chart}>
              <ReactApexChart {...realData} type="bar" height={300} />
            </article>
            <article className={scss.chart}>
              <ReactApexChart {...sampledData} type="bar" height={300} />
            </article>
          </>
        ) : (
          <p className={scss.infо}>Select node</p>
        )}
      </div>
    </section>
  );
};

export default SampleСomparison;
