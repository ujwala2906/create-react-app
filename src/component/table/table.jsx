import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import rows from "./file";

import { useStyles } from "./style";

import { EnhancedTableHead, EnhancedTableToolbar } from "./subFeatures";

const CustomTable = () => {
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

  const tableCell = row => {
    return Object.keys(row).map((key, index) => {
      return (
        <TableCell component="th" scope="row" key={index}>
          {row[key]}
        </TableCell>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <EnhancedTableToolbar />
      <Table className={classes.table}>
        <EnhancedTableHead rowCount={rows.length} />
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(row => (
            <TableRow key={row.tool}>
              {tableCell(row)}
              <TableCell align="right">
                <CheckCircleIcon
                  fontSize="small"
                  style={{ color: "green", paddingTop: 6 }}
                />
                Published
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ borderRadius: 20 }}
                >
                  <EditIcon fontSize="small" style={{ padding: 2 }} />
                  Edit Tool
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
export default CustomTable;
