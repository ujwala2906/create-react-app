import React, { useState } from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";

import { country } from "../../../cms";
import { validation } from "../../../cms";

const Autocomplete = (props) => {

    const { isErrors, clear = false, updateState, autocompleteName, tools, subscription, autoVal = true, name, errorMessage, value: globalValue= "" } = props;
    const [state, setState] = useState();
    
    const handleChange = async (e, value) => {
        if (tools) {
            updateState({ tools: { ...props, autocompleteName: value } });
            if (value && !value.length) {
                setState(validation.region);
            }
            else {
                setState(false);
            }
        }
        if (subscription) {
            updateState({ subscription: { ...props, autocompleteName: value } });
            if (!clear && value && !value.length) {
                updateState({ subscription: { ...props, autocompleteName: value, errorMessage: { ...errorMessage, "country": validation.region } } })
                setState(validation.region);
            }
            else {
                updateState({ subscription: { ...props, autocompleteName: value, errorMessage: { ...errorMessage, "country": "" } } })
                setState(false);
            }
        }
    };

    const handleValue = (e, value) => {
        updateState({ subscription: { ...props, name: value.title, autocompleteName: [] } })
        setState(false);
    };

    const renderAutocomplete = (value, onClick, autocompleteName, clear, isErrors) => {
        let errorMessage;
        let error;
        if ((isErrors && !autocompleteName.length) || !autocompleteName) {
            errorMessage = validation.region;
            error = true;
        }
        return (
            <>
                <MaterialAutocomplete
                    id="outlined"
                    multiple={value}
                    options={country}
                    getOptionLabel={(option) => option.title}
                    defaultValue={autocompleteName}
                    onChange={onClick}
                    disableClearable={clear}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" margin="dense" placeholder="Select..." error={state || error} helperText={state || errorMessage} />
                    )}
                />
            </>

        );
    }

    return (
        <>
            {!autoVal && renderAutocomplete(false, handleValue, name, true)}
            {autoVal && renderAutocomplete(true, handleChange, autocompleteName, false, isErrors)}
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