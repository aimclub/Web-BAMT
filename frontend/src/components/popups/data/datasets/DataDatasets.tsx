import { FC } from "react";
import { data_managerAPI } from "../../../../API/data_manager/data_managerAPI";
import { cl } from "../../../../assets/utils/classnames";
import { useAppSelector } from "../../../../hooks/redux";
import scss from "./dataDatasets.module.scss";

const DataDatasets: FC<{ className?: string }> = ({ className }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: datasets } = data_managerAPI.useGetDatasetsQuery({
    user: user?.username || "",
  });

  return (
    <div className={cl(className, scss.root)}>
      <div>head</div>
      <ul>
        {datasets &&
          Object.entries(datasets).map(([name, desc]) => (
            <li key={name}>
              {name} {desc}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DataDatasets;
