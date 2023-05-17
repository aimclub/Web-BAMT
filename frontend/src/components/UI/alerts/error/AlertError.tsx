import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FC, memo, useEffect, useState } from "react";

const AlertError: FC<{ message?: string; isError: boolean }> = ({
  message = "API error",
  isError,
}) => {
  const [opened, setOpened] = useState(false);

  const handleClose = () => {
    setOpened(false);
  };

  useEffect(() => {
    if (isError) {
      setOpened(true);
      setTimeout(() => {
        setOpened(false);
      }, 6_000);
    }
  }, [isError]);

  return (
    <Snackbar
      open={opened}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert
        elevation={6}
        onClose={(event) => {
          event.stopPropagation();
          handleClose();
        }}
        severity="error"
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(AlertError);
