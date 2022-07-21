import { useEffect } from "react";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";

import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import SampleComparisonChart from "./chart/SampleComparisonChart";
import scss from "./sampleComparison.module.scss";

const SampleСomparison = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { selectedNode } = useAppSelector((state) => state.sample);

  const [getSample, { isError, data }] =
    bn_managerAPI.useLazyGetSampleDataQuery({
      refetchOnReconnect: false,
      refetchOnFocus: false,
    });

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
              <SampleComparisonChart
                data={data.real_data}
                title={"Real Data"}
              />
            </article>
            <article className={scss.chart}>
              <SampleComparisonChart
                data={data.sampled_data}
                title={"Sampled Data"}
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
