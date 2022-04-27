import { useAppSelector } from "../../../hooks/redux";
import SampleNetworkItem from "./item/SampleNetworkItem";
import styles from "./sampleNetwork.module.scss";

const SampleNetwork = () => {
  const { networks } = useAppSelector((state) => state.sample);

  return (
    <section>
      <h2 className={styles.title}>Network</h2>
      <ul className={styles.list}>
        {networks.map((_, index) => (
          <li key={index} className={styles.item}>
            <SampleNetworkItem index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SampleNetwork;
