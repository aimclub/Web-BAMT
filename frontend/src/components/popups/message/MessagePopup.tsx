import { FC } from "react";
import { cl } from "../../../assets/utils/classnames";
import Modal from "../../modal/Modal";
import scss from "./messagePopup.module.scss";

const MessagePopup: FC<{
  message: string;
  title?: string;
  isError?: boolean;
  open: boolean;
  onClose: () => void;
}> = ({ message, title = "Message", isError, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className={cl(scss.message, isError && scss.error)}>{message}</p>
    </Modal>
  );
};

export default MessagePopup;
