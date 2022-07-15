import { FC } from "react";
import PopupModal from "../common/modal/PopupModal";
import scss from "./messagePopup.module.scss";

const MessagePopup: FC<{
  message: string;
  title?: string;
  open: boolean;
  onClose: () => void;
}> = ({ message, title = "Message", open, onClose }) => {
  return (
    <PopupModal open={open} onClose={onClose} title={title}>
      <p className={scss.message}>{message}</p>
    </PopupModal>
  );
};

export default MessagePopup;
