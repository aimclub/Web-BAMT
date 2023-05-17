import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { FC, memo } from "react";

import { cl } from "../../../../assets/utils/classnames";
import AppTooltip from "../../AppTooltip/AppTooltip";
import scss from "./appSelect.module.scss";

const CustomSelect = styled(Select)({
  width: "100%",
  borderRadius: 0,
  "& .MuiInputBase-input": {
    padding: "0 32px 4px 0",

    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: "16px",
    letterSpacing: "0.4px",
    // textTransform: "capitalize",

    color: "rgba(0, 0, 0, 0.87)",
  },
  "& fieldset": {
    border: "0",
    borderBottom: "1px solid #E8E8E8",
  },

  "&:hover fieldset": {
    border: "0",
    borderBottom: "1px solid #000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "0",
    borderBottom: "1px solid #000",
  },
  "& .MuiSelect-icon": {
    right: 0,
  },
});

export type IAppSelectOptions =
  | string[]
  | { id?: string; name: string; disabled?: boolean }[];

const AppSelect: FC<
  SelectProps & {
    options: IAppSelectOptions;
    helperText?: string | undefined | false;
    infoText?: string;
  }
> = ({
  className,
  options,
  label,
  helperText = "select",
  infoText,
  ...props
}) => {
  return (
    <div className={cl(scss.root, className, props.disabled && scss.disabled)}>
      {label && <p className={scss.label}>{label}</p>}
      {infoText && <AppTooltip title={infoText} />}
      <div className={scss.select}>
        <CustomSelect {...props}>
          {options.map((item) =>
            typeof item === "string" ? (
              <MenuItem key={item} value={item}>
                <span className={scss.item}>{item}</span>
              </MenuItem>
            ) : (
              <MenuItem
                key={item.id || item.name}
                value={item.id || item.name}
                disabled={item.disabled}
              >
                <span className={scss.item}>{item.name}</span>
              </MenuItem>
            )
          )}
        </CustomSelect>
        {helperText && (
          <p className={cl(scss.helperText, props.error && scss.error)}>
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(AppSelect);
