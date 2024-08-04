import { Dispatch, SetStateAction } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarAlertProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SnackbarAlert = ({ open, setOpen }: SnackbarAlertProps) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity='error'
        variant='filled'
        sx={{ width: "100%" }}
      >
        Exchange rates could not be loaded.
        <br />
        Showing mocked data.
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
