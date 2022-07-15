import NetworksListItem from "./item/NetworksListItem";
import scss from "./networksList.module.scss";

const NetworksList = () => {
  // TODO: get networks
  const networks = ["Networlk 1", "Network 2"];

  return (
    <div className={scss.root}>
      <p className={scss.title}>Name</p>
      <div className={scss.list}>
        {networks.map((network) => (
          <NetworksListItem key={network} network={network} />
        ))}
      </div>
    </div>
  );
};

export default NetworksList;
