import React, { useState } from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";

import validate from "../../yup";

import { country } from "../../../cms";

const Autocomplete = (props) => {

    const { clear = false, updateState, autocompleteName, tools, subscription, autoVal = true } = props;

    const [state, setState] = useState();

    const handleChange = async (e, value) => {
        if (tools) {
            updateState({ tools: { ...props, autocompleteName: value } })
        }
        if (subscription) {
            updateState({ subscription: { ...props, autocompleteName: value } })
        }
        if (!clear && value && !value.length) {
            const ValidateError = await validate("country", "");
            setState(ValidateError);
        } else {
            setState(false);
        }
    };

    const handleValue = (e, value) => {
        updateState({ subscription: { ...props, name: value, autocompleteName: [] } })
    }
    return (
        <>
            {!autoVal && <MaterialAutocomplete
                id="outlined"
                options={country}
                getOptionLabel={(option) => option.title}
                defaultValue={autocompleteName}
                onChange={handleValue}
                disableClearable={true}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" margin="dense" placeholder="Select..." />
                )}
            />}
            {autoVal && <MaterialAutocomplete
                multiple
                id="outlined-multi"
                filterSelectedOptions
                options={country}
                getOptionLabel={(option) => option.title}
                defaultValue={autocompleteName}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" margin="dense" placeholder="Select..." error={state}
                        helperText={state} />
                )}
            />}
        </>
    )
};


Autocomplete.default = {
    clear: false,
    autocompleteName: [],
    updateState: () => { },
    autoVal: true
};

Autocomplete.propTypes = {
    tools: PropTypes.bool,
    subscription: PropTypes.bool
};


export default Autocomplete;