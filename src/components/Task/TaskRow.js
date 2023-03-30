import React from 'react'

import { styled } from '@mui/material/styles';
import { TableRow, Box, Collapse, IconButton, Typography, Table, TableHead, TableBody } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(4n+1)': {
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
}));

const TaskRow = ({ row }) => {
    const [open, setOpen] = React.useState(false);
    return (<>
        <StyledTableRow key={row.id} >
            <StyledTableCell sx={{ m: 0, width: '1px' }}>
                <IconButton onClick={() => setOpen(!open)} sx={{ height: '1rem' }}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </StyledTableCell>
            <StyledTableCell>{row.id}</StyledTableCell>
            <StyledTableCell>{row.taskmaster}</StyledTableCell>
            <StyledTableCell>{row.collector}</StyledTableCell>
            <StyledTableCell>{row.truck}</StyledTableCell>
            <StyledTableCell>{row.path}</StyledTableCell>
            <StyledTableCell>{row.date}</StyledTableCell>
            <StyledTableCell>{row.shift}</StyledTableCell>
            <StyledTableCell>{row.state}</StyledTableCell>
            <StyledTableCell>{row.checkIn}</StyledTableCell>
            <StyledTableCell>{row.checkOut}</StyledTableCell>
        </StyledTableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Typography>
                            Tiến độ
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Thời gian</TableCell>
                                    <TableCell>MCP</TableCell>
                                    <TableCell align="center" sx={{ maxWidth: '1000px' }}>Nhân viên</TableCell>
                                    <TableCell align="right">Khối lượng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.process.map((state) => (
                                    <TableRow key={state.time}>
                                        <TableCell component="th" scope="row">
                                            {state.time}
                                        </TableCell>
                                        <TableCell>{state.mcp}</TableCell>
                                        <TableCell>{state.janitor}</TableCell>
                                        <TableCell align="right">{state.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>)
}

export default TaskRow