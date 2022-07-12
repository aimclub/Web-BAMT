import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../redux/auth/auth";
import AppLogo from "../AppLogo/AppLogo";
import scss from "./header.module.scss";
import HeaderLine from "./line/HeaderLine";

const navLinks: { name: string; link: string }[] = [
  // TODO: add links
  { name: "WMT", link: "#" },
  { name: "Team", link: "#" },
  { name: "Repository", link: "#" },
  { name: "Laboratory", link: "#" },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className={scss.head}>
        <AppLogo />
        <nav>
          <ul className={scss.list}>
            {navLinks.map(({ link, name }) => (
              <li key={name} className={scss.item}>
                <a href={link} className={scss.link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={scss.auth}>
          <p className={scss.email}>{user?.email}</p>
          <Button
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            color="inherit"
          >
            Logout
          </Button>
        </div>
      </div>
      <HeaderLine />
    </header>
  );
};

export default Header;
