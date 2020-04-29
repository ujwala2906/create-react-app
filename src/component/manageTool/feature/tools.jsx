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
        isErrors: false,
        isChecked: false,
        value: constant.selectRegion,
        addQuestions: [],
        errorMessage: {
          tool: "",
          description: "",
          url: "",
          logo: "",
          email: "",
          questionField: ""
        },
        formValue: {
          tool: "",
          name: "",
          url: "",
          description: "",
          questionField: "",
          email: ""
        },
        img: "",
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
        isErrors: false,
        clearError: true,
        autoVal: true,
        value: constant.YES,
        countryValue: constant.YES,
        multiple: true,
        clear: false,
        showField: "",
        state: "",
        autocompleteName: [],
        name: "",
        formValue: {
          notes: "",
          seats: "",
          supeUser: "",
          emailContact: "",
          instruction: "",
          whitelist: "",
          superUser: ""
        },
        radioValue: "",
        errorMessage: {
          seats: "",
          supeUser: "",
          emailContact: "",
          whitelist: "",
          limit: "",
          instruction: "",
          country: ""
        },
        disable: {
          checkA: false,
          checkB: false
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
    const countrySelection =
      subscription.value === constant.YES
        ? subscription.autocompleteName
        : subscription.name;
    const validFields = Object.assign(tools.formValue, {
      insight: tools.isInsight,
      data: tools.isType,
      country: tools.autocompleteName,
      countrySub: countrySelection,
      error: subscription.errorMessage,
      radioValue: subscription.radioValue,
      seats_sub: subscription.formValue.seats,
      contact: subscription.disable
    });
    for (let [key, value] of Object.entries(validFields)) {
      if ((key === "insight" || key === "data") && !value.length) {
        return this.setState({
          alertError: `Select at least one ${key} type`,
          openAlert: true
        });
      }
      if (key === "country" && !value.length) {
        const error = await validate(key, value);
        return this.setState({
          alertError: error,
          openAlert: true
        });
      }
      if (key === "countrySub" && !(value.length || value)) {
        const error = await validate("country", value);
        return this.setState({
          alertError: error,
          openAlert: true
        });
      }
      if (key === "radioValue" && !value) {
        return this.setState({
          alertError: "Select at least one access type",
          openAlert: true
        });
      }

      //access validation
      if (subscription.radioValue === "limit") {
        if (key === "seats_sub" && !value) {
          return this.setState({
            alertError: "seats is required field",
            openAlert: true,
            subscription: { ...this.state.subscription, clearError: true }
          });
        }
      }
      if (subscription.radioValue === "contact") {
        if (key === "contact" && value) {
          const isChecked = value.checkA || value.checkB;
          if (!isChecked) {
            return this.setState({
              alertError: "Select at least one contact field",
              openAlert: true,
              subscription: { ...this.state.subscription, clearError: true }
            });
          }
          if (value.checkA && !subscription.formValue.emailContact) {
            const error = await validate(
              "emailContact",
              subscription.formValue.emailContact
            );
            return this.setState({
              alertError: error,
              openAlert: true,
              subscription: { ...this.state.subscription, clearError: true }
            });
          }
          if (value.checkB && !subscription.formValue.instruction) {
            return this.setState({
              alertError: "General Instruction is required",
              openAlert: true,
              subscription: { ...this.state.subscription, clearError: true }
            });
          }
        }
      }

      if (key === "error") {
        for (let [key, val] of Object.entries(value)) {
          if ((key === "country" || key === "instruction") && val) {
            return this.setState({
              alertError: val,
              openAlert: true
            });
          }
          if (val) {
            const error = await validate(key, val, 0);
            if (error) {
              return this.setState({
                alertError: error,
                openAlert: true
              });
            }
          }
        }
      }
      const error = await validate(key, value, tools.addQuestions.length);
      if (!value) {
        this.setState({
          tools: { ...this.state.tools, isErrors: true },
          subscription: { ...this.state.subscription, isErrors: true }
        });
      }
      if (error && key !== "email") {
        return this.setState({
          alertError: error,
          openAlert: true
        });
      }
    }
    const {
      formValue,
      addQuestions,
      isInsight,
      isType,
      autocompleteName,
      screenshotName
    } = tools;
    return console.log(
      formValue,
      addQuestions,
      isInsight,
      isType,
      autocompleteName,
      screenshotName,
      "subscription: ",
      subscription.formValue,
      subscription.name,
      subscription.autocompleteName,
      subscription.radioValue,
      subscription.value,
      subscription.countryValue
    );
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
