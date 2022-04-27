import { MenuItem, Select, SelectProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import cl from "classnames";
import { FC } from "react";

import styles from "./appSelect.module.scss";

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
    <div className={cl(styles.root, className)}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.select}>
        <CustomSelect {...props}>
          {options.map((item) =>
            typeof item === "string" ? (
              <MenuItem key={item} value={item}>
                <span className={styles.item}>{item}</span>
              </MenuItem>
            ) : (
              <MenuItem
                key={item.id || item.name}
                value={item.id || item.name}
                disabled={item.disabled}
              >
                <span className={styles.item}>{item.name}</span>
              </MenuItem>
            )
          )}
        </CustomSelect>
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    </div>
  );
};

export default AppSelect;
