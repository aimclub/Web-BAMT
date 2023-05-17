import { useTheme, styled } from "@mui/material/styles";
import { FC, memo } from "react";
import { cl } from "../../../../assets/utils/classnames";
import scss from "./spinnerProgress.module.scss";

const SpinerSlice = styled("div")(({ theme }) => ({
  "&:after": {
    background: theme.palette.primary.main,
  },
}));

const SpinnerProgress: FC<{ time?: string; className?: string }> = ({
  time,
  className,
}) => {
  const color = useTheme().palette.primary.main;

  return (
    <div className={cl(className, scss.root)} style={{ color: color }}>
      <div className={scss.spiner}>
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
        <SpinerSlice />
      </div>
      <p className={scss.timer}>{time}</p>
    </div>
  );
};
export default memo(SpinnerProgress);
