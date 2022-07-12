import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Loader from "../../loader/Loader";
import scss from "./appOutlet.module.scss";

const AppOutlet = () => {
  return (
    <div className={scss.root}>
      <Header />
      <main className={scss.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default AppOutlet;
