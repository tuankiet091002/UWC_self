import React from 'react'
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';
import ProgressBar from "@ramonak/react-progress-bar";

function TaskProcess() {
    return (
        <Card>
            <CardContent>
                <Typography color="text.secondary"> Tiến độ nhiệm vụ </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell><ProgressBar completed={60} bgColor="blue"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell><ProgressBar completed={60} bgColor="blue"/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell><ProgressBar completed={60} bgColor="blue"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default TaskProcess