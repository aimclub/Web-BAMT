import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useAppDispatch } from "../../../hooks/redux";
import { useUser } from "../../../hooks/useUser";
import { logout } from "../../../redux/auth/auth";
import DataPopup from "../../popups/data/DataPopup";
import IconButton from "../../UI/buttons/icon/IconButton";
import scss from "./headerMenu.module.scss";

const HeaderMenu = () => {
  const dispatch = useAppDispatch();
  const { username } = useUser();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={scss.auth}>
      <p className={scss.email}>{username}</p>
      <DataPopup />
      <IconButton onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default HeaderMenu;
