import React, { useState } from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";

import validate from "../../yup";

import { country } from "../../../cms";

const Autocomplete = (props) => {

    const { clear = false, updateState, autocompleteName, tools, subscription, autoVal = true, name, errorMessage } = props;

    const [state, setState] = useState();

    const handleChange = async (e, value) => {
        if (tools) {
            updateState({ tools: { ...props, autocompleteName: value } });
            if (value && !value.length) {
                const ValidateError = await validate("country", "");
                setState(ValidateError);
            } else {
                setState(false);
            }
        }
        if (subscription) {
            updateState({ subscription: { ...props, autocompleteName: value } });
            if (!clear && value && !value.length) {
                const ValidateError = await validate("country", "");
                updateState({ subscription: { ...props, autocompleteName: value, errorMessage: { ...errorMessage, "country": ValidateError } } })
                setState(ValidateError);
            }
            else {
                updateState({ subscription: { ...props, autocompleteName: value, errorMessage: { ...errorMessage, "country": "" } } })
                setState(false);
            }
        }


    };

    const handleValue = (e, value) => {
        updateState({ subscription: { ...props, name: value, autocompleteName: [], } })
        setState(false);
    }

    const renderAutocomplete = (value, onClick, autocompleteName, clear) => (
        <MaterialAutocomplete
            id="outlined"
            multiple={value}
            options={country}
            getOptionLabel={(option) => option.title}
            defaultValue={autocompleteName}
            onChange={onClick}
            disableClearable={clear}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" margin="dense" placeholder="Select..." error={state} helperText={state} />
            )}
        />
    );
    return (
        <>
            {!autoVal && renderAutocomplete(false, handleValue, name, true)}
            {autoVal && renderAutocomplete(true, handleChange, autocompleteName, false)}
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