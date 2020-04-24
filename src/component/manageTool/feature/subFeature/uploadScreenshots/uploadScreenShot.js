import React from "react";
import { Grid, Avatar, FormGroup, Button, IconButton, TextField } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";

import { toolCms, placeholder } from "../../../cms";

import { useStyles, CloseButton } from "../style";

const UploadScreenShot = (props) => {
    const classes = useStyles();
    const { renderTypography, showError, screenshotName, multiple, val, currentImg, updateState } = props;
    const { validation } = toolCms;

    const activeStyle = {
        border: ' 1px solid blue ',
        margin: 5
    }

    const handleChange = (event) => {
        const fileData = event.target.files;
        var reader = new FileReader();
        const { type = false, size = false } = fileData[0] || {}
        if (!type && !size) {
            return false;
        }
        if (size > 2097152) {
            return updateState({ tools: { ...props, showError: validation.size } });
        }
        if (!type.match(/image[/](?:jpg|jpeg|png|gif)/)) {
            return updateState({ tools: { ...props, showError: validation.fileType } });
        }
        reader.readAsDataURL(fileData[0]);
        const fileName = fileData[0].name;
        reader.onloadend = () => {
            const keyIndex = currentImg;
            multiple[keyIndex] = reader.result;
            screenshotName[keyIndex] = fileName;
            if (multiple.length === 6 && currentImg + 1 === 6) {
                return updateState({ tools: { ...props, currentImg: 0, multiple: multiple, showError: "", screenshotName: screenshotName, val: screenshotName[0] } });
            }
            return updateState({ tools: { ...props, currentImg: keyIndex + 1, multiple: multiple, showError: "", screenshotName: screenshotName } });
        }
        event.target.value = "";
    };

    const removeImage = (index) => {
        multiple[index] = null;
        screenshotName[index] = "";
        updateState({ tools: { ...props, multiple: multiple, currentImg: index, val: "", screenshotName: screenshotName } })
    };

    const ChangeImage = (value, index) => {
        updateState({ tools: { ...props, val: value, currentImg: index, showError: "" } })
    };

    return (
        <>

            <Grid item xs={12}>
                {renderTypography(
                    toolCms.uploadScreenShots,
                    "subtitle1",
                    "textSecondary"
                )}
                <FormGroup row>
                    {[0, 1, 2, 3, 4, 5].map((_, index) => (
                        <CloseButton key={index}>
                            <div className="container">
                                <IconButton aria-label="replace" onClick={() => ChangeImage(screenshotName[index], index)}>
                                    <Avatar src={multiple[index]} className={classes.large} variant="square" style={currentImg === index ? activeStyle : { margin: 5 }} />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => removeImage(index)} className="btn">
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </CloseButton>
                    ))}
                </FormGroup>
            </Grid>

            <Grid item xs={3} >
                <Button
                    variant="contained"
                    component="label"
                    style={{ borderRadius: 20, marginTop: 5 }}
                >
                    Choose Images
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChange}
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                    />
                </Button>
            </Grid>
            <Grid item xs={9}>
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder={placeholder.noFileChosen}
                    value={val}
                />
            </Grid>
            {<span style={{ color: "red", fontSize: 15 }}>{showError}</span>}
        </>
    )
};

UploadScreenShot.default = {
    multiple: [],
    val: "",
    currentImg: 0,
    screenshotName: [],
    updateState: () => { },
    showError: ""
}
UploadScreenShot.propTypes = {
    renderTypography: PropTypes.func.isRequired,
}
export default UploadScreenShot;