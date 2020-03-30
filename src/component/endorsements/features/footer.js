import React, { useState } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { IconButton } from "@material-ui/core";

const Footer = (props) => {
    const { data, perPage, onPrev, onNext, initial } = props;
    const [hasPrev, setHasPrev] = useState(true);
    const [hasNext, setHasNext] = useState(false);
    let arrayEnd = data.length - perPage;
    let maxPage =
        (data.length && data.length && parseInt(data.length / perPage, 10)) || 0;
    maxPage =
        (maxPage && ((data.length % perPage && maxPage + 1) || maxPage)) || 0;

    let initialValue = initial;
    const handleNext = async () => {
        ++initialValue;
        const sliced = data.slice(
            perPage * initialValue,
            perPage * initialValue + perPage
        );

        if (initialValue >= maxPage) {
            setHasNext(true);
            setHasPrev(false);
        }
        if (sliced && !sliced.length) {
            initialValue = initialValue - 1;
            return onNext(false, initialValue);
        }
        return await onNext(sliced, initialValue);
    };

    const handlePrev = async () => {
        --initialValue;
        const sliced = data.slice(
            perPage * initialValue,
            perPage * initialValue + perPage
        );
        if (sliced && !sliced.length) {
            initialValue = initialValue + 1;
            return onPrev(false, initialValue);
        }
        if (!initialValue) {
            setHasNext(false);
            setHasPrev(true);
        }
        return await onPrev(sliced, initialValue);
    };

    return (
        <>
            <IconButton color="default" disabled={hasPrev} onClick={handlePrev}>
                <NavigateBeforeIcon  />
            </IconButton>
            <IconButton color="default" disabled={hasNext || !arrayEnd || perPage > data.length} onClick={handleNext}>
                <NavigateNextIcon  />
            </IconButton>
        </>
    )
}
export default Footer;