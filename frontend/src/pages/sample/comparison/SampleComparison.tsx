import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";

// import { nodeRealData } from "../../../assets/data/sample";
import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import { configChart } from "../../../utils/configChart";
import scss from "./sampleComparison.module.scss";

const SampleСomparison = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { selectedNode } = useAppSelector((state) => state.sample);

  const [getSample, { isError, data }] =
    bn_managerAPI.useLazyGetSampleDataQuery({
      // TODO: select parameters
      // pollingInterval: Infinity,
      // refetchOnReconnect: false,
      // refetchOnFocus: false,
    });
  const { model } = useAppSelector((state) => state.model);

  useEffect(() => {
    if (selectedNode)
      getSample({
        owner: user?.email || "",
        name: selectedNode.network_name,
        node: selectedNode.node_name,
      });
  }, [selectedNode, getSample, user?.email]);

  return (
    <section className={scss.root}>
      <h2 className={scss.title}>Сomparison window</h2>
      <div className={scss.content}>
        {data ? (
          <>
            <article className={scss.chart}>
              <ReactApexChart
                {...configChart({
                  data: data.real_data,
                  node_name: selectedNode?.node_name,
                  title: "Real Data",
                  model,
                })}
                type="bar"
                height={400}
              />
            </article>
            <article className={scss.chart}>
              <ReactApexChart
                {...configChart({
                  data: data.sampled_data,
                  node_name: selectedNode?.node_name,
                  title: "Sampled Data",
                  model,
                })}
                type="bar"
                height={400}
              />
            </article>
          </>
        ) : (
          <p className={scss.infо}>Select node</p>
        )}
      </div>
      <AlertError
        isError={isError}
        message={`Error on get sample for ${selectedNode?.node_name} node from ${selectedNode?.network_name} network`}
      />
    </section>
  );
};

export default SampleСomparison;
