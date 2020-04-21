import React, { useState, useEffect } from "react";
import { Grid, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";

import { toolCms } from "../../../cms";

import { constant } from "../../../../../lib/constant";

const RenderCheckbox = (props) => {
    const { renderTypography, isInsight, isType, updateState, isChecked } = props;
    const { insight, insightArray, typeArray, type, insightType, dataType, } = toolCms;
    const { insightData, typeData } = constant;
    const [error, setError] = useState({ insightErr: { message: "", isTrue: false }, typeErr: { message: "", isTrue: false } })

    useEffect(() => {
        if (!isInsight.length && error.insightErr && error.insightErr.isTrue) {
            return setError(prevState => ({ ...prevState, insightErr: { message: insightType, isTrue: false } }));
        }
        if (!isType.length && error.typeErr && error.typeErr.isTrue) {
            return setError(prevState => ({ ...prevState, typeErr: { message: dataType, isTrue: false } }));
        }
    }, [isInsight, isType, error]);

    const handleCheck = (event) => {
        const ids = event.target.id;
        const fieldSelected = event.target.name;
        updateState({ tools: { ...props, isChecked: event.target.checked } });

        const index = ids === insightData ? isInsight.indexOf(fieldSelected) : isType.indexOf(fieldSelected);
        const data = ids === insightData ? isInsight : isType;

        if (data.includes(fieldSelected) && !isChecked) {
            if (index !== -1) {
                data.splice(index, 1);
                if (ids === insightData) {
                    setError(prevState => ({ ...prevState, insightErr: { message: "", isTrue: true } }));
                    return updateState({ tools: { ...props, isInsight: [...data] } });
                }
                setError(prevState => ({ ...prevState, typeErr: { message: "", isTrue: true } }));
                return updateState({ tools: { ...props, isType: [...data] } });
            }
            return false;
        };
        if (ids === insightData) {
            setError(prevState => ({ ...prevState, insightErr: { message: "", isTrue: true } }));
            return updateState({ tools: { ...props, isInsight: [...isInsight, fieldSelected] } })
        };
        setError(prevState => ({ ...prevState, typeErr: { message: "", isTrue: true } }));
        return updateState({ tools: { ...props, isType: [...isType, fieldSelected] } });
    };

    const renderCheckBox = (label, filedName) => {
        return (
            <>
                {label.map((item, index) => {
                    const isChecked = (filedName === insightData && isInsight.includes(item)) || isType.includes(item);
                    return <FormControlLabel key={index} control={<Checkbox onChange={handleCheck} name={item} id={filedName} checked={isChecked} />} label={item} />
                })}
            </>)
    };

    return (
        <>
            <Grid item xs={12}>
                {renderTypography(
                    insight,
                    "subtitle1",
                    "textSecondary"
                )}
                <FormGroup row>
                    {renderCheckBox(insightArray, insightData)}
                </FormGroup>
                {<span style={{ color: "red", fontSize: 15 }}>{error.insightErr && error.insightErr.message}</span>}
            </Grid>

            <Grid item xs={12}>
                {renderTypography(
                    type,
                    "subtitle1",
                    "textSecondary"
                )}
                <FormGroup row>
                    {renderCheckBox(typeArray, typeData)}
                </FormGroup>
                {<span style={{ color: "red", fontSize: 15 }}>{error.typeErr && error.typeErr.message}</span>}
            </Grid>
        </>
    )
}

RenderCheckbox.default = {
    isInsight: [],
    isType: [],
    updateState: () => { }
}
RenderCheckbox.propTypes = {
    renderTypography: PropTypes.func.isRequired,
    isChecked: PropTypes.bool,
}
export default RenderCheckbox; 