import cl from "classnames";
import { FC } from "react";
import scss from "./loader.module.scss";

const Loader: FC<{ className?: string; visible?: boolean }> = ({
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

export default Loader;
