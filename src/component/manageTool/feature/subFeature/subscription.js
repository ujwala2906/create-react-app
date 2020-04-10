import React, { useState } from "react";
import {
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup,
    Divider,
    Checkbox
} from "@material-ui/core";

import { subscriptionCms, placeholder } from "../../cms";

import Autocomplete from "./autocomplete";

import validate from "../yup";

import {constant} from "../../../../lib/constant";

const Subscription = () => {
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

    const [value, setValue] = useState("yes");
    const [countryValue, setCountryValue] = useState("yes");
    const [multiple, setMultiple] = useState(true);
    const [clear, setClear] = useState(false);
    const [showField, setShowField] = useState("");
    const [state, setState] = useState("");
    const [formValues, setFormValues] = useState({
        notes: "",
        seats: "",
        supeUser: "",
        emailContact: "",
        whitelist: "",
        limit: "",
        instruction: ""
    });
    const [errorMessage, setErrorMessage] = useState({
        notes: "",
        seats: "",
        supeUser: "",
        emailContact: "",
        whitelist: "",
        limit: "",
        instruction: ""
    });

    const handleAutocomplete = async (e, value) => {
        if(!clear && value && !value.length){
            const ValidateError = await validate("country", null);
            setState(ValidateError);
        }
        else{
            setState(false);
        }
    }

    const handleChangeRadio = (event) => {
        const val = event.target.value;
        setValue(val);
        if (val === constant.NO) {
            setMultiple(false);
            setClear(true);
        }
        else {
            setMultiple(true);
            setClear(false);
        }
    };

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const filedValue = event.target.value;
        setFormValues(prevState => ({
            ...prevState,
            [fieldName]: filedValue
        }))
        handleValidation(fieldName, filedValue);
    };

    const handleValidation = async (field, value) => {
        console.log(field, value)
        const validationError = await validate(field, value);
        setErrorMessage(prevState => ({
            ...prevState,
            [field]: validationError,
        }));
    };

    const handleCountry = (event) => setCountryValue(event.target.value);

    const renderTypography = (children, variant, color) => {
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

    const [disable, setDisable] = useState({
        checkA: true,
        checkB: true
    });
    const handleCheck = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        if (name === "checkA" && value) {
            return setDisable(prev =>({
                ...prev,
                checkA: false,
            }))
        }
        if (name === "checkB" && value) {
            return setDisable( prev => ({
                ...prev,
                checkB: false
            }))
        }
       return setDisable({checkA:true, checkB:true})
    }

    const renderTextField = (name, disable) => {
        let error = false
        if (errorMessage && errorMessage[name]) {
            error = true;
        }
        return (
            <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                name={name}
                placeholder={placeholder.enterYourText}
                value={formValues[name]}
                onChange={handleChange}
                helperText={errorMessage && errorMessage[name]}
                error={error}
                disabled={disable}
            />
        );
    };

    const handleRadio = (event) => {
        console.log(event.target.value);
        const val = event.target.value;
        if (val) {
            setShowField(val);
        };
    };

    const renderText = (label, value, field) => {
        return (<><Checkbox name={value} onChange={handleCheck} id={field} /><span style={{ color: "grey", fontSize: 16 }}>{label}</span></>)
    }

    return (
        <>
            <Grid>
                {renderTypography(stages, "subtitle1", "textSecondary")}
                {renderTypography(toolHead, "h5")}

                <Grid item xs={12}>
                    {renderTypography(markets, "subtitle1", "textSecondary")}
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={value}
                            onChange={handleChangeRadio}
                        >
                            <FormControlLabel
                                value={constant.YES}
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value={constant.NO}
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Autocomplete multiple={multiple} clear={clear} handleChange={handleAutocomplete} state={state}/>
                </Grid>

                <br />
                <Grid item xs={12}>
                    {renderTypography(notes, "subtitle1", "textSecondary")}
                    {renderTextField()}
                </Grid>
                <br />
                <Grid item xs={12}>
                    {renderTypography(accessType, "subtitle1", "textSecondary")}
                    <FormControl component="fieldset">
                        <RadioGroup>
                            <FormControlLabel
                                value={accessTypeArray[0].key}
                                control={<Radio />}
                                label={accessTypeArray[0].title}
                                onChange={handleRadio}
                            />
                            {showField === "limit" && <Grid item xs={12}>
                                {renderTypography(seats, "subtitle1", "textSecondary")}
                                {renderTextField("seats")}
                                {renderTypography(limit, "subtitle1", "textSecondary")}
                                {renderTextField("limit")}
                            </Grid>}

                            <FormControlLabel
                                value={accessTypeArray[1].key}
                                control={<Radio />}
                                label={accessTypeArray[1].title}
                                onChange={handleRadio}
                            />
                            {showField === "contact" && <Grid item xs={7}>
                                {renderText(email, "checkA", "emailContact")}
                                {renderTextField("emailContact", disable.checkA)}
                                {renderText(instructions, "checkB", "instruction")}
                                {renderTextField("instruction", disable.checkB)}
                            </Grid>}

                            <FormControlLabel
                                value={accessTypeArray[2].key}
                                control={<Radio />}
                                label={accessTypeArray[2].title}
                                onChange={handleRadio}
                            />
                            <FormControlLabel
                                value={accessTypeArray[3].key}
                                control={<Radio />}
                                label={accessTypeArray[3].title}
                                onChange={handleRadio}
                            />
                            {showField === "whitelist" && <Grid item xs={12}>
                                {renderTypography(whiteList, "subtitle1", "textSecondary")}
                                {renderTextField("whitelist")}
                            </Grid>}
                            <FormControlLabel
                                value={accessTypeArray[4].key}
                                control={<Radio />}
                                label={accessTypeArray[4].title}
                                onChange={handleRadio}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <br />
                <Grid item xs={12}>
                    {renderTypography(selectCountries, "subtitle1", "textSecondary")}
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={countryValue}
                            onChange={handleCountry}
                        >
                            <FormControlLabel
                                value={constant.YES}
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value={constant.NO}
                                control={<Radio />}
                                label={customize}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <br></br>
            <Divider />
        </>
    )
}
export default Subscription;