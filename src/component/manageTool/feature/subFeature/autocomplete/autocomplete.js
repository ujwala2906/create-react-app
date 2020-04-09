import React, {useState} from "react";
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import validate from "../../yup";

import { country } from "../../../cms";

const Autocomplete = (prop) => {

    const { multiple, clear }= prop;
    const [state, setState] = useState();

    const handleChange = async (e, value) => {
        if(!clear && value && !value.length){
            const ValidateError = await validate("country", null);
            setState(ValidateError);
        }
        else{
            setState(false);
        }
    }

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