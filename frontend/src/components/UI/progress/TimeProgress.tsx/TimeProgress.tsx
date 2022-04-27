import { useTheme, styled } from "@mui/material/styles";
import { FC } from "react";
import styles from "./timeProgress.module.scss";
import cl from "classnames";

const SpinerSlice = styled("div")(({ theme }) => ({
  "&:after": {
    background: theme.palette.primary.main,
  },
}));

const TimeProgreess: FC<{ time?: string; className?: string }> = ({
  time,
  className,
}) => {
  const color = useTheme().palette.primary.main;
  return (
    <div className={cl(className, styles.root)} style={{ color: color }}>
      <div className={styles.spiner}>
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
      <p className={styles.timer}>{time}</p>
    </div>
  );
};
export default TimeProgreess;
