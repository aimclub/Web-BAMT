import { FC } from "react";
import styles from "./modelInfoItem.module.scss";

const ModelInfoItem: FC<{ name: string; value: string | string[] }> = ({
  name,
  value,
}) => {
  return (
    <div className={styles.root}>
      <p className={styles.label}>{name}</p>
      <div className={styles.value}>
        {typeof value === "object" ? (
          <ul className={styles.list}>
            {value.map((item) => (
              <li key={item}>
                <p className={styles.item}>{item}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.single}>{value}</p>
        )}
      </div>
    </div>
  );
};

export default ModelInfoItem;
