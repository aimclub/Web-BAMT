import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { bn_managerAPI } from "../../../../../API/bn_manager/bn_managerAPI";
import { useUser } from "../../../../../hooks/useUser";
import AlertError from "../../../../UI/alerts/error/AlertError";
import IconButton from "../../../../UI/buttons/icon/IconButton";
import RingProgress from "../../../../UI/progress/ring/RingProgress";
import scss from "./dataNetworksItem.module.scss";

const DataNetworksItem: FC<{ network: string }> = ({ network }) => {
  const { username: owner } = useUser();
  const [removeNetwork, { isLoading, isError }] =
    bn_managerAPI.useRemoveBNMutation();

  const handleRemove = () => removeNetwork({ owner, name: network });

  return (
    <li className={scss.root}>
      <p className={scss.name}>{network}</p>
      {isLoading ? (
        <RingProgress />
      ) : (
        <IconButton onClick={handleRemove} className={scss.delete}>
          <DeleteIcon sx={{ height: 14, width: 14 }} />
        </IconButton>
      )}
      <AlertError
        isError={isError}
        message={`ERROR on delete ${network} network`}
      />
    </li>
  );
};

export default DataNetworksItem;
