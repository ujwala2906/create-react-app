import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Tool Name' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Rep Contact' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Notes' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Action' },
];

const EnhancedTableHead = () => {
    return (
        <>
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                        >
                            <b>{headCell.label}</b>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </>
    )
}
export default EnhancedTableHead;