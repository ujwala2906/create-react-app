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
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import { useStyles, styles } from "../style";

import Footer from "./footer";

import constant from "../../../lib/constant";

const Modal = (props) => {
    const { modalTitle , field} = constant;
    const classes = useStyles();
    const { open,
        handleClose,
        value,
        handleChange,
        handleValidate,
        message,
        error,
        handleAddEndorsement,
        suggestions,
        addSuggestions,
        renderChips,
        endorsement,
        keyPress
    } = props;

    const renderSuggestions = () => {
        return (
            <>
                {suggestions.map((item, index) => (
                    <span>
                        <Link
                            key={index}
                            onClick={value => addSuggestions(item)}
                            color="inherit"
                        >
                            {`${item}, `}
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
                        onBlur={() => handleValidate(field, value)}
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
                            <strong>Suggestions:</strong>
                            {renderSuggestions()}
                        </Typography>
                    )}

                    <h3>Popular Endorsements</h3>
                    {renderChips()}
                </DialogContent>

                <DialogActions>
                    <Footer />
                    {/* <IconButton color="default" >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="default" >
                        <NavigateNextIcon />
                    </IconButton> */}
                </DialogActions>
            </Dialog>
        </>
    )
}

Modal.defaultProps = {
    message: '',
    error: false,
    value: '',
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    handleValidate: PropTypes.func.isRequired,
    message: PropTypes.string,
    error: PropTypes.bool,
    handleAddEndorsement: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    addSuggestions: PropTypes.func.isRequired,
    renderChips: PropTypes.func.isRequired,
    endorsement: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Modal;