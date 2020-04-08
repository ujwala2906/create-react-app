import React from "react";
import { Grid, Box, FormGroup, Button } from "@material-ui/core";

import { toolCms, placeholder } from "../../../cms";

const UploadScreenShot = (props) => {
    const { renderTypography, renderTextField } = props;
    const defaultProps = {
        bgcolor: "background.paper",
        borderColor: "text.primary",
        m: 1,
        border: 1,
        style: { width: "6.4rem", height: "6.4rem" }
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
                    <Box borderColor="text.primary" {...defaultProps} />
                    <Box borderColor="text.primary" {...defaultProps} />
                    <Box borderColor="text.primary" {...defaultProps} />
                    <Box borderColor="text.primary" {...defaultProps} />
                    <Box borderColor="text.primary" {...defaultProps} />
                    <Box borderColor="text.primary" {...defaultProps} />
                </FormGroup>
            </Grid>

            <Grid item xs={2} >
                <Button
                    variant="contained"
                    component="label"
                    style={{ borderRadius: 20, marginTop: 5}}
                >
                    {toolCms.chooseLogo}
                    <input
                        type="file"
                        style={{ display: "none" }}
                        // onChange={handleChange}
                    />
                </Button>
            </Grid>
            <Grid item xs={10}>
                {renderTextField(placeholder.enterYourText)}
            </Grid>
        </>
    )
};
export default UploadScreenShot;