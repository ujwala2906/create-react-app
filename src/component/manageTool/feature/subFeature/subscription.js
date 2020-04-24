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
            field: "",
            clear: false,
        };
    }


    handleChangeRadio = event => {
        const { updateState } = this.props;
        const val = event.target.value;
        updateState({ subscription: { ...this.props, value: val } });
        if (val === constant.NO) {
            updateState({ subscription: { ...this.props, multiple: false, clear: true, value: val, autoVal: false } });
        }
        else {
            updateState({ subscription: { ...this.props, multiple: true, clear: false, value: val, autoVal: true } });
        }
    };

    handleChange = event => {
        const { formValue, updateState } = this.props;
        const fieldName = event.target.name;
        const filedValue = event.target.value;
        this.setState({ field: fieldName })
        updateState({ subscription: { ...this.props, formValue: { ...formValue, [fieldName]: filedValue } } });
    };

    componentDidUpdate() {
        const { formValue } = this.props;
        if (this.state.field) {
            this.handleValidation(this.state.field, formValue[this.state.field]);
        };
    };

    handleValidation = async (field, value) => {
        const { errorMessage, updateState } = this.props;
        const validationError = await validate(field, value, 0);
        this.setState({ field: ""})
        return updateState({ subscription: { ...this.props, errorMessage: { ...errorMessage, [field]: validationError } } })
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
        const { updateState, disable, formValue } = this.props;
        const resetFields = {
            emailContact: "",
            instruction: ""
        };
        updateState({ subscription: { ...this.props, disable: { ...disable, [event.target.name]: event.target.checked, formValue: { ...formValue, ...resetFields } } } });
    };

    renderTextField = (name, handleChange, disable) => {
        const { formValue, errorMessage } = this.props;
        let error = false;
        if (errorMessage && errorMessage[name]) {
            error = true;
        };
        const val = (!disable && formValue[name]) || "";

        return (
            <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                name={name}
                placeholder={placeholder.enterYourText}
                value={val}
                onChange={handleChange}
                helperText={errorMessage && errorMessage[name]}
                error={error}
                disabled={disable}
            />
        );
    };


    handleValue = (event) => {
        const { updateState, formValue, errorMessage } = this.props;
        const val = event.target.value;
        const resetFields = {
            seats: "",
            emailContact: "",
            instruction: "",
            whitelist: "",
            superUser: ""
        };
        const errorField = {
            seats: "",
            supeUser: "",
            emailContact: "",
            whitelist: "",
            superUser: "",
            instruction: ""
        };
        updateState({ subscription: { ...this.props, radioValue: event.target.value, showField: val, formValue: { ...formValue, ...resetFields }, errorMessage: { ...errorMessage, ...errorField } } });
    };

    renderText = (label, value, field) => {
        const { disable } = this.props;
        return (<>
            <FormControlLabel
                control={
                    <Checkbox name={value} onChange={this.handleCheck} id={field} checked={disable[value]} />
                }
                label={
                    <span style={{ color: "grey", fontSize: 16 }}>{label}</span>
                }
            />
        </>)
    };

    renderRadio = (value, label) => (
        <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
        />
    );

    render() {
        const { radioValue, value, updateState, countryValue, showField, disable, isErrors, formValue, errorMessage } = this.props;
        return (
            <>
                <Grid>
                    {this.renderTypography(stages, "subtitle1", "textSecondary")}
                    {this.renderTypography(toolHead, "h5")}

                    <Grid item xs={12}>
                        {this.renderTypography(markets, "subtitle1", "textSecondary")}
                        <FormControl component="fieldset">
                            <RadioGroup value={value} onChange={this.handleChangeRadio} >
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
                            isErrors={isErrors}
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
                            <RadioGroup
                                value={radioValue}
                                onChange={this.handleValue}>

                                {this.renderRadio(
                                    accessTypeArray[0].key,
                                    accessTypeArray[0].title,
                                )}
                                {showField === "limit" && (
                                    <Grid item xs={12}>
                                        {this.renderTypography(seats, "subtitle1", "textSecondary")}
                                        {this.renderTextField("seats", this.handleChange)}
                                        {!errorMessage.seats && isErrors && !formValue.seats ? <span style={{ color: "red", fontSize: 12 }}>Seats is required field</span> : null}
                                        {this.renderTypography(limit, "subtitle1", "textSecondary")}
                                        {this.renderTextField("superUser", this.handleChange)}
                                    </Grid>

                                )}

                                {this.renderRadio(
                                    accessTypeArray[1].key,
                                    accessTypeArray[1].title,
                                )}

                                {showField === "contact" && (
                                    <Grid item xs={7}>
                                        {this.renderText(email, "checkA", "emailContact")}
                                        {this.renderTextField("emailContact", this.handleChange, !disable.checkA)}
                                        {!errorMessage.emailContact && disable.checkA && !formValue.emailContact ? <span style={{ color: "red", fontSize: 12 }}>Contact Email is a required field</span> : null}
                                        {this.renderText(instructions, "checkB", "instruction")}
                                        {this.renderTextField("instruction", this.handleChange, !disable.checkB)}
                                        {!errorMessage.instruction && disable.checkB && !formValue.instruction ? <span style={{ color: "red", fontSize: 12 }}>General Instruction is required</span> : null}
                                        {isErrors && !disable.checkA && !disable.checkB && <span style={{ color: "red", fontSize: 12 }}>Select at least one contact field</span>}
                                    </Grid>
                                )}
                                {this.renderRadio(
                                    accessTypeArray[2].key,
                                    accessTypeArray[2].title,
                                )}
                                {this.renderRadio(
                                    accessTypeArray[3].key,
                                    accessTypeArray[3].title,
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
                                )}
                            </RadioGroup>
                            {isErrors && !radioValue && <span style={{ color: "red", fontSize: 12 }}>Select at least one access type</span>}
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