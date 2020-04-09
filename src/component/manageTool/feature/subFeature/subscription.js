import React, { useState } from "react";
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

import Autocomplete from "./autocomplete";

const Subscription = () => {
    const { stages, toolHead, markets, notes, accessType, selectCountries, accessTypeArray } = subscriptionCms;
   
    const [value, setValue] = useState("yes");
    const [countryValue, setCountryValue] = useState("yes");
    const [multiple, setMultiple] = useState(true);
    const [clear, setClear] = useState(false);
    const [formValues, setformValues]=useState({
        notes:"",
        seats:0,
        supeUser: "",
        email:"",
        whitelist:"",
        
    })

    const handleChange = (event) => {
        const val = event.target.value;
        setValue(val);
        if (val === "no") {
            setMultiple(false);
            setClear(true);
        }
        else {
            setMultiple(true);
            setClear(false);
        }
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

    const renderTextField = () => {
        return (
            <TextField
                fullWidth
                margin="dense"
                variant="outlined"
            />
        );
    };

    const renderRadio = () => {
        return (
            <>
                {accessTypeArray.map(item => (
                    <FormControlLabel
                        value={item}
                        control={<Radio />}
                        label={item}
                    />
                ))}
            </>
        )
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
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Autocomplete multiple={multiple} clear={clear} />
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
                        <RadioGroup
                        //   value={value}
                        //   onChange={handleChange}
                        >
                            {renderRadio()}
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
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No(Please Customize Access In The Grid Below)"
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