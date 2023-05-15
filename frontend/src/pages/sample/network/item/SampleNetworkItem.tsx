// import StarIcon from "@mui/icons-material/Star";
import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useRef } from "react";

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

import scss from "./sampleNetworkItem.module.scss";

const SampleNetworkItem: FC<{ index: number; network: INetwork | "" }> = ({
  index,
  network,
}) => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const { username: owner } = useUser();
  const { networks, equalNodes, selectedNode } = useAppSelector(
    (state) => state.sample
  );

  const { data } = bn_managerAPI.useGetBNDataQuery({ owner });
  const all_networks: INetwork[] = data ? Object.values(data.networks) : [];
  const dispatch = useAppDispatch();

  const handleNetworkChange = (event: SelectChangeEvent<unknown>) => {
    const name = event.target.value as string;
    dispatch(
      setSelectedNetwork({
        network: all_networks.find((n) => n.name === name) || "",
        index,
      })
    );
  };

  const handleNodeClick = (node: string) => {
    if (network)
      dispatch(
        selectNetworkNode({
          network_name: network.name,
          node_name: node,
          dataset_name: network.dataset_name,
        })
      );
  };

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
        {/* <div className={scss.score}>
          <StarIcon fontSize="small" />
          <span className={scss.title}>Score</span>
          <span className={scss.value}>200</span>
        </div> */}
      </div>
      <div className={scss.graph} ref={refContainer}>
        {network ? (
          <SampleNetworkItemData
            index={index}
            data={colorizeNetwork(network, equalNodes, selectedNode)}
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

export default SampleNetworkItem;
