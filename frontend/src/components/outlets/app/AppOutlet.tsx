import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import TimeProgreess from "../../UI/progress/TimeProgress.tsx/TimeProgress";
import scss from "./appOutlet.module.scss";

const AppOutlet = () => {
  return (
    <div className={scss.root}>
      <Header />
      <main className={scss.main}>
        <Suspense fallback={<TimeProgreess className={scss.loader} />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default AppOutlet;
