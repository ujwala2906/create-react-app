import React, { useState } from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import validate from "../../yup";

import { country } from "../../../cms";

const Autocomplete = (props) => {

    const { multiple = true, clear = false, updateState, autocompleteName, tools , subscription} = props;

    const [state, setState] = useState();

    const handleChange = async (e, value) => {
        if (tools) {
            updateState({ tools: { ...props, autocompleteName: value } })
        }
        if (subscription) {
            updateState({ subscription: { ...props, autocompleteName: value } })
        }
        console.log(autocompleteName)
        if (!clear && value && !value.length) {
            const ValidateError = await validate("country", "");
            setState(ValidateError);
        } else {
            setState(false);
        }
    };

    return (
        <>
            <MaterialAutocomplete
                multiple={multiple}
                id="tags-outlined"
                options={country}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                disableClearable={clear}
                onChange={handleChange}
                defaultValue={autocompleteName}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="dense"
                        variant="outlined"
                        placeholder="Select..."
                        onChange={handleChange}
                        error={state}
                        helperText={state}
                    />
                )}
            />
        </>
    )
};

Autocomplete.default = {
    multiple: true,
    clear: false,
    autocompleteName: [],
    updateState: () => { },
};


export default Autocomplete;