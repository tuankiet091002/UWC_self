import React from 'react'

import { styled } from '@mui/material/styles';
import { TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const TaskRow = ({row}) => {
    return (
        <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
                {row.name}
            </StyledTableCell>
            <StyledTableCell align="right">{row.calories}</StyledTableCell>
            <StyledTableCell align="right">{row.fat}</StyledTableCell>
            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
            <StyledTableCell align="right">{row.protein}</StyledTableCell>
        </StyledTableRow>
    )
}

export default TaskRow