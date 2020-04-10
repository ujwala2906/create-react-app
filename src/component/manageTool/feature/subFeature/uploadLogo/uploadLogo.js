import React, { useState } from "react";
import { Grid, Button, IconButton, Avatar, TextField } from "@material-ui/core";

import { toolCms, placeholder } from "../../../cms";

import useStyles from "../style";

const UploadLogo = () => {

    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [showError, setShowError] = useState("");

    const handleChange = (event) => {
        const fileData = event.target.files;
        var reader = new FileReader();
        const { type, size } = fileData[0]
        if (size > 2097152) {
            return setShowError("Maximum upload file size : 2MB");
        }
        if (!type.match(/image[/](?:jpg|jpeg|png|gif)/)) {
            return setShowError("Invalid File Type");
        }
        reader.readAsDataURL(fileData[0]);
        reader.onloadend = function (e) {
            setImg(reader.result);
        }
        const fileName = fileData[0].name;
        setName(fileName);
    };

    const removeImage = () => {
        setImg(false);
        setName("");
    }

    const renderImage = () => {
        return (
            <>
                <IconButton aria-label="delete" onClick={removeImage}>
                    <Avatar src={img} className={classes.large} variant="square" />
                </IconButton>
            </>
        )
    };

    const classes = useStyles();

    return (
        <>
            <Grid item xs={2}>
                {renderImage()}
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
export default UploadLogo;