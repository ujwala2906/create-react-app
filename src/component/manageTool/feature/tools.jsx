import React, { Component } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { IconButton, Container, CardActions, Button } from "@material-ui/core";

import { Tool, Subscription } from "./subFeature";

import { constant } from "../../../lib/constant";

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: false,
      tools: {
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
        limit: "",
        contact: "",
        access: "",
        website: "",
        whitelist: "",
        errorMessage: {
          notes: "",
          seats: "",
          supeUser: "",
          emailContact: "",
          whitelist: "",
          limit: "",
          instruction: ""
        }
      }
    };
  }

  handlePage = () => this.setState({ ...this.state, stage: !this.state.stage });

  getData = () => console.log(this.state);

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
            <Button variant="contained" color="primary" onClick={this.getData}>
              {constant.Submit}
            </Button>
          </>
        )}
      </>
    );
  };

  render() {
    return (
      <>
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
