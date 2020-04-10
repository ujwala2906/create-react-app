import React, { useState } from "react";
import { Grid, Avatar, FormGroup, Button, IconButton } from "@material-ui/core";

import { toolCms, placeholder } from "../../../cms";

import useStyle from "../style";

const UploadScreenShot = (props) => {
    const classes = useStyle();
    const { renderTypography, renderTextField } = props;
    const [showError, setShowError] = useState();
    const [name, setName] = useState("");
    const [multiple, setMultiple] = useState([]);

    const handleChange = (event) => {
        const fileData = event.target.files;
        var reader = new FileReader();
        const { type, size } = fileData[0]
        console.log(type, size);
        if (size > 2097152) {
            return setShowError("Maximum upload file size : 2MB");
        }
        if (!type.match(/image[/](?:jpg|jpeg|png|gif)/)) {
            return setShowError("Invalid File Type");
        }
        reader.readAsDataURL(fileData[0]);
        reader.onloadend = function (e) {
            if (multiple.length < 6) {
                setMultiple(prevState => [...prevState, reader.result]);
            }
        }
        const fileName = fileData[0].name;
        setName(fileName);
    };

    const removeImage = (index) => {
        multiple.splice(index, 1);
        setMultiple([...multiple]);
    }

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
                        <IconButton aria-label="delete" onClick={() => removeImage(index)}>
                            <Avatar src={multiple[index]} className={classes.large} variant="square" style={{ margin: 5 }} />
                        </IconButton>
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
                {renderTextField(placeholder.enterYourText, "screenshot")}
            </Grid>
            {<span style={{ color: "red", fontSize: 15 }}>{showError}</span>}
        </>
    )
};
export default UploadScreenShot;