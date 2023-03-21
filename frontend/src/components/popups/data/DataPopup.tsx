import WidgetsIcon from "@mui/icons-material/Widgets";
import { useCallback, useState } from "react";
import IconButton from "../../UI/buttons/icon/IconButton";
import Modal from "../../modal/Modal";
import scss from "./dataPopup.module.scss";
import { cl } from "../../../assets/utils/classnames";
import DataDatasets from "./datasets/DataDatasets";
import DataNetworks from "./networks/DataNetworks";

type TagsType = "networks" | "datasets";
const tags: TagsType[] = ["datasets", "networks"];

const DataPopup = () => {
  const [opened, setOpened] = useState(true);
  const [current, setCurrent] = useState<TagsType>("networks");

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
        <div className={scss.tags}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={cl(scss.tag, tag === current && scss.active)}
              onClick={() => setCurrent(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className={scss.content}>
          <DataDatasets
            className={cl(scss.list, current === "datasets" && scss.visible)}
          />
          <DataNetworks
            className={cl(scss.list, current === "networks" && scss.visible)}
          />
        </div>
      </Modal>
    </>
  );
};

export default DataPopup;
