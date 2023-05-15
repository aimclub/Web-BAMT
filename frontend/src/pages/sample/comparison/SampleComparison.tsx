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
      <div className={scss.content}>
        {data ? (
          <SampleComparisonChart data={data} title={"Real Data"} />
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
