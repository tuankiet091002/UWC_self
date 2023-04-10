import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import { TableRow, Box, Collapse, IconButton, Typography, Table, TableHead, TableBody, Button, ButtonGroup } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import TaskEditorForm from './TaskEditorForm';
import { useDeleteTask } from '../../hooks/Tasks/useDeleteTask'

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
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const { deleteTask, isLoading, error } = useDeleteTask()

    const handleOpen = () => setOpenForm(true);
    const handleClose = () => setOpenForm(false);

    return (<>
        <StyledTableRow >
            <StyledTableCell sx={{ m: 0, width: '1px' }} align="center">
                <IconButton onClick={() => setOpen(!open)} sx={{ height: '1rem' }}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </StyledTableCell>
            <StyledTableCell align="center"><Typography>{task._id}</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography>{task.taskmaster.name}</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography>{task.collector.name}</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography>{task.truck._id}</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography>{(new Date(task.date)).toLocaleDateString()}</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography>{task.shift}</Typography></StyledTableCell>
            <StyledTableCell align="center">
                <Typography color={task.state === 'waiting' ? 'silver' : task.state === "executing" ? 'blue' : task.state === 'success' ? 'green' :
                    'red'}>
                    {task.state}
                </Typography>
            </StyledTableCell>
            <StyledTableCell align="center"><Typography>{task.checkIn ? task.checkIn : 'chưa'}</Typography></StyledTableCell>
            <StyledTableCell align="center"><Typography>{task.checkOut ? task.checkOut : 'chưa'}</Typography></StyledTableCell>
            <StyledTableCell align="center">
                <ButtonGroup variant='contained'>
                    <Button onClick={() => handleOpen()} disabled={isLoading} variant="contained">
                        <BorderColorIcon />
                    </Button>
                    <Button onClick={() => deleteTask(task._id)} disabled={isLoading} color='error'>
                        <DeleteForeverIcon />
                    </Button>
                </ButtonGroup>
                <TaskEditorForm open={openForm} handleClose={() => handleClose()} currTask={task}></TaskEditorForm>
            </StyledTableCell>
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