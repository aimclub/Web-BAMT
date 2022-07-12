import CheckIcon from "@mui/icons-material/Check";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import scss from "./appMultiSelect.module.scss";

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

const AppMultiSelect: FC<
  SelectProps & { options: string[]; helperText?: string; value: string[] }
> = ({
  className,
  options,
  label,
  helperText = "select node type",
  ...props
}) => {
  return (
    <div className={className}>
      <div className={scss.input}>
        <p className={scss.label}>{label || props.name}</p>
        <div className={scss.select}>
          <CustomSelect
            multiple
            renderValue={(selected) => (selected as string[]).join(", ")}
            MenuProps={{ MenuListProps: { sx: { maxHeight: 156 } } }}
            {...props}
          >
            {options.map((item) => (
              <MenuItem key={item} value={item}>
                <span className={scss.item}>
                  <span>{item}</span>
                  <span className={scss.itemIcon}>
                    {props.value.indexOf(item) > -1 && (
                      <CheckIcon fontSize="small" color="primary" />
                    )}
                  </span>
                </span>
              </MenuItem>
            ))}
          </CustomSelect>
          {helperText && <p className={scss.helperText}>{helperText}</p>}
        </div>
      </div>
      {props.value.length > 0 && (
        <ol className={scss.values}>
          {props.value.map((item, index) => (
            <li key={item}>
              <p className={scss.valuesItem}>{`${index + 1} ${item}`}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default AppMultiSelect;
