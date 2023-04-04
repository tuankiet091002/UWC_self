import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
    Table, TableContainer, TableHead, TableRow, TablePagination,
    Typography, TableBody, TableFooter, Button, Stack
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TaskPagination from '../components/Task/TaskPagination';
import TaskRow from '../components/Task/TaskRow';
import TaskForm from '../components/Task/TaskForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


function createData(id, taskmaster, collector, truck, path, date, shift, state, checkIn, checkOut) {
    return {
        id, taskmaster, collector, truck, path, date, shift, state, checkIn, checkOut, process: [
            {
                time: '31/03/2023',
                mcp: 1,
                janitor: "Anh Ba Tô Cơm",
                amount: 4.0,
            },

        ],
    };
}

const rows = [
    createData(1, "Kiệt", "Kiệt", 1, '1->2->3->4', "29/3/2023", 1, 'Done', '04/01/2023', '04/01/2023'),
    createData(1, "Kiệt", "Kiệt", 1, '1->2->3->4', "29/3/2023", 1, 'Done', '04/01/2023', '04/01/2023'),
    createData(1, "Kiệt", "Kiệt", 1, '1->2->3->4', "29/3/2023", 1, 'Done', '04/01/2023', '04/01/2023'),
    createData(1, "Kiệt", "Kiệt", 1, '1->2->3->4', "29/3/2023", 1, 'Done', '04/01/2023', '04/01/2023'),
    createData(1, "Kiệt", "Kiệt", 1, '1->2->3->4', "29/3/2023", 1, 'Done', '04/01/2023', '04/01/2023'),

];
const Task = () => {
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                <Typography variant="h4" gutterBottom>Danh sách phân công</Typography>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{ width: '1px' }}></StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Người giao</StyledTableCell>
                        <StyledTableCell>Collector</StyledTableCell>
                        <StyledTableCell>Phương tiện</StyledTableCell>
                        <StyledTableCell>Đoạn đường</StyledTableCell>
                        <StyledTableCell>Ngày làm</StyledTableCell>
                        <StyledTableCell>Ca</StyledTableCell>
                        <StyledTableCell>Trạng thái</StyledTableCell>
                        <StyledTableCell>Checkin</StyledTableCell>
                        <StyledTableCell>Checkout</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TaskRow key={row.id} row={row} />
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
                                    count={rows.length}
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