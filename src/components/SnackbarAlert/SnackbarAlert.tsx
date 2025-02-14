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
      data-testid='alert'
    >
      <Alert
        onClose={handleClose}
        severity='error'
        variant='filled'
        sx={{ width: "100%" }}
      >
        <div data-testid='alert|content'>
          Exchange rates could not be loaded.
          <br />
          Showing mocked data.
        </div>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
