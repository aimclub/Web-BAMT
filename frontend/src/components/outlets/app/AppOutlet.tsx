import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import styles from "./appOutlet.module.scss";

const AppOutlet = () => {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
export default AppOutlet;
