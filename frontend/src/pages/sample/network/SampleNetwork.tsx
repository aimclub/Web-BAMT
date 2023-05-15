import { useEffect } from "react";
import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";
import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import { useUser } from "../../../hooks/useUser";
import SampleNetworkItem from "./item/SampleNetworkItem";
import scss from "./sampleNetwork.module.scss";
import { INetwork } from "../../../API/experiment/experimentTypes";

const SampleNetwork = () => {
  const { username: owner } = useUser();
  const { networks, equalNodes } = useAppSelector((state) => state.sample);

  const { isError } = bn_managerAPI.useGetBNDataQuery({ owner });

  const [getEqualEdges, { isError: isErrorGetEqualEdges }] =
    bn_managerAPI.useLazyGetEqualEdgesQuery();

  useEffect(() => {
    const selectedNetworks = networks.filter(
      (i): i is INetwork => typeof i === "object"
    );
    if (selectedNetworks.length > 1) {
      getEqualEdges({
        owner,
        networks_names: selectedNetworks.map((i) => i.name),
      });
    }
  }, [getEqualEdges, networks, owner]);

  useEffect(() => {
    console.log(equalNodes);
  }, [equalNodes]);

  return (
    <section>
      <h2 className={scss.title}>Network</h2>
      <ul className={scss.list}>
        {networks.map((network, index) => (
          <li key={index} className={scss.item}>
            <SampleNetworkItem network={network} index={index} />
          </li>
        ))}
      </ul>
      <AlertError isError={isError} message={"Error on get networks"} />
      <AlertError
        isError={isErrorGetEqualEdges}
        message={"Error on get equal edges"}
      />
    </section>
  );
};

export default SampleNetwork;
