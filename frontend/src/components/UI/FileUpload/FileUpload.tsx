import { FC, useEffect, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { cl } from "../../../assets/utils/classnames";
import scss from "./fileUpload.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const FileUpload: FC<DropzoneOptions & { className?: string }> = ({
  className,
  multiple = false,
  ...options
}) => {
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    ...options,
    multiple,
    onDropAccepted: (files, event) => {
      setCurrentFiles((prev) => prev.concat(files));
      options.onDropAccepted && options.onDropAccepted(files, event);
    },
  });

  const handleFileRemove = (index: number) => {
    setCurrentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("files", currentFiles);
  }, [currentFiles]);

  return (
    <div className={cl(className, scss.root)}>
      {((!multiple && currentFiles.length < 1) || multiple) && (
        <div {...getRootProps({ className: scss.input })}>
          <input {...getInputProps()} />
          <span>Нажмите для загрузки или перетащите файл в это окно</span>
          <AddCircleOutlineIcon sx={{ height: 16 }} />
        </div>
      )}
      {currentFiles.length > 0 && (
        <ul className={scss.files}>
          {currentFiles.map((file, index) => (
            <li key={file.name} className={scss.item}>
              <span>{file.name}</span>
              <span className={scss.size}>{`${(file.size / 1024).toFixed(
                2
              )} MB`}</span>
              <RemoveCircleOutlineIcon
                fontSize="small"
                onClick={() => handleFileRemove(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
