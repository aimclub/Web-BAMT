import { bn_managerAPI } from "../../../API/bn_manager/bn_managerAPI";
import AlertError from "../../../components/UI/alerts/error/AlertError";
import { useAppSelector } from "../../../hooks/redux";
import SampleNetworkItem from "./item/SampleNetworkItem";
import scss from "./sampleNetwork.module.scss";

const SampleNetwork = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { networks } = useAppSelector((state) => state.sample);

  const { isError } = bn_managerAPI.useGetBNDataQuery({
    owner: user?.username || "",
  });

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
    </section>
  );
};

export default SampleNetwork;
