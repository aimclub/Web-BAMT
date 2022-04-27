import ReactApexChart from "react-apexcharts";

import { nodeRealData } from "../../../assets/data/sample";
import { useAppSelector } from "../../../hooks/redux";
import { configChart } from "../../../utils/configChart";
import styles from "./sampleСomparison.module.scss";

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
    <section className={styles.root}>
      <h2 className={styles.title}>Сomparison window</h2>
      <div className={styles.content}>
        {selectedNode ? (
          <>
            <article className={styles.chart}>
              <ReactApexChart {...realData} type="bar" height={300} />
            </article>
            <article className={styles.chart}>
              <ReactApexChart {...sampledData} type="bar" height={300} />
            </article>
          </>
        ) : (
          <p className={styles.infо}>Select node</p>
        )}
      </div>
    </section>
  );
};

export default SampleСomparison;
