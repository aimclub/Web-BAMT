import { FC } from "react";

import { data_managerAPI } from "../../../../API/data_manager/data_managerAPI";
import { cl } from "../../../../assets/utils/classnames";
import { useAppSelector } from "../../../../hooks/redux";
import DataDatasetsItem from "./item/DataDatasetsItem";

import scss from "./dataDatasets.module.scss";

const DataDatasets: FC<{ className?: string }> = ({ className }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: datasets } = data_managerAPI.useGetDatasetsQuery({
    user: user?.username || "",
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
    </div>
  );
};

export default DataDatasets;
