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

const TaskRow = ({ task }) => {
    console.log(task.path[0].timestamp)
    const [open, setOpen] = React.useState(false);
    return (<>
        <StyledTableRow >
            <StyledTableCell sx={{ m: 0, width: '1px' }}>
                <IconButton onClick={() => setOpen(!open)} sx={{ height: '1rem' }}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </StyledTableCell>
            <StyledTableCell><Typography>{task._id}</Typography></StyledTableCell>
            <StyledTableCell><Typography>{task.taskmaster.name}</Typography></StyledTableCell>
            <StyledTableCell><Typography>{task.collector.name}</Typography></StyledTableCell>
            <StyledTableCell><Typography>{task.truck._id}</Typography></StyledTableCell>
            <StyledTableCell><Typography>{(new Date(task.date)).toLocaleDateString()}</Typography></StyledTableCell>
            <StyledTableCell><Typography>{task.shift}</Typography></StyledTableCell>
            <StyledTableCell>
                <Typography color={task.state === 'waiting' ? 'silver' : task.state === "executing" ? 'blue' : task.state === 'success' ? 'green' :
                    'red'}>
                    {task.state}
                </Typography>
            </StyledTableCell>
            <StyledTableCell><Typography>{task.checkIn ? task.checkIn : 'chưa'}</Typography></StyledTableCell>
            <StyledTableCell><Typography>{task.checkOut ? task.checkOut : 'chưa'}</Typography></StyledTableCell>
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
                                    <TableCell>MCP</TableCell>
                                    <TableCell align="center" sx={{ maxWidth: '1000px' }}>Nhân viên</TableCell>
                                    <TableCell align="center">Khối lượng</TableCell>
                                    <TableCell align="center">Hoàn thành lúc</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {task.path.map((state) => (
                                    <TableRow key={state.mcp._id}>
                                        <TableCell><Typography>{state.mcp._id}</Typography></TableCell>
                                        <TableCell align='center'><Typography>{state.janitor.map(x => x.name).join(', ')}</Typography></TableCell>
                                        <TableCell align="center"><Typography>{state.amount.$numberDecimal}</Typography></TableCell>
                                        <TableCell align='center' scope="row">
                                            <Typography>{state.timestamp ? (new Date(state.timestamp).toLocaleString()) : 'chưa'}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell >
        </TableRow >
    </>)
}

export default TaskRow