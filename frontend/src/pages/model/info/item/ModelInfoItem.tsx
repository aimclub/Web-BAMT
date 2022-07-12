import { FC } from "react";
import scss from "./modelInfoItem.module.scss";

const ModelInfoItem: FC<{ name: string; value: string | string[] }> = ({
  name,
  value,
}) => {
  return (
    <div className={scss.root}>
      <p className={scss.label}>{name}</p>
      <div className={scss.value}>
        {typeof value === "object" ? (
          <ul className={scss.list}>
            {value.map((item) => (
              <li key={item}>
                <p className={scss.item}>{item}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={scss.single}>{value}</p>
        )}
      </div>
    </div>
  );
};

export default ModelInfoItem;
