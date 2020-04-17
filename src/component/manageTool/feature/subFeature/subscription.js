import React, { Component } from "react";
import {
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup,
    Divider,
    Checkbox,
} from "@material-ui/core";

import { subscriptionCms, placeholder } from "../../cms";

import Autocomplete from "./autocomplete";

import validate from "../yup";

import { constant } from "../../../../lib/constant";
const {
    stages,
    toolHead,
    markets,
    notes,
    accessType,
    selectCountries,
    accessTypeArray,
    seats,
    limit,
    email,
    instructions,
    whiteList,
    customize
} = subscriptionCms;
class Subscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: true,
            clear: false,
            showField: "",
            state: "",
            formValues: {
                notes: "",
                seats: "",
                supeUser: "",
                emailContact: "",
                whitelist: "",
                limit: "",
                instruction: ""
            },
            errorMessage: {
                notes: "",
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

        };
    }


    handleChangeRadio = event => {
        const { updateState } = this.props;
        const val = event.target.value;
        updateState({ subscription: { ...this.props, value: val } });
        if (val === constant.NO) {
            updateState({ subscription: { ...this.props, multiple: false, clear: true, value: val } });
        }
        else {
            updateState({ subscription: { ...this.props, multiple: true, clear: false, value: val } });
        }
    };

    handleChange = event => {
        const { formValue, updateState } = this.props;
        const fieldName = event.target.name;
        const filedValue = event.target.value;
        updateState({ subscription: { ...this.props, formValue: { ...formValue, [fieldName]: filedValue } } }, () => {
            this.handleValidation(fieldName, filedValue);
        });
    };

    handleValidation = async (field, value) => {
        const validationError = await validate(field, value);
        this.setState({
            errorMessage: { [field]: validationError }
        });
    };

    handleCountry = event => {
        const { updateState } = this.props;
        updateState({ subscription: { ...this.props, countryValue: event.target.value } })
    }

    renderTypography = (children, variant, color) => {
        return (
            <Typography
                variant={variant}
                color={color}
                align="left"
                display="block"
                gutterBottom={true}
            >
                {children}
            </Typography>
        );
    };

    handleCheck = event => {
        const name = event.target.name;
        const value = event.target.checked;
        if (name === "checkA") {
            this.setState({
                disable: { checkA: false, checkB: true }
            });
            if (!value) {
                this.setState({
                    disable: { ...this.state.disable, checkA: true }
                });
            }
        }
        if (name === "checkB") {
            this.setState({
                disable: { ...this.state.disable, checkB: false }
            });
            if (!value) {
                this.setState({
                    disable: { ...this.state.disable, checkB: true }
                });
            }
        }
    };

    renderTextField = (name, handleChange, disable) => {
        const { formValue } = this.props;
        let error = false;
        if (this.state.errorMessage && this.state.errorMessage[name]) {
            error = true;
        }
        return (
            <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                name={name}
                placeholder={placeholder.enterYourText}
                value={formValue[name]}
                onChange={handleChange}
                helperText={this.state.errorMessage && this.state.errorMessage[name]}
                error={error}
                disabled={disable}
            />
        );
    };

    handleRadio = event => {
        const { updateState } = this.props;
        const val = event.target.value;
        if (val === "limit") 
            updateState({ subscription: { ...this.props, showField: val, limit: val } });
        else if (val === "contact")
            updateState({ subscription: { ...this.props, contact: val, showField: val } });
        else if (val === "access")
            updateState({ subscription: { ...this.props, access: val, showField: val } });
        else if (val === "website")
            updateState({ subscription: { ...this.props, website: val, showField: val } });
        else
            updateState({ subscription: { ...this.props, whitelist: val, showField: val } });
    };

    renderText = (label, value, field) => (
        <>
            <FormControlLabel
                control={
                    <Checkbox name={value} onChange={this.handleCheck} id={field} />
                }
                label={
                    <span style={{ color: "grey", fontSize: 16 }}>{label}</span>
                }
            />
        </>
    );

    renderRadio = (value, label, handleRadio) => (
        <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            onChange={handleRadio}
        />
    );

    render() {
        const {
            disable
        } = this.state;
        const { value, updateState, countryValue, showField } = this.props;
        return (
            <>
                <Grid>
                    {this.renderTypography(stages, "subtitle1", "textSecondary")}
                    {this.renderTypography(toolHead, "h5")}

                    <Grid item xs={12}>
                        {this.renderTypography(markets, "subtitle1", "textSecondary")}
                        <FormControl component="fieldset">
                            <RadioGroup value={value} onChange={(value) => this.handleChangeRadio(value)} >
                                {this.renderRadio(constant.YES, "Yes")}
                                {this.renderRadio(constant.NO, "No")}
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            {...this.props}
                            updateState={updateState}
                            subscription={true}
                        />
                    </Grid>

                    <br />
                    <Grid item xs={12}>
                        {this.renderTypography(notes, "subtitle1", "textSecondary")}
                        {this.renderTextField("notes", this.handleChange)}
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                        {this.renderTypography(accessType, "subtitle1", "textSecondary")}
                        <FormControl component="fieldset">
                            <RadioGroup>
                                {this.renderRadio(
                                    accessTypeArray[0].key,
                                    accessTypeArray[0].title,
                                    this.handleRadio
                                )}
                                {showField === "limit" && (
                                    <Grid item xs={12}>
                                        {this.renderTypography(seats, "subtitle1", "textSecondary")}
                                        {this.renderTextField("seats", this.handleChange)}
                                        {this.renderTypography(limit, "subtitle1", "textSecondary")}
                                        {this.renderTextField("limit", this.handleChange)}
                                    </Grid>
                                )}
                                {this.renderRadio(
                                    accessTypeArray[1].key,
                                    accessTypeArray[1].title,
                                    this.handleRadio
                                )}
                                {showField === "contact" && (
                                    <Grid item xs={7}>
                                        {this.renderText(email, "checkA", "emailContact")}
                                        {this.renderTextField("emailContact", this.handleChange, disable.checkA)}
                                        {this.renderText(instructions, "checkB", "instruction")}
                                        {this.renderTextField("instruction", this.handleChange, disable.checkB)}
                                    </Grid>
                                )}
                                {this.renderRadio(
                                    accessTypeArray[2].key,
                                    accessTypeArray[2].title,
                                    this.handleRadio
                                )}
                                {this.renderRadio(
                                    accessTypeArray[3].key,
                                    accessTypeArray[3].title,
                                    this.handleRadio
                                )}
                                {showField === "whitelist" && (
                                    <Grid item xs={12}>
                                        {this.renderTypography(whiteList, "subtitle1", "textSecondary")}
                                        {this.renderTextField("whitelist", this.handleChange)}
                                    </Grid>
                                )}
                                {this.renderRadio(
                                    accessTypeArray[4].key,
                                    accessTypeArray[4].title,
                                    this.handleRadio
                                )}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                        {this.renderTypography(selectCountries, "subtitle1", "textSecondary")}
                        <FormControl component="fieldset">
                            <RadioGroup value={countryValue} onChange={this.handleCountry}>
                                {this.renderRadio(constant.YES, "Yes")}
                                {this.renderRadio(constant.NO, customize)}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <br></br>
                <Divider />
            </>
        );
    }
}
export default Subscription;