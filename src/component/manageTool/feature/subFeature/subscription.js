import React from "react";
import {
    TextField,
    Typography,
    Grid,
    FormControlLabel,
    FormControl,
    Radio,
    RadioGroup,
    Divider
} from "@material-ui/core";

import { subscriptionCms } from "../../cms";

const Subscription = () => {
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
    return (
        <>
            <Grid>
                {renderTypography("STEP 2 OF 2", "subtitle1", "textSecondary")}
                {renderTypography(" Tell us about the Subscription", "h5")}

                <Grid item xs={12}>
                    {renderTypography("Does this subscription cover access for multiple markets", "subtitle1", "textSecondary")}
                    <FormControl component="fieldset">
                        <RadioGroup
                        //   value={value}
                        //   onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Global"
                                control={<Radio />}
                                label="Global"
                            />
                            <FormControlLabel
                                value="Select Countries"
                                control={<Radio />}
                                label="Select Countries"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Enter your text"
                        variant="outlined"
                    />
                </Grid>

                <br />
                <Grid item xs={12}>
                    {renderTypography("Additional Notes/Comments", "subtitle1", "textSecondary")}
                    <TextField
                        fullWidth
                        placeholder="Enter your text"
                        variant="outlined"
                    />
                </Grid>
                <br />
                <Grid item xs={12}>
                    {renderTypography("Please select access type", "subtitle1", "textSecondary")}
                    <FormControl component="fieldset">
                        <RadioGroup
                        //   value={value}
                        //   onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Global"
                                control={<Radio />}
                                label="Limited Log-Ins Available"
                            />
                            <FormControlLabel
                                value="Select Countries"
                                control={<Radio />}
                                label="Contact Required For Setup"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <br />
                <Grid item xs={12}>
                    {renderTypography("Apply the same access across all selected countries ?", "subtitle1", "textSecondary")}
                    <FormControl component="fieldset">
                        <RadioGroup
                        //   value={value}
                        //   onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Global"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="Select Countries"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Divider />
        </>
    )
}
export default Subscription;