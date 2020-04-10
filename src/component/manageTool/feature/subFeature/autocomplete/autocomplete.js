import React, {useState} from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import validate from "../../yup";

import { country } from "../../../cms";

const Autocomplete = (props) => {

    const { multiple=true, clear=false, handleChange=()=>{}, state="" }= props;

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


}
export default Autocomplete;