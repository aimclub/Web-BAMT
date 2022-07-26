import { FC } from "react";
import { cl } from "../../../../assets/utils/classnames";
import scss from "./ringProgress.module.scss";

const RingProgress: FC<{ className?: string; visible?: boolean }> = ({
  className,
  visible = true,
}) => {
  return (
    <span className={cl(className, scss.ring, visible && scss.visible)}>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
};

export default RingProgress;
