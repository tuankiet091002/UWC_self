import React from 'react'
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableHead, TableContainer } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "blue",
        color: "white"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TaskProcess() {
    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography color="text.secondary"> Tiến độ nhiệm vụ </Typography>
                <TableContainer sx={{ borderRadius: "10px" }}>
                    <Table size="small" >
                        <TableHead >
                            <TableRow>
                                <StyledTableCell sx={{ width: '15%' }} >ID</StyledTableCell>
                                <StyledTableCell sx={{ width: '30%' }}>Collector</StyledTableCell>
                                <StyledTableCell >Tiến độ</StyledTableCell>
                            </TableRow >
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>1</StyledTableCell>
                                <StyledTableCell>Ông Liêm</StyledTableCell>
                                <StyledTableCell>
                                    <ProgressBar
                                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        percent={80}

                                    >
                                        {[0, 1, 2, 3, 4, 5].map(x =>
                                            <Step key={x} transition="scale">
                                                {() => (
                                                    x
                                                )}
                                            </Step>)}
                                    </ProgressBar>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>1</StyledTableCell>
                                <StyledTableCell>Ông Liêm</StyledTableCell>
                                <StyledTableCell>

                                    <ProgressBar
                                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        percent={80}

                                    >
                                        {[0, 1, 2, 3, 4, 5].map(x =>
                                            <Step key={x} transition="scale">
                                                {() => (
                                                    x
                                                )}
                                            </Step>)}
                                    </ProgressBar>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>1</StyledTableCell>
                                <StyledTableCell>Ông Liêm</StyledTableCell>
                                <StyledTableCell>

                                    <ProgressBar
                                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                        percent={80}

                                    >
                                        {[0, 1, 2, 3, 4, 5].map(x =>
                                            <Step key={x} transition="scale">
                                                {() => (
                                                    x
                                                )}
                                            </Step>)}
                                    </ProgressBar>
                                </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card >
    )
}

export default TaskProcess