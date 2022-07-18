import DeleteIcon from "@mui/icons-material/Delete";
import { FC, useCallback } from "react";
import { bn_managerAPI } from "../../../../../API/bn_manager/bn_managerAPI";
import { useAppSelector } from "../../../../../hooks/redux";
import { IBNManagerModel } from "../../../../../types/experiment";
import AlertError from "../../../../UI/alerts/error/AlertError";
import IconButton from "../../../../UI/buttons/icon/IconButton";
import Loader from "../../../../UI/progress/loader/Loader";
import scss from "./networksListItem.module.scss";

const NetworksListItem: FC<{ network: IBNManagerModel }> = ({ network }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [removeNetwork, { isLoading, isError }] =
    bn_managerAPI.useRemoveBNMutation();

  const handleRemoveNetwork = useCallback(() => {
    if (user && network) {
      removeNetwork({ owner: user.email, name: network.name });
    }
  }, [user, network, removeNetwork]);

  return (
    <div className={scss.root}>
      <p className={scss.name}>{network.name}</p>
      <IconButton onClick={handleRemoveNetwork} disabled={isLoading}>
        {isLoading ? <Loader /> : <DeleteIcon />}
      </IconButton>
      <AlertError
        isError={isError}
        message={`ERROR on delete ${network.name} network`}
      />
    </div>
  );
};

export default NetworksListItem;
