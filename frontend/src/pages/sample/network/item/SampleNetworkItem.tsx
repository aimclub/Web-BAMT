import scss from "./sampleNetworkItem.module.scss";

import { SelectChangeEvent } from "@mui/material/Select";
import { FC, memo, useCallback, useMemo, useRef } from "react";

import { bn_managerAPI } from "../../../../API/bn_manager/bn_managerAPI";
import { INetwork } from "../../../../API/experiment/experimentTypes";
import { colorizeNetwork } from "../../../../assets/utils/graph";
import AppSelect from "../../../../components/UI/selects/AppSelect/AppSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { useUser } from "../../../../hooks/useUser";
import {
  selectNetworkNode,
  setSelectedNetwork,
} from "../../../../redux/sample/sample";
import SampleNetworkItemData from "./graph/SampleNetworkItemGraph";
import { IGraph } from "../../../../types/graph";

const SampleNetworkItem: FC<{ index: number; network: INetwork | "" }> = ({
  index,
  network,
}) => {
  const refContainer = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { username: owner } = useUser();
  const { networks, equalNodes, selectedNode } = useAppSelector(
    (state) => state.sample
  );

  const { data } = bn_managerAPI.useGetBNDataQuery({ owner });
  const all_networks = useMemo<INetwork[]>(
    () => (data ? Object.values(data.networks) : []),
    [data]
  );

  const chartData = useMemo<IGraph>(
    () =>
      network
        ? colorizeNetwork(network, equalNodes, selectedNode)
        : { nodes: [], links: [] },
    [equalNodes, network, selectedNode]
  );

  const handleNetworkChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const name = event.target.value as string;
      dispatch(
        setSelectedNetwork({
          network: all_networks.find((n) => n.name === name) || "",
          index,
        })
      );
    },
    [all_networks, dispatch, index]
  );

  const handleNodeClick = useCallback(
    (node: string) => {
      if (network)
        dispatch(
          selectNetworkNode({
            network_name: network.name,
            node_name: node,
            dataset_name: network.dataset_name,
          })
        );
    },
    [dispatch, network]
  );

  return (
    <article>
      <div className={scss.head}>
        <AppSelect
          className={scss.select}
          options={all_networks.map((network) => ({
            name: network.name,
            disabled: networks.some((n) => n && n.name === network.name),
          }))}
          value={network ? network.name : ""}
          helperText="select network"
          onChange={handleNetworkChange}
        />
      </div>
      <div className={scss.graph} ref={refContainer}>
        {network ? (
          <SampleNetworkItemData
            index={index}
            data={chartData}
            onNodeClick={handleNodeClick}
            size={{
              height: refContainer.current?.clientHeight,
              width: refContainer.current?.clientWidth,
            }}
          />
        ) : (
          <p className={scss.info}>choose networks</p>
        )}
      </div>
    </article>
  );
};

export default memo(SampleNetworkItem);
