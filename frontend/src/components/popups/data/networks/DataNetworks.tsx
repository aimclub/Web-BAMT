import { FC } from "react";
import { bn_managerAPI } from "../../../../API/bn_manager/bn_managerAPI";
import { cl } from "../../../../assets/utils/classnames";
import { useUser } from "../../../../hooks/useUser";
import scss from "./dataNetworks.module.scss";
import DataNetworksItem from "./item/DataNetworksItem";

const DataNetworks: FC<{ className?: string }> = ({ className }) => {
  const { username: owner } = useUser();
  const { data: networks } = bn_managerAPI.useGetBNDataNamesQuery({ owner });

  return (
    <div className={cl(className, scss.root)}>
      <div className={scss.title}>Display name</div>
      {networks ? (
        networks.networks.length > 0 ? (
          <ul className={scss.list}>
            {networks.networks.map((network) => (
              <DataNetworksItem key={network} network={network} />
            ))}
          </ul>
        ) : (
          <p className={scss.message}>No networks</p>
        )
      ) : (
        <p className={cl(scss.message, scss.error)}>Error on get networks</p>
      )}
    </div>
  );
};

export default DataNetworks;
