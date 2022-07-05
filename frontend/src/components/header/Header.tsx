import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";

import { useAppDispatch } from "../../hooks/redux";
import { logout } from "../../redux/auth/auth";
import AppLogo from "../AppLogo/AppLogo";
import styles from "./header.module.scss";
import AppHeaderLine from "./line/HeaderLine";

const navLinks: { name: string; link: string }[] = [
  // TODO: add links
  { name: "WMT", link: "#" },
  { name: "Team", link: "#" },
  { name: "Repository", link: "#" },
  { name: "Laboratory", link: "#" },
];

const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className={styles.head}>
        <AppLogo />
        <nav>
          <ul className={styles.list}>
            {navLinks.map(({ link, name }) => (
              <li key={name} className={styles.item}>
                <a href={link} className={styles.link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.logout}>
          <Button
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            color="inherit"
          >
            Logout
          </Button>
        </div>
      </div>
      <AppHeaderLine />
    </header>
  );
};

export default Header;
