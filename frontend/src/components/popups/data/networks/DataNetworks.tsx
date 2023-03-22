import { FC } from "react";
import { bn_managerAPI } from "../../../../API/bn_manager/bn_managerAPI";
import { cl } from "../../../../assets/utils/classnames";
import { useAppSelector } from "../../../../hooks/redux";
import scss from "./dataNetworks.module.scss";
import DataNetworksItem from "./item/DataNetworksItem";

const DataNetworks: FC<{ className?: string }> = ({ className }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: networks } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.username || "",
  });

  return (
    <div className={cl(className, scss.root)}>
      <div className={scss.title}>Display name</div>
      <ul className={scss.list}>
        {networks?.networks.map((network) => (
          <DataNetworksItem key={network} network={network} />
        ))}
      </ul>
    </div>
  );
};

export default DataNetworks;
