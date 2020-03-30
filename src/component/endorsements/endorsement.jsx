import React, { useState, useEffect, useCallback } from "react";
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

import constant from "../../lib/constant";

const Endorsement = () => {
  const classes = useStyles();
  const { snackBar, cardTitle, field } = constant;
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [value, setValue] = useState("");
  const [endorsement, setEndorsement] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [perPage] = useState(5);
  const [initial, setInitial] = useState(0);

  useEffect(() => {
    if (endorsement && endorsement.length) {
      setNewArray(endorsement);
    }
  }, [endorsement]);

  const handleAlert = () => {
    setOpenAlert(prevState => !prevState);
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
    setOpen(prevState => !prevState);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleValidate(field, value);
  }, [value]);

 

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

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

  const handleEndorsement = item => {
    setInitial(0);
    const index = endorsement.indexOf(item);
    if (index >= 0) {
      endorsement.splice(index, 1);
      setEndorsement(preState => [...preState]);
    }
    if (value && !error && !message) {
      const checkValue = endorsement.includes(value);
      const val = value.trim();
      if (val !== "") {
        if (!checkValue) {
          setEndorsement(preState => [...preState, value]);
          setValue("");
        } else {
          handleAlert();
        }
      }
    }
  };

  const keyPress = e => {
    setInitial(0);
    if (!error && !message) {
      if (e.keyCode === 13) {
        const value = endorsement.includes(e.target.value);
        const value2 = newArray.includes(e.target.value);
        const val = e.target.value.trim();
        if (val !== "") {
          if (!value || !value2) {
            setEndorsement(preState => [...preState, e.target.value]);
            setValue("");
          } else {
            handleAlert();
          }
        }
      }
    }
  };

  const addSuggestions = item => {
    setValue(item);
  };

  const renderChips = isRender => {
    if (endorsement.length > 0) {
      let count;
      if (endorsement.length > 2) {
        count = parseInt(endorsement.length) - 2;
      }
      return (
        <>
          {!isRender &&
            newArray
              .slice(0, perPage)
              .map((item, index) => (
                <Chip
                  size="small"
                  icon={<AddIcon fontSize="inherit" />}
                  label={item}
                  id={`${index}small`}
                  key={`${index}small`}
                  onClick={value => handleEndorsement(item)}
                  style={{ margin: 5 }}
                />
              ))}
          {isRender &&
            endorsement
              .slice(0, 2)
              .map((item, index) => (
                <Chip
                  size="small"
                  icon={<AddIcon fontSize="inherit" />}
                  label={item}
                  id={`${index}small`}
                  key={`${index}small`}
                  style={{ margin: 5 }}
                  onClick={value => handleEndorsement(item)}
                />
              ))}
          {count && isRender && (
            <Chip
              size="small"
              icon={<AddIcon fontSize="inherit" />}
              label={`${count}more`}
              onClick={handleClick}
            />
          )}
        </>
      );
    }
  };

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleAlert}>
        <Alert onClose={handleAlert} severity="error">
          {snackBar}
        </Alert>
      </Snackbar>

      <Card variant="outlined" className={classes.root}>
        <Typography variant="subtitle1" component="p">
          {cardTitle}
        </Typography>

        <CardActions>
          <IconButton color="primary" onClick={handleClick}>
            <AddCircleIcon />
          </IconButton>
        </CardActions>
        <CardContent>{renderChips(true)}</CardContent>
      </Card>

      <Modal
        open={open}
        suggestions={suggestions}
        endorsement={endorsement}
        renderChips={renderChips}
        addSuggestions={addSuggestions}
        handleAddEndorsement={handleEndorsement}
        handleValidate={handleValidate}
        handleClose={handleClick}
        handleChange={handleChange}
        value={value}
        message={message}
        error={error}
        keyPress={keyPress}
        newArray={newArray}
        setNewArray={setNewArray}
        perPage={perPage}
        initial={initial}
        setInitial={setInitial}
      />
    </>
  );
};

export default Endorsement;
