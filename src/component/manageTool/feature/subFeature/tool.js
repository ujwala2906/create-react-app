import React, { useState, useEffect } from "react";
import {
    TextField,
    Typography,
    Grid,
    IconButton,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup,
    Divider,
    Chip
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PropTypes from "prop-types";

import UploadLogo from "./uploadLogo";
import UploadScreenShot from "./uploadScreenshots";
import Autocomplete from "./autocomplete";
import RenderCheckbox from "./renderCheckbox";

import { toolCms, placeholder } from "../../cms";

import validate from "../yup";

import { constant } from "../../../../lib/constant";

const Tool = (props) => {
    const { value, updateState, addQuestions = [], formValue, errorMessage, isErrors } = props;

    const {
        stages,
        aboutTool,
        toolName,
        websiteUrl,
        description,
        limit,
        emailContact,
        questions,
        globalRegion,
        countries
    } = toolCms;

    const upperCaseFirstLetter = stringData => {
        if (!stringData) {
            return "";
        }
        const string = stringData.charAt(0).toUpperCase() + stringData.slice(1);
        return string;
    };

    const { selectRegion, global, title, description: information, email, url, questionField } = constant;

    const { searchTool, enterYourText } = placeholder;

    const [field, setField] = useState("");
    const [repeat, setRepeat] = useState(false)

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const filedValue = event.target.value;
        setField(fieldName);
        updateState({ tools: { ...props, formValue: { ...formValue, [fieldName]: filedValue } } });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleValidation = async (field, value) => {
        const validationError = await validate(field, value, addQuestions.length);
        setField("");
        return updateState({ tools: { ...props, errorMessage: { ...errorMessage, [field]: validationError } } })
    };

    useEffect(() => {
        if (field) {
            handleValidation(field, formValue[field]);
        }
    }, [formValue, field, handleValidation]);


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

    const repeated = (addQuestions.length && addQuestions.includes(formValue.questionField)) || "";
    const handlePush = () => {
        const { addQuestions } = props;
        if (repeated) {
            setRepeat(true)
        }
        if (formValue.questionField && !repeated) {
            setRepeat(false)
            updateState({ tools: { ...props, addQuestions: [...addQuestions, formValue.questionField], formValue: { ...formValue, questionField: "" } } })
        }
    };

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            if (repeated) {
                setRepeat(true)
            }
            if (formValue.questionField && !repeated) {
                setRepeat(false)
                updateState({ tools: { ...props, addQuestions: [...addQuestions, formValue.questionField], formValue: { ...formValue, questionField: "" } } })
            }
        };
    };

    const handleDelete = (index) => {
        addQuestions.splice(index, 1);
        updateState({ tools: { ...props, addQuestions: [...addQuestions] } })
    };

    const handleValue = (event) => {
        updateState({ tools: { ...props, value: event.target.value } });
    };

    const renderQuestions = () => (
        <>
            {addQuestions.map((item, index) => (
                <li><Chip label={item} key={index} variant="outlined" size="small" onDelete={() => handleDelete(index)} /></li>
            ))}
        </>
    );

    const renderTextField = (placeHolder, name, onClick, num, disable) => {
        let error = false
        if (errorMessage && errorMessage[name]) {
            error = true;
        }
        let multiline = false;
        if (num) {
            multiline = true;
        }
        const value = formValue[name];
        
        const validateValues = name !== questionField && name !== email;
        if (!value && isErrors && validateValues) {
            error = true;
            errorMessage[name] = `${upperCaseFirstLetter(name)} is required`;
        };
        return (
            <TextField
                name={name}
                fullWidth
                margin="dense"
                variant="outlined"
                placeholder={placeHolder}
                value={formValue[name]}
                onChange={onClick}
                helperText={errorMessage && errorMessage[name]}
                error={error}
                multiline={multiline}
                rows={num}
                disabled={disable}
                onKeyDown={keyPress}
            />
        );
    }

    const renderRadio = (value, label) => (
        <>
            <FormControlLabel
                value={value}
                control={<Radio />}
                label={label}
            />
        </>
    );

    return (
        <>
            {renderTypography(stages, "subtitle1", "textSecondary")}
            {renderTypography(aboutTool, "h5")}
            {renderTypography(toolName, "subtitle1", "textSecondary")}

            {renderTextField(searchTool, title, handleChange)}

            <Grid container spacing={3} >

                <UploadLogo {...props} isErrors={isErrors} />

                <Grid item xs={12}>
                    {renderTypography(websiteUrl, "subtitle1", "textSecondary")}
                    {renderTextField(enterYourText, url, handleChange)}
                </Grid>

                <Grid item xs={12}>
                    {renderTypography(description, "subtitle1", "textSecondary")}
                    {renderTextField(enterYourText, information, handleChange, 4)}
                </Grid>

                <Grid item xs={11}>
                    {renderTypography(
                        questions,
                        "subtitle1",
                        "textSecondary"
                    )}
                    {renderTextField(enterYourText, questionField, handleChange, "", addQuestions.length >= 2)}
                    {repeat && <span style={{ color: "red", fontSize: 12 }}>Questions can not be same</span>}
                    {isErrors && !addQuestions.length ? <span style={{ color: "red", fontSize: 12 }}>Enter at least one question</span>: null}
                </Grid>
                <IconButton color="default" onClick={handlePush} disabled={addQuestions.length >= 2} >
                    <AddBoxIcon style={{ fontSize: 60, paddingTop: 20 }} />
                </IconButton>

                <ul>
                    {renderQuestions()}
                </ul>

                <RenderCheckbox renderTypography={renderTypography} {...props} isErrors={isErrors} />

                <UploadScreenShot renderTypography={renderTypography} renderTextField={renderTextField} {...props} />

                <Grid item xs={12}>
                    {renderTypography(
                        limit,
                        "subtitle1",
                        "textSecondary"
                    )}

                    <FormControl component="fieldset">
                        <RadioGroup
                            value={value}
                            onChange={(value) => handleValue(value)}
                        >
                            {renderRadio(global, globalRegion)}
                            {renderRadio(selectRegion, countries)}
                        </RadioGroup>
                    </FormControl>

                    {value === selectRegion && <Autocomplete clear={false} {...props} updateState={updateState} tools={true} isErrors={isErrors} globalValue={value}/>}

                </Grid>

                <Grid item xs={12}>
                    {renderTypography(emailContact, "subtitle1", "textSecondary")}
                    {renderTextField(enterYourText, email, handleChange)}
                </Grid>
            </Grid>
            <br />
            <Divider />
        </>
    )
}


Tool.default = {
    updateState: () => { },
    addQuestions: [],
    value: "",
};
Tool.propTypes = {
    formValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    errorMessage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
}
export default Tool;