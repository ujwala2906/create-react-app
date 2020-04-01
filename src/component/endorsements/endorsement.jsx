import React from "react";
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

import { Modal } from "./features";

import constant from "../../lib/constant";

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const styles = {
  root: {
    maxWidth: 400
  },
  textField: {
    width: 500
  }
};

class Endorsement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      endorsement: [],
      newArray: [],
      perPage: 5,
      initial: 0,
      value: "",
      error: false,
      message: "",
      openAlert: false
    };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  suggestions = [
    "Easy to use",
    "Requires training",
    "Informative charts",
    "Detailed Reports",
    "Easy reading",
    "Good for trends"
  ];

  addSuggestions = item => {
    this.setState({ value: item });
  };

  handleAlert = () => {
    this.setState({ openAlert: !this.state.openAlert });
  };

  handleChange = e => {
    this.setState({ value: e.target.value }, () => {
      this.handleValidate(constant.field, this.state.value);
    });
  };

  componentDidMount() {
    if (this.state.endorsement && this.state.endorsement.length) {
      this.setState({ newArray: this.state.endorsement });
    }
  }

  handleValidate = async (field, value) => {
    let validationError = await validate(field, value);
    if (validationError) {
      this.setState({ error: true });
      this.setState({ message: validationError });
    } else {
      this.setState({ error: false });
      this.setState({ message: "" });
    }
  };

  handleEndorsement = item => {
    const {endorsement,newArray, initial, perPage , value, error, message} = this.state;
    const index = endorsement.indexOf(item);
    const newArrayIndex = newArray.indexOf(item);
    if (index >= 0) {
      endorsement.splice(index, 1);
      newArray.splice(newArrayIndex, 1);

      if (newArray.length === 0) {
        let initialValue = initial;
        this.setState({ initial: --initialValue });
        let parent = endorsement;
        let child = parent;

        let parentLength = parent.length;

        if (parent.length >= perPage && initial !== 1) {
          child = parent.slice(parentLength - perPage, parentLength);
        }

        return this.setState({
          endorsement: [...endorsement],
          newArray: [...child]
        });
      }
      return this.setState(
        {
          endorsement: [...endorsement]
        },
        () => {
          this.setState({ newArray: [...newArray] });
        }
      );
    }

    if (value && !error && !message) {
      this.setState({ initial: 0 });
      const checkValue = endorsement.includes(value);
      const val = value.trim();
      if (val !== "") {
        if (!checkValue) {
          this.setState(
            {
              endorsement: [...endorsement, value]
            },
            () => {
              this.setState({ newArray: [...this.state.endorsement] });
            }
          );
          this.setState({ value: "" });
        } else {
          this.handleAlert();
        }
      }
    }
  };

  keyPress = e => {
    this.setState({ initial: 0 });
    if (!this.state.error && !this.state.message) {
      if (e.keyCode === 13) {
        const value = this.state.endorsement.includes(e.target.value);
        const value2 = this.state.newArray.includes(e.target.value);
        const val = e.target.value.trim();
        if (val !== "") {
          if (!value || !value2) {
            this.setState(
              {
                endorsement: [...this.state.endorsement, e.target.value]
              },
              () => {
                this.setState({ newArray: [...this.state.endorsement] });
              }
            );
            this.setState({ value: "" });
          } else {
            this.handleAlert();
          }
        }
      }
    }
  };

  handlePrev = (data, index) => {
    if (data && data.length) {
      this.setState({ initial: index });
      this.setState({ newArray: data });
    }
  };
  handleNext = (data, index) => {
    if (data && data.length) {
      this.setState({ initial: index });
      this.setState({ newArray: data });
    }
  };

  renderChips = isRender => {
    const { endorsement, newArray, perPage } = this.state;
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
                  onClick={() => this.handleEndorsement(item)}
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
                  onClick={() => this.handleEndorsement(item)}
                />
              ))}
          {count && isRender && (
            <Chip
              size="small"
              icon={<AddIcon fontSize="inherit" />}
              label={`${count}more`}
              onClick={this.handleClick}
            />
          )}
        </>
      );
    }
  };

  render() {
    const {
      openAlert,
      open,
      endorsement,
      value,
      message,
      error,
      newArray,
      perPage,
      initial
    } = this.state;
    return (
      <>
        <Snackbar
          open={openAlert}
          autoHideDuration={1000}
          onClose={this.handleAlert}
        >
          <Alert onClose={this.handleAlert} severity="error">
            {constant.snackBar}
          </Alert>
        </Snackbar>
        <Card variant="outlined" style={styles.root}>
          <Typography variant="subtitle1" component="p">
            {constant.cardTitle}
          </Typography>

          <CardActions>
            <IconButton color="primary" onClick={this.handleClick}>
              <AddCircleIcon />
            </IconButton>
          </CardActions>
          <CardContent>{this.renderChips(true)}</CardContent>
        </Card>

        <Modal
          open={open}
          suggestions={this.suggestions}
          endorsement={endorsement}
          renderChips={this.renderChips}
          addSuggestions={this.addSuggestions}
          handleAddEndorsement={this.handleEndorsement}
          handleValidate={this.handleValidate}
          handleClose={this.handleClick}
          handleChange={this.handleChange}
          value={value}
          message={message}
          error={error}
          keyPress={this.keyPress}
          newArray={newArray}
          perPage={perPage}
          initial={initial}
          handlePrev={this.handlePrev}
          handleNext={this.handleNext}
        />
      </>
    );
  }
}

export default Endorsement;
