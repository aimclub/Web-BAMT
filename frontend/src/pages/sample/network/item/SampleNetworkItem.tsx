// import StarIcon from "@mui/icons-material/Star";
import { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";
import { bn_managerAPI } from "../../../../API/bn_manager/bn_managerAPI";

import AppSelect from "../../../../components/UI/selects/AppSelect/AppSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  selectNetworkNode,
  setSelectedNetwork,
} from "../../../../redux/sample/sample";
import { INetwork } from "../../../../types/experiment";
import { colorizeNetwork } from "../../../../assets/utils/graph";
import SampleNetworkItemData from "./graph/SampleNetworkItemGraph";
import scss from "./sampleNetworkItem.module.scss";

const SampleNetworkItem: FC<{ index: number; network: INetwork | "" }> = ({
  index,
  network,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { model } = useAppSelector((state) => state.model);
  const { networks, selectedNode } = useAppSelector((state) => state.sample);

  const { data } = bn_managerAPI.useGetBNDataQuery({
    owner: user?.username || "",
  });
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
      <div className={scss.graph}>
        {network ? (
          <SampleNetworkItemData
            index={index}
            data={colorizeNetwork(network, model, selectedNode)}
            onNodeClick={handleNodeClick}
          />
        ) : (
          <p className={scss.info}>choose networks</p>
        )}
      </div>
    </article>
  );
};

export default SampleNetworkItem;
