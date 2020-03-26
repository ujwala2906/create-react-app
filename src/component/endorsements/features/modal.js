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

const Modal = (props) => {
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
        endorsement
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
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
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
                    What would you endorse this tool for ?
                </DialogTitle>

                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        className={classes.textField}
                        label="Enter text"
                        variant="outlined"
                        value={value}
                        onChange={handleChange}
                        onBlur={() => handleValidate("firstName", value)}
                        helperText={message}
                        error={error}
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
                    <IconButton color="default" >
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="default" >
                        <NavigateNextIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

Modal.propTypes = {
    handleClose:PropTypes.func,
    value:PropTypes.string,
    handleChange:PropTypes.func,
    handleValidate:PropTypes.func,
    message:PropTypes.string,
    error:PropTypes.bool,
    handleAddEndorsement:PropTypes.func,
    suggestions:PropTypes.arrayOf(PropTypes.object),
    addSuggestions:PropTypes.func,
    renderChips:PropTypes.string,
    endorsement:PropTypes.arrayOf(PropTypes.object)
};
export default Modal;