import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import FormDialog from "./form";
import { useQuery } from "@apollo/react-hooks";
import { GET_TASK, TASK_SUBSCRIPTION } from "./apollo/apollo";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const Task = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleUsers = () => {
        setOpen(true);
    }

    const { data, error, loading, subscribeToMore, refetch } = useQuery(GET_TASK);
    console.log("data", data)


    useEffect(() => {
        subscribeToMore({
            document: TASK_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return refetch();
            },
        });
    }, [subscribeToMore]);


    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Users</StyledTableCell>
                            <StyledTableCell align="right">Task Title</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading && data.tasks.map((row) => (
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">
                                    {row.user}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.title}</StyledTableCell>
                                <StyledTableCell align="right">{row.description}</StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleUsers}> Add Task </Button>
            <FormDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default Task;
