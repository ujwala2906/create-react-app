import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  CardActions,
  IconButton,
  Snackbar,
  CardContent,
  Chip
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";

import validate from "./yup";

import { useStyles } from "./style";

import { Modal } from "./features";

const Endorsement = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [value, setValue] = useState("");
  const [endorsement, setEndorsement] = useState([]);

  const handleAlert = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const suggestions = [
    "Easy to use",
    "Requires training",
    "Informative charts",
    "Detailed Reports",
    "Easy reading",
    "Good for trends"
  ];

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = e => {
    setValue(e.target.value);
  };

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleValidate = async (field, value) => {
    let validationError = await validate(field, value);
    if (validationError) {
      setError(true);
      setMessage(validationError);
    } else {
      setError(false);
      setMessage("");
    }
  };

  const handleAddEndorsement = () => {
    if (!error && !message) {
      const checkValue = endorsement.includes(value);
      if (!checkValue) {
        setEndorsement(preState => [...preState, value]);
        setValue("");
      } else {
        handleAlert();
      }
    }
  };

  const addSuggestions = item => {
    setValue(item);
  };

  useEffect(() => {
    const count = endorsement.length;
    console.log("count", count);
    if (count >= 5) {
      const PageNumebr = endorsement.slice();
    }
  }, [endorsement]);

  const handleRemove = item => {
    const index = endorsement.indexOf(item);
    if (index >= 0) {
      endorsement.splice(index, 1);
      setEndorsement(preState => [...preState]);
    }
  };

  const renderChips = () => {
    return (
      <>
        {endorsement.map((item, index) => (
          <Chip
            size="small"
            icon={<AddIcon fontSize="inherit" />}
            label={item}
            id={`${index}small`}
            key={`${index}small`}
            onClick={value => handleRemove(item)}
            style={{margin:5}}
          />
        ))}
      </>
    );
  };

  const renderCardChips = () => {
    if (endorsement.length > 0) {
      const newEndorsement = endorsement.slice(0, 2);
      let count;
      if (endorsement.length > 2) {
        count = parseInt(endorsement.length) - 2;
      }
      return (
        <>
          {newEndorsement.map((item, index) => (
            <Chip
              size="small"
              icon={<AddIcon fontSize="inherit" />}
              label={item}
              id={`${index}small`}
              key={`${index}small`}
              style={{margin:5}}
            />
          ))}
          {count && <Chip
            size="small"
            icon={<AddIcon fontSize="inherit" />}
            label={`${count}more`}
          />}
        </>
      );
    }
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleAlertClose}
      >
        <Alert severity="error">Endorsement Already exist!</Alert>
      </Snackbar> 

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
        <CardContent>{renderCardChips()}</CardContent>
      </Card>

      <Modal
        open={open}
        suggestions={suggestions}
        endorsement={endorsement}
        renderChips={renderChips}
        addSuggestions={addSuggestions}
        handleAddEndorsement={handleAddEndorsement}
        handleValidate={handleValidate}
        handleClose={handleClose}
        handleChange={handleChange}
        value={value}
        message={message}
        error={error}
      />
    </>
  );
};

export default Endorsement;
