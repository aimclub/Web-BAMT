import DeleteIcon from "@mui/icons-material/Delete";
import { FC, useCallback } from "react";
import { bn_managerAPI } from "../../../../../API/bn_manager/bn_managerAPI";
import { useAppSelector } from "../../../../../hooks/redux";
import AlertError from "../../../../UI/alerts/error/AlertError";
import IconButton from "../../../../UI/buttons/icon/IconButton";
import RingProgress from "../../../../UI/progress/ring/RingProgress";
import scss from "./networksListItem.module.scss";

const NetworksListItem: FC<{ network: string }> = ({ network }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [removeNetwork, { isLoading, isError }] =
    bn_managerAPI.useRemoveBNMutation();

  const handleRemoveNetwork = useCallback(() => {
    if (user && network) {
      removeNetwork({ owner: user.email, name: network });
    }
  }, [user, network, removeNetwork]);

  return (
    <div className={scss.root}>
      <p className={scss.name}>{network}</p>
      <IconButton onClick={handleRemoveNetwork} disabled={isLoading}>
        {isLoading ? <RingProgress /> : <DeleteIcon />}
      </IconButton>
      <AlertError
        isError={isError}
        message={`ERROR on delete ${network} network`}
      />
    </div>
  );
};

export default NetworksListItem;
