import { FC } from "react";

import { data_managerAPI } from "../../../../API/data_manager/data_managerAPI";
import { cl } from "../../../../assets/utils/classnames";
import { useUser } from "../../../../hooks/useUser";
import DataDatasetsItem from "./item/DataDatasetsItem";

import scss from "./dataDatasets.module.scss";
import AlertError from "../../../UI/alerts/error/AlertError";

const DataDatasets: FC<{ className?: string }> = ({ className }) => {
  const { username: user } = useUser();
  const { data: datasets, isError } = data_managerAPI.useGetDatasetsQuery({
    user,
  });

  return (
    <div className={cl(className, scss.root)}>
      <div className={cl(scss.row, scss.head)}>
        <p>Name</p>
        <p>Description</p>
      </div>
      <ul className={scss.list}>
        {datasets &&
          Object.entries(datasets).map(([display_name, description]) => (
            <DataDatasetsItem
              key={display_name}
              className={scss.row}
              dataset={{
                display_name,
                description,
              }}
            />
          ))}
      </ul>

      <AlertError isError={isError} message={`ERROR on get datasets`} />
    </div>
  );
};

export default DataDatasets;
