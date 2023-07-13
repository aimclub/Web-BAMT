import { useEffect } from "react";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";

import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import { useUser } from "../../../hooks/useUser";
import scss from "./sampleComparison.module.scss";
import SampleComparisonChart from "./chart/SampleComparisonChart";

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
      {!selectedNode ? (
        <p className={scss.empty}>select node</p>
      ) : (
        <>
          <div className={scss.subtitle}>
            <p
              className={scss.text}
            >{`Network: ${selectedNode?.network_name}`}</p>
            <p className={scss.text}>{`Node: ${selectedNode?.node_name}`}</p>
          </div>
          {!data || isError ? (
            <p className={scss.empty}>no data</p>
          ) : (
            <div className={scss.data}>
              <div className={scss.chart}>
                <SampleComparisonChart data={data} />
              </div>
              <div className={scss.result}>
                <p className={scss.text}>Result</p>
                {Object.entries(data.metrics).map(([key, value]) => (
                  <p key={key} className={scss.item}>
                    <span>{key}</span>
                    <span className={scss.value}>
                      {/* TODO: check without compare_with_default */}
                      {value ? value.toFixed(2) : String(value)}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <AlertError
        isError={isError}
        message={`Error on get sample for ${selectedNode?.node_name} node from ${selectedNode?.network_name} network`}
      />
    </section>
  );
};

export default SampleСomparison;
