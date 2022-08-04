import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import { FC } from "react";
import { cl } from "../../../../assets/utils/classnames";

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
    textTransform: "capitalize",

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

const AppSelect: FC<
  SelectProps & {
    options: string[] | { id?: string; name: string; disabled?: boolean }[];
    helperText?: string;
  }
> = ({ className, options, label, helperText = "select", ...props }) => {
  return (
    <div className={cl(scss.root, className)}>
      {label && <p className={scss.label}>{label}</p>}
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
        {helperText && <p className={scss.helperText}>{helperText}</p>}
      </div>
    </div>
  );
};

export default AppSelect;
