import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_TASK, ADD_TASK, TASK_SUBSCRIPTION } from "./apollo/apollo";

const FormDialog = (props) => {
    const { open, setOpen } = props;

    const [state, setState] = React.useState({
        status: 'Ready To Develop',
        user: '',
        title: '',
        description: '',
    });

    const handleClose = () => {
        setOpen(false);
    };

    const [addTask] = useMutation(ADD_TASK);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleSave = () => {
        addTask({
            variables: {
                input: {
                    ...state
                }
            }
        }).then(res => {
            setOpen(false);
        }).catch(err => {
            console.log(err)
            alert("something went wrong");
        })
    }

    const handleValue = (e) => {
        const fieldName = e.target.name;
        setState({
            ...state,
            [fieldName]: e.target.value,
        });
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                </DialogContentText>
                    <TextField
                        autoFocus
                        name="user"
                        margin="dense"
                        id="name"
                        label="User Name"
                        value={state.user}
                        onChange={handleValue}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="title"
                        label="Task Title"
                        value={state.title}
                        onChange={handleValue}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Description"
                        name="description"
                        value={state.description}
                        onChange={handleValue}
                        fullWidth
                    />
                    <InputLabel htmlFor="uncontrolled-native">Status</InputLabel>
                    <Select
                        native
                        value={state.status}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{
                            name: 'status',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value="Ready To Develop">Ready To Develop</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default FormDialog;