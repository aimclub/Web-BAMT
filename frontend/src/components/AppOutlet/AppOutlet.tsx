import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./appOutlet.module.scss";

const AppOutlet = () => {
  return (
    <div className={styles.root}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
export default AppOutlet;
