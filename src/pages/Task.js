import React, { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import {
    Table, TableContainer, TableHead, TableRow, TablePagination,
    Typography, TableBody, TableFooter, Button, Stack
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import TaskPagination from '../components/Task/TaskPagination';
import TaskRow from '../components/Task/TaskRow';
import TaskForm from '../components/Task/TaskForm';
import { useTaskContext } from '../hooks/Tasks/useTaskContext';
import { useGetTasks } from '../hooks/Tasks/useGetTasks';
import { useAuthContext } from '../hooks/Auth/useAuthContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const Task = () => {
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { user } = useAuthContext();
    const { tasks } = useTaskContext();
    const { getTasks } = useGetTasks();

    useEffect(() => {
        getTasks();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer sx={{ mx: 0, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
                <Typography variant="h4" gutterBottom>Phân công</Typography>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{ width: '1px' }} align="center"></StyledTableCell>
                        <StyledTableCell align="center">ID</StyledTableCell>
                        <StyledTableCell align="center">Người giao</StyledTableCell>
                        <StyledTableCell align="center">Collector</StyledTableCell>
                        <StyledTableCell align="center">Phương tiện</StyledTableCell>
                        <StyledTableCell align="center">Ngày làm</StyledTableCell>
                        <StyledTableCell align="center">Ca</StyledTableCell>
                        <StyledTableCell align="center">Trạng thái</StyledTableCell>
                        <StyledTableCell align="center">Checkin</StyledTableCell>
                        <StyledTableCell align="center">Checkout</StyledTableCell>
                        <StyledTableCell align='center'><MoreVertIcon /></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : tasks
                    ).map((task) => (
                        <TaskRow key={task._id} task={task} />
                    ))}
                    {emptyRows > 0 && (
                        <TableRow>
                            <TableCell colSpan={5} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} sx={{ pb: 1 }}>
                            {user.role === 'backofficer' && <Button variant="contained" color="success" onClick={handleOpen}>
                                Thêm Nhiệm vụ
                            </Button>}
                            <TaskForm open={open} handleClose={handleClose} />
                        </TableCell>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={tasks.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TaskPagination}
                        />
                    </TableRow>
                </TableFooter>

            </Table>
        </TableContainer>
    )
}

export default Task