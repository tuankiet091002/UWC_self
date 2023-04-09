import React, { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import {
    Table, TableContainer, TableHead, TableRow, TablePagination,
    Typography, TableBody, TableFooter, Button, Stack
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TaskPagination from '../components/Task/TaskPagination';
import TaskRow from '../components/Task/TaskRow';
import TaskForm from '../components/Task/TaskForm';
import { useTaskContext } from '../hooks/Tasks/useTaskContext';
import { useGetTasks } from '../hooks/Tasks/useGetTasks';


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
        <TableContainer sx={{ py: 3, mx: 0, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2, pb: 1 }}>
                <Typography variant="h4" gutterBottom>Phân công</Typography>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{ width: '1px' }}></StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Người giao</StyledTableCell>
                        <StyledTableCell>Collector</StyledTableCell>
                        <StyledTableCell>Phương tiện</StyledTableCell>
                        <StyledTableCell>Ngày làm</StyledTableCell>
                        <StyledTableCell>Ca</StyledTableCell>
                        <StyledTableCell>Trạng thái</StyledTableCell>
                        <StyledTableCell>Checkin</StyledTableCell>
                        <StyledTableCell>Checkout</StyledTableCell>
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
                        <TableCell colSpan={99}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' >
                                <Button variant="contained" color="success" onClick={handleOpen}>
                                    Thêm Nhiệm vụ
                                </Button>
                                <TaskForm open={open} handleClose={handleClose} />
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={99}
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
                            </Stack>
                        </TableCell>
                    </TableRow>
                </TableFooter>

            </Table>
        </TableContainer>
    )
}

export default Task