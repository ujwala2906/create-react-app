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
import { rows } from "../../table";

import { constant } from "../../../lib/constant";
import { validation } from "../cms";

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
      severity: "",
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
    const { history } = this.props;

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
          openAlert: true,
          severity: "error"
        });
      }
      if (
        key === "country" &&
        !value.length &&
        tools.value === constant.selectRegion
      ) {
        return this.setState({
          alertError: validation.region,
          openAlert: true,
          severity: "error"
        });
      }
      if (key === "countrySub" && (!value || !value.length)) {
        return this.setState({
          alertError: validation.region,
          openAlert: true,
          severity: "error"
        });
      }
      if (key === "radioValue" && !value) {
        return this.setState({
          alertError: validation.accessType,
          openAlert: true,
          severity: "error"
        });
      }

      //access validation
      if (subscription.radioValue === "limit") {
        if (key === "seats_sub" && !value) {
          return this.setState({
            alertError: validation.seat,
            openAlert: true,
            severity: "error",
            subscription: { ...this.state.subscription, clearError: true }
          });
        }
      }
      if (subscription.radioValue === "contact") {
        if (key === "contact" && value) {
          const isChecked = value.checkA || value.checkB;
          if (!isChecked) {
            return this.setState({
              alertError: validation.contactField,
              openAlert: true,
              severity: "error",
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
              severity: "error",
              subscription: { ...this.state.subscription, clearError: true }
            });
          }
          if (value.checkB && !subscription.formValue.instruction) {
            return this.setState({
              alertError: validation.instruction,
              openAlert: true,
              severity: "error",
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
              openAlert: true,
              severity: "error"
            });
          }
          if (val) {
            const error = await validate(key, val, 0);
            if (error) {
              return this.setState({
                alertError: error,
                openAlert: true,
                severity: "error"
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
          openAlert: true,
          severity: "error"
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

    const data = {
      tool: formValue.tool,
      email: formValue.email,
      notes: subscription.formValue.notes
    };

    rows.push(data);

    this.setState({
      alertError: validation.submission,
      openAlert: true,
      severity: "success"
    });
    console.log(
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
    return history.push("/manage-tool");
  };

  render() {
    return (
      <>
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={1000}
          onClose={this.handleAlert}
        >
          <Alert onClose={this.handleAlert} severity={this.state.severity}>
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
