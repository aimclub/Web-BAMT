import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Loader from "../../loader/Loader";
import styles from "./appOutlet.module.scss";

const AppOutlet = () => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default AppOutlet;
