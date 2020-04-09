import React, { useState, useEffect } from "react";
import {
    FormGroup,
    TextField,
    Typography,
    Grid,
    IconButton,
    FormControlLabel,
    Checkbox,
    FormControl,
    Radio,
    RadioGroup,
    Divider,
    Chip
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { toolCms, placeholder } from "../../cms";

import validate from "../yup";

import UploadLogo from "./uploadLogo";
import UploadScreenShot from "./uploadScreenshots";
import Autocomplete from "./autocomplete"

const Tool = () => {
    const {
        stages,
        aboutTool,
        toolName,
        websiteUrl,
        description,
        insight,
        type,
        limit,
        emailContact,
        insightArray,
        typeArray,
        questions
    } = toolCms;

    const { searchTool, enterYourText } = placeholder;

    const [value, setValue] = useState("selectRegion");
    const [addQuestions, setAddQuestions] = useState([]);

    const [error, setError] = useState({ insightErr: { message: "", isTrue: false }, typeErr: { message: "", isTrue: false } })

    const [isInsight, setIsInsight] = useState([]);
    const [isType, setIsType] = useState([]);
    const [errorMessage, setErrorMessage] = useState({
        title: "",
        description: "",
        url: "",
        logo: "",
        email: "",
        screenshot: ""
    });

    const [formValue, setFormValue] = useState({
        title: "",
        url: "",
        description: "",
        questionField: "",
    })

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const filedValue = event.target.value;
        setFormValue(prevState => ({
            ...prevState,
            [fieldName]: filedValue
        }))
        handleValidation(fieldName, filedValue);
    }

    const handleValidation = async (field, value) => {
        const validationError = await validate(field, value);
        setErrorMessage(prevState => ({
            ...prevState,
            [field]: validationError,
        }));
    };

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

    useEffect(() => {
        if (!isInsight.length && error.insightErr && error.insightErr.isTrue) {
            return setError(prevState => ({ ...prevState, insightErr: { message: "Select at least one Insight Type", isTrue: false } }));
        }
        if (!isType.length && error.typeErr && error.typeErr.isTrue) {
            return setError(prevState => ({ ...prevState, typeErr: { message: "Select at least one Data Type", isTrue: false } }));
        }
    }, [isInsight, isType, error]);


    const handleCheck = (event) => {
        const ids = event.target.id;
        const fieldSelected = event.target.name;
        const isChecked = event.target.checked;

        const index = ids === "insightData" ? isInsight.indexOf(fieldSelected) : isType.indexOf(fieldSelected);
        const data = ids === "insightData" ? isInsight : isType;

        if (data.includes(fieldSelected) && !isChecked) {
            if (index !== -1) {
                data.splice(index, 1);
                if (ids === "insightData") {
                    setError(prevState => ({ ...prevState, insightErr: { message: "", isTrue: true } }));
                    return setIsInsight(preState => [...data]);
                }
                setError(prevState => ({ ...prevState, typeErr: { message: "", isTrue: true } }));
                return setIsType(preState => [...data])
            }
            return false;
        };
        if (ids === "insightData") {
            setError(prevState => ({ ...prevState, insightErr: { message: "", isTrue: true } }));
            return setIsInsight(prevState => [...prevState, fieldSelected])
        };
        setError(prevState => ({ ...prevState, typeErr: { message: "", isTrue: true } }));
        return setIsType(prevState => [...prevState, fieldSelected])
        // const result = ids === "insightData" ? setIsInsight(prevState => [...prevState, fieldSelected]) : setIsType(prevState => [...prevState, fieldSelected]);;
        // return result;
    }

    const renderCheckBox = (label, filedName) => {
        return (
            <>
                {label.map((item, index) => (
                    <>
                        <FormControlLabel control={<Checkbox onChange={handleCheck} name={item} id={filedName} />} label={item} key={`${index}hut`} />
                    </>
                ))}
            </>
        )
    };

    const handlePush = () => {
        setAddQuestions(preState => [...preState, formValue.questionField]);
        setFormValue({ questionField: "" })
    };

    const handleDelete = (index) => {
        addQuestions.splice(index, 1);
        setAddQuestions(preState => [...preState]);
    };

    const handleValue = (event) => {
        setValue(event.target.value)
    };

    const renderQuestions = () => {
        return (
            <>
                {addQuestions.map((item, index) => (
                    <li><Chip label={item} key={index} variant="outlined" size="small" onDelete={() => handleDelete(index)} /></li>
                ))}
            </>
        )
    };

    const renderTextField = (placeHolder, name, onClick, num, disable, rest) => {
        let error = false
        if (errorMessage && errorMessage[name]) {
            error = true;
        }
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
                multiline
                rows={num}
                disabled={disable}
                {...rest}
            />
        );
    }

    return (
        <>
            {renderTypography(stages, "subtitle1", "textSecondary")}
            {renderTypography(aboutTool, "h5")}
            {renderTypography(toolName, "subtitle1", "textSecondary")}

            {renderTextField(searchTool, "title", handleChange)}

            <Grid container spacing={3}>
                <UploadLogo />

                <Grid item xs={12}>
                    {renderTypography(websiteUrl, "subtitle1", "textSecondary")}
                    {renderTextField(enterYourText, "url", handleChange)}
                </Grid>

                <Grid item xs={12}>
                    {renderTypography(description, "subtitle1", "textSecondary")}
                    {renderTextField(enterYourText, "description", handleChange, "4")}
                </Grid>

                <Grid item xs={11}>
                    {renderTypography(
                        questions,
                        "subtitle1",
                        "textSecondary"
                    )}
                    {renderTextField(enterYourText, "questionField", handleChange, "", addQuestions.length >= 2)}
                </Grid>
                <IconButton color="default" onClick={handlePush}>
                    <AddBoxIcon style={{ fontSize: 60, paddingTop: 20 }} />
                </IconButton>

                <ul>
                    {renderQuestions()}
                </ul>

                <Grid item xs={12}>
                    {renderTypography(
                        insight,
                        "subtitle1",
                        "textSecondary"
                    )}
                    <FormGroup row>
                        {renderCheckBox(insightArray, "insightData")}
                    </FormGroup>
                    {<span style={{ color: "red", fontSize: 15 }}>{error.insightErr && error.insightErr.message}</span>}
                </Grid>

                <Grid item xs={12}>
                    {renderTypography(
                        type,
                        "subtitle1",
                        "textSecondary"
                    )}
                    <FormGroup row>
                        {renderCheckBox(typeArray, "typeData")}
                    </FormGroup>
                    {<span style={{ color: "red", fontSize: 15 }}>{error.typeErr && error.typeErr.message}</span>}
                </Grid>

                <UploadScreenShot renderTypography={renderTypography} renderTextField={renderTextField} />

                <Grid item xs={12}>
                    {renderTypography(
                        limit,
                        "subtitle1",
                        "textSecondary"
                    )}
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={value}
                            onChange={handleValue}
                        >
                            <FormControlLabel
                                value="global"
                                control={<Radio />}
                                label="Global"
                            />
                            <FormControlLabel
                                value="selectRegion"
                                control={<Radio />}
                                label="Select Countries"
                            />
                        </RadioGroup>
                    </FormControl>

                    {value === "selectRegion" && <Autocomplete multiple={true} clear={false} />}

                </Grid>

                <Grid item xs={12}>
                    {renderTypography(emailContact, "subtitle1", "textSecondary")}
                    {renderTextField(enterYourText, "email", handleChange)}
                </Grid>

            </Grid>
            <br />
            <Divider />
        </>
    )
}
export default Tool;