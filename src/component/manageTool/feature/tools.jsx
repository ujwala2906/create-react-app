import React, { Component } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import {
  IconButton,
  Container,
  CardActions,
  Button,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import { Tool, Subscription } from "./subFeature";

import { constant } from "../../../lib/constant";

import validate from "./yup";

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertError: "",
      openAlert: false,
      button: true,
      stage: false,
      tools: {
        isChecked: false,
        value: constant.selectRegion,
        addQuestions: [],
        errorMessage: {
          title: "",
          description: "",
          url: "",
          logo: "",
          email: "",
          questionField: ""
        },
        formValue: {
          title: "",
          url: "",
          description: "",
          questionField: ""
        },
        img: "",
        name: "",
        showError: "",
        isInsight: [],
        isType: [],
        error: {
          insightErr: {
            message: "",
            isTrue: false
          },
          typeErr: {
            message: "",
            isTrue: false
          }
        },
        multiple: [],
        val: "",
        currentImg: 0,
        screenshotName: [],
        autocompleteName: []
      },
      subscription: {
        value: constant.YES,
        countryValue: constant.YES,
        multiple: true,
        clear: false,
        showField: "",
        state: "",
        autocompleteName: [],
        formValue: {
          notes: "",
          seats: "",
          supeUser: "",
          emailContact: "",
          instruction: "",
          whitelist: "",
          limit: ""
        },
        radioValue: "",
        errorMessage: {
          seats: "",
          supeUser: "",
          emailContact: "",
          whitelist: "",
          limit: "",
          instruction: ""
        },
        disable: {
          checkA: true,
          checkB: true
        }
      }
    };
  }

  handlePage = () => this.setState({ ...this.state, stage: !this.state.stage });

  Footer = () => {
    return (
      <>
        <IconButton
          color="primary"
          style={{ marginLeft: "auto" }}
          onClick={this.handlePage}
        >
          {!this.state.stage && <NavigateNextIcon style={{ fontSize: 40 }} />}
        </IconButton>
        {this.state.stage && (
          <>
            <IconButton color="primary" onClick={this.handlePage}>
              <NavigateBeforeIcon style={{ fontSize: 40 }} />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={this.checkValidation}
            >
              {constant.Submit}
            </Button>
          </>
        )}
      </>
    );
  };

  handleAlert = () => this.setState({ openAlert: !this.state.openAlert });

  checkValidation = async () => {
    const { tools, subscription } = this.state;
    const validFields = Object.assign(tools.formValue, {
      error: subscription.errorMessage
    });
    for (let [key, value] of Object.entries(validFields)) {
      if (key === "error") {
        for (let [key, val] of Object.entries(value)) {
          if (val) {
            const error = await validate(key, val, 0);
            if (error) {
              return this.setState({ alertError: error, openAlert: true });
            }
          }
        }
      }
      const error = await validate(key, value, tools.addQuestions.length);
      if (error) {
        return this.setState({ alertError: error, openAlert: true });
      }
    }
    return console.log(this.state);
  };

  render() {
    return (
      <>
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={1000}
          onClose={this.handleAlert}
        >
          <Alert onClose={this.handleAlert} severity="error">
            {this.state.alertError}
          </Alert>
        </Snackbar>

        <Container>
          {!this.state.stage && (
            <Tool
              {...this.state.tools}
              updateState={(obj = {}, callback = () => {}) =>
                this.setState(obj, callback)
              }
            />
          )}
          {this.state.stage && (
            <Subscription
              {...this.state.subscription}
              updateState={(obj = {}, callback = () => {}) =>
                this.setState(obj, callback)
              }
            />
          )}
          <CardActions>
            <this.Footer />
          </CardActions>
        </Container>
      </>
    );
  }
}
