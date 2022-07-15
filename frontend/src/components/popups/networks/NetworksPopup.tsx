import WidgetsIcon from "@mui/icons-material/Widgets";
import { useCallback, useState } from "react";
import IconButton from "../../UI/buttons/icon/IconButton";
import PopupModal from "../common/modal/PopupModal";
import NetworksList from "./list/NetworksList";

const NetworksPopup = () => {
  const [opened, setOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <WidgetsIcon />
      </IconButton>

      <PopupModal open={opened} onClose={handleClose} title="Edite network">
        <NetworksList />
      </PopupModal>
    </>
  );
};

export default NetworksPopup;
