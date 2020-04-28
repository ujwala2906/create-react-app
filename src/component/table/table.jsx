import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import { EnhancedTableHead, EnhancedTableToolbar } from "./subFeatures";

import { useStyles } from "./style";

import dataCollection from "./file";

const EnhancedTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead rowCount={dataCollection.length} />
            <TableBody>
              {dataCollection
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={dataCollection[index]}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {dataCollection[index].tools.formValue.tool}
                      </TableCell>
                      <TableCell align="right">
                        {dataCollection[index].tools.formValue.email}
                      </TableCell>
                      <TableCell align="right">
                        {dataCollection[index].subscription.formValue.notes}
                      </TableCell>
                      <TableCell align="right">Published</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          style={{ borderRadius: 20 }}
                        >
                          <EditIcon fontSize="small"  style={{ padding: 2 }}/>
                          Edit Tool
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
             
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataCollection.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default EnhancedTable;
