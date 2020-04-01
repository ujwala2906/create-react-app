import React, { useState, useEffect } from "react";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

const Footer = (props) => {
    const { data, perPage, onPrev, onNext, initial } = props;
    const [hasPrev, setHasPrev] = useState(true);
    const [hasNext, setHasNext] = useState(false);

    useEffect(() => {
        if (!initial) {
            setHasPrev(true);
            setHasNext(false);
        }
        if (!data.length || data.length < perPage + 1) {
            setHasPrev(true);
            setHasNext(true)
        }
    }, [initial, data, perPage]);

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
        setHasPrev(false)
        if (maxPage - 1 === initialValue) {
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
        setHasNext(false)
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
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton color="default" disabled={hasNext} onClick={handleNext}>
                <NavigateNextIcon />
            </IconButton>
        </>
    )
}

Footer.defaultProps = {
    initial: 0,
    perPage: 5,
}

Footer.propTypes = {
    initial: PropTypes.number,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    perPage: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Footer;