import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";

import { data_managerAPI } from "../../../../../API/data_manager/data_managerAPI";
import { DATA_BASE_DATASETS } from "../../../../../API/data_manager/data_managerTypes";
import { cl } from "../../../../../assets/utils/classnames";
import { useUser } from "../../../../../hooks/useUser";
import AlertError from "../../../../UI/alerts/error/AlertError";
import IconButton from "../../../../UI/buttons/icon/IconButton";
import RingProgress from "../../../../UI/progress/ring/RingProgress";

import scss from "./dataDatasetsItem.module.scss";

const DataDatasetsItem: FC<{
  dataset: { display_name: string; description: string };
  className?: string;
}> = ({ dataset, className }) => {
  const { username: owner } = useUser();
  const [removeDataset, { isError, isLoading }] =
    data_managerAPI.useRemoveDatasetMutation();

  const handleRemove = () =>
    removeDataset({ owner, name: dataset.display_name });

  return (
    <li className={cl(className, scss.root)}>
      <p className={scss.name}>{dataset.display_name}</p>
      <p className={scss.text}>{dataset.description}</p>

      {!DATA_BASE_DATASETS.includes(dataset.display_name) &&
        (isLoading ? (
          <RingProgress />
        ) : (
          <IconButton onClick={handleRemove} className={scss.delete}>
            <DeleteIcon sx={{ height: 14, width: 14 }} />
          </IconButton>
        ))}
      <AlertError
        isError={isError}
        message={`ERROR on delete ${dataset.display_name} dataset`}
      />
    </li>
  );
};

export default DataDatasetsItem;
