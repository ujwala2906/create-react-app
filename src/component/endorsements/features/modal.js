import React from "react";
import {
    Typography,
    IconButton,
    Dialog,
    DialogContent,
    TextField,
    DialogActions,
    Link,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import { useStyles, styles } from "../style";

import Footer from "./footer";

import { constant, suggestions } from "../../../lib/constant";

const Modal = (props) => {
    const { modalTitle, suggestions: suggestion } = constant;
    const classes = useStyles();
    const { open,
        handleClose,
        value,
        handleChange,
        message,
        error,
        handleAddEndorsement,
        addSuggestions,
        renderChips,
        endorsement,
        keyPress,
        perPage,
        initial,
        handlePrev,
        handleNext
    } = props;

    const renderSuggestions = () => {
        return (
            <>
                {suggestions.map((item, index) => (
                    <span>
                        <Link
                            style={{ cursor: "pointer" }}
                            key={index}
                            onClick={() => addSuggestions(item)}
                            color="inherit"
                        >
                            {`${item},`}
                            {' '}
                        </Link>
                    </span>
                ))}
            </>
        );
    };

    const DialogTitle = withStyles(styles)(props => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle disableTypography className={classes.root} {...other}>
                <Typography variant="h6">{children}</Typography>
                {onClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </MuiDialogTitle>
        );
    });

    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle onClose={handleClose}>
                    {modalTitle}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        className={classes.textField}
                        label="Enter text"
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                        helperText={message}
                        error={error}
                        onKeyDown={keyPress}
                    />
                    <IconButton
                        color="default"
                        onClick={handleAddEndorsement}
                        edge="end"
                        style={{ padding: 0 }}
                    >
                        <AddBoxIcon style={{ fontSize: 60, padding: 0 }} />
                    </IconButton>

                    {endorsement.length < 3 && (
                        <Typography variant="subtitle2" color="textSecondary">
                            <br />
                            <strong>{`${suggestion} : `}</strong>
                            {renderSuggestions()}
                        </Typography>
                    )}

                    <h3>Popular Endorsements</h3>
                    {renderChips(false)}
                </DialogContent>

                <DialogActions>
                    <Footer
                        data={endorsement}
                        initial={initial}
                        perPage={perPage}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                </DialogActions>
            </Dialog>
        </>
    )
}

Modal.defaultProps = {
    message: '',
    error: false,
    value: '',
    initial: 0
}

Modal.propTypes = {
    handlePrev: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    initial: PropTypes.number,
    message: PropTypes.string,
    error: PropTypes.bool,
    handleAddEndorsement: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    addSuggestions: PropTypes.func.isRequired,
    renderChips: PropTypes.func.isRequired,
    endorsement: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Modal;