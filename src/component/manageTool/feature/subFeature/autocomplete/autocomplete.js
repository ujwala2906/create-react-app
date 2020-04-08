import React from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import { country } from "../../../cms";

const Autocomplete = () => {

    return (
        <>
            <MaterialAutocomplete
                multiple
                id="tags-outlined"
                options={country}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="dense"
                        variant="outlined"
                        placeholder="Select..."
                    />
                )}
            />
        </>
    )


}
export default Autocomplete;