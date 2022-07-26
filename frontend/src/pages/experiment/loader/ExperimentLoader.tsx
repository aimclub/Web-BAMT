import { useEffect, useState } from "react";
import { cl } from "../../../assets/utils/classnames";
import AppLinerProggress from "../../../components/UI/progress/AppLinerProggress/AppLinerProggress";
import TimeProgreess from "../../../components/UI/progress/TimeProgress.tsx/TimeProgress";

import { useAppSelector } from "../../../hooks/redux";
import scss from "./experimentLoader.module.scss";

const ExperimentLoader = () => {
  const { isTraining } = useAppSelector((state) => state.experiment);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTraining) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!isTraining && seconds !== 0) {
      interval && clearInterval(interval);
      setSeconds(0);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [isTraining, seconds]);

  return (
    <div className={cl(scss.root, isTraining && scss.root_visible)}>
      <div className={scss.info}>
        <TimeProgreess time={`${seconds}`} />
        <p className={scss.msg}>Model is Training. Please wait</p>
        <AppLinerProggress />
      </div>
    </div>
  );
};
export default ExperimentLoader;
