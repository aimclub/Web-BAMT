import { FC, InputHTMLAttributes } from "react";
import { cl } from "../../../assets/utils/classnames";
import scss from "./switch.module.scss";

interface ISwitch extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Switch: FC<ISwitch> = ({ label, className, ...props }) => {
  return (
    <div className={cl(className, scss.root, props.disabled && scss.disabled)}>
      {label && <p className={scss.label}>{label}</p>}
      <label className={cl(props.checked && scss.checked)}>
        <span className={scss.track}>
          <span className={scss.thumb} />
        </span>
        <input type="checkbox" {...props} className={scss.input} />
      </label>
    </div>
  );
};

export default Switch;
