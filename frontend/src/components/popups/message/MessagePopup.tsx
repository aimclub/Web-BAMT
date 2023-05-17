import scss from "./messagePopup.module.scss";

import { FC, memo } from "react";

import { cl } from "../../../assets/utils/classnames";
import Modal from "../../modal/Modal";

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

export default memo(MessagePopup);
