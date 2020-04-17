import React from "react";
import { Grid, Button, IconButton, Avatar, TextField } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { toolCms, placeholder } from "../../../cms";

import { useStyles, CloseButton } from "../style";

const UploadLogo = (props) => {
    const { img, name, showError, updateState } = props;
    const { validation } = toolCms;

    const handleChange = event => {
        const fileData = event.target.files;
        var reader = new FileReader();
        const { type, size } = fileData[0];
        if (size > 2097152) {
            return updateState({ tools: { ...props, showError: validation.size } });
        }
        if (!type.match(/image[/](?:jpg|jpeg|png|gif)/)) {
            return updateState({ tools: { ...props, showError: validation.fileType } });
        }
        reader.readAsDataURL(fileData[0]);
        reader.onloadend = () => {
            const fileName = fileData[0].name;
            updateState({ tools: { ...props, img: reader.result, name: fileName, showError: "" } });
        };
    };

    const removeImage = () => {
        updateState({ tools: { ...props, img: false, name: "" } });
    };


    const classes = useStyles();

    return (
        <>
            <Grid item xs={2}>
                <CloseButton>
                    <div className="container">
                        <Avatar src={img} className={classes.large} variant="square" />
                        <IconButton aria-label="delete" onClick={removeImage} className="bt">
                            <CloseIcon />
                        </IconButton>
                    </div>
                </CloseButton>
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    component="label"
                    style={{ borderRadius: 20, marginTop: 35 }}
                >
                    {toolCms.chooseLogo}
                    <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        onChange={handleChange}
                    />
                </Button>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    placeholder={placeholder.noFileChosen}
                    value={name}
                    style={{ marginTop: 35 }}
                />
            </Grid>
            {<span style={{ color: "red", fontSize: 15 }}>{showError}</span>}
        </>
    )
}
UploadLogo.default = {
    img: "",
    name: "",
    showError: "",
    updateState: () => { }
}

export default UploadLogo;