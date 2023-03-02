import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logout } from "../../../redux/auth/auth";
import NetworksPopup from "../../popups/networks/NetworksPopup";
import IconButton from "../../UI/buttons/icon/IconButton";
import scss from "./headerMenu.module.scss";

const HeaderMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={scss.auth}>
      <p className={scss.email}>{user?.username}</p>
      <NetworksPopup />
      <IconButton onClick={handleLogout}>
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default HeaderMenu;
