import cl from "classnames";
import { FC } from "react";
import PopupModal from "../common/modal/PopupModal";
import scss from "./messagePopup.module.scss";

const MessagePopup: FC<{
  message: string;
  title?: string;
  isError?: boolean;
  open: boolean;
  onClose: () => void;
}> = ({ message, title = "Message", isError, open, onClose }) => {
  return (
    <PopupModal open={open} onClose={onClose} title={title}>
      <p className={cl(scss.message, isError && scss.error)}>{message}</p>
    </PopupModal>
  );
};

export default MessagePopup;
