import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {
  Card,
  Typography,
  CardActions,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Chip,
  DialogActions
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddBoxIcon from "@material-ui/icons/AddBox";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles, styles } from "./style";

const Endorsement = () => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <>
      <Card variant="outlined" className={classes.root}>
        <Typography variant="subtitle1" component="p">
          Popular Endorsements
        </Typography>
        <CardActions>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={handleClick}
          >
            <AddCircleIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle onClose={handleClose}>
          What would you endorse this tool for ?
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Enter text"
            variant="outlined"
          />
          <IconButton
            color="default"
            onClick={handleClick}
            edge="end"
            style={{ padding: 0 }}
          >
            <AddBoxIcon style={{ fontSize: 60, padding: 0 }} />
          </IconButton>
          <h3>Popular Endorsements</h3>
          <Chip
            size="small"
            icon={<AddIcon fontSize="inherit" />}
            label="Informative Charts"
          />
        </DialogContent>
        <DialogActions>
          <IconButton color="default" onClick={handleClick}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton color="default" onClick={handleClick}>
            <NavigateNextIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Endorsement;
