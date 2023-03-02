import { bn_managerAPI } from "../../../../API/bn_manager/bn_managerAPI";
import { cl } from "../../../../assets/utils/classnames";
import { useAppSelector } from "../../../../hooks/redux";
import NetworksListItem from "./item/NetworksListItem";
import scss from "./networksList.module.scss";

const NetworksList = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data } = bn_managerAPI.useGetBNDataNamesQuery({
    owner: user?.username || "",
  });

  return (
    <div className={scss.root}>
      {data ? (
        <>
          <p className={scss.title}>Name</p>
          <div className={scss.list}>
            {Object.entries(data.networks).length > 0 ? (
              Object.entries(data.networks).map(([id, network]) => (
                <NetworksListItem key={id} network={network} />
              ))
            ) : (
              <p className={scss.text}>No networks</p>
            )}
          </div>
        </>
      ) : (
        <p className={cl(scss.text, scss.error)}>ERROR on get user networks</p>
      )}
    </div>
  );
};

export default NetworksList;
