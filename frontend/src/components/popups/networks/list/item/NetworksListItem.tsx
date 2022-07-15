import { FC } from "react";
import IconButton from "../../../../UI/buttons/icon/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import scss from "./networksListItem.module.scss";

const NetworksListItem: FC<{ network: string }> = ({ network }) => {
  return (
    <div className={scss.root}>
      <p className={scss.name}>{network}</p>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default NetworksListItem;
