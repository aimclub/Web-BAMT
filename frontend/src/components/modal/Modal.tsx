import Dialog from "@mui/material/Dialog";
import { FC, ReactNode } from "react";
import PopupButton from "../UI/buttons/popup/PopupButton";
import scss from "./modal.module.scss";

const Modal: FC<{
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}> = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className={scss.root}>
        <div className={scss.content}>
          {title && <p className={scss.head}>{title}</p>}
          {children}
        </div>
        <PopupButton onClick={onClose}>Close</PopupButton>
      </div>
    </Dialog>
  );
};

export default Modal;
