import { useEffect } from "react";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";

import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import { useUser } from "../../../hooks/useUser";
import scss from "./sampleComparison.module.scss";
import SampleComparisonChart from "./chart/SampleComparisonChart";

// const DATA = {
//   data: [1, 99],
//   xvals: [1, 99],
//   metrics: {
//     kl_divergence: 0.000029952868886296653,
//   },
// };

const SampleСomparison = () => {
  const { username: owner } = useUser();
  const { selectedNode } = useAppSelector((state) => state.sample);

  const [getSample, { isError, data }] =
    bn_managerAPI.useLazyGetSampleNodeDataQuery({
      refetchOnReconnect: false,
      refetchOnFocus: false,
    });

  useEffect(() => {
    if (selectedNode)
      getSample({
        owner,
        dataset_name: selectedNode.dataset_name,
        net_name: selectedNode.network_name,
        node: selectedNode.node_name,
      });
  }, [selectedNode, getSample, owner]);

  return (
    <section className={scss.root}>
      <h2 className={scss.title}>Сomparison window</h2>
      {data && !isError ? (
        <>
          <div className={scss.subtitle}>
            <p
              className={scss.text}
            >{`Network: ${selectedNode?.network_name}`}</p>
            <p className={scss.text}>{`Node: ${selectedNode?.node_name}`}</p>
          </div>
          <div className={scss.data}>
            <div className={scss.chart}>
              <SampleComparisonChart data={data} />
            </div>
            <div className={scss.result}>
              <p className={scss.text}>Result</p>
              {Object.entries(data.metrics).map(([key, value]) => (
                <p key={key} className={scss.item}>
                  <span>{key}</span>
                  <span className={scss.value}>{value.toFixed(2)}</span>
                </p>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className={scss.empty}>select node</p>
      )}
      <AlertError
        isError={isError}
        message={`Error on get sample for ${selectedNode?.node_name} node from ${selectedNode?.network_name} network`}
      />
    </section>
  );
};

export default SampleСomparison;
