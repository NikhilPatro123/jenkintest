import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  dialogroot: {
    "& .MuiDialogContent-root": {
      fontFamily: "Montserrat",
    },
  },
  canclebutton: {
    fontFamily: "Montserrat",
    color: "#fff",
    backgroundColor: "#DF002C",
  },
  confirmbutton: {
    fontFamily: "Montserrat",
    color: "#fff",
    backgroundColor: "#3f51b5",
  },
}));

export const ConfirmDialog = (props) => {
  const classes = useStyles();
  const { title, children, open, setOpen, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
      className={classes.dialogroot}
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
          className={classes.canclebutton}
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          className={classes.confirmbutton}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
