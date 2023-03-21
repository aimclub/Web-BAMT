import WidgetsIcon from "@mui/icons-material/Widgets";
import { useCallback, useState } from "react";
import IconButton from "../../UI/buttons/icon/IconButton";
import Modal from "../../modal/Modal";
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

      <Modal open={opened} onClose={handleClose}>
        <NetworksList />
      </Modal>
    </>
  );
};

export default NetworksPopup;
