import React from 'react'

import { styled } from '@mui/material/styles';
import {
    Card, CardContent, Typography, Table, TableBody, TableRow,
    TableHead, TableContainer, Stepper, Step, StepLabel, TableCell
} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';

import { useTaskContext } from '../../hooks/Tasks/useTaskContext'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 4,
        borderRadius: 2,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 26,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        fontSize: 20,
    },
    '& .QontoStepIcon-circle': {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon"/>
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

function TaskProcess() {
    const { tasks } = useTaskContext();
    const dailyTask = tasks.filter(task => new Date().getDate() == new Date(task.date).getDate()).sort((a, b) => a.shift - b.shift)

    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Typography color="text.secondary"> Tiến độ nhiệm vụ </Typography>
                <TableContainer sx={{ borderRadius: "10px", overflow: "auto" }}>
                    <Table size="small" >
                        <TableHead >
                            <TableRow>
                                <TableCell align="center">Ca</TableCell>
                                <TableCell align="center" width='35%'>Collector</TableCell>
                                <TableCell align='center'>Tiến độ</TableCell>
                            </TableRow >
                        </TableHead>
                        <TableBody>
                            {dailyTask.map((task) =>
                                <TableRow key={task._id}>
                                    <TableCell align="center">{task.shift}</TableCell>
                                    <TableCell align="center" >{task.collector.name}</TableCell>
                                    <TableCell>
                                        <Stepper activeStep={2} connector={<QontoConnector />}>
                                            {task.path.map((pair) => {
                                                return <Step key={pair.mcp._id}>
                                                    <StepLabel 
                                                    StepIconComponent={QontoStepIcon}
                                                    sx={{
                                                        '& .MuiStepLabel-iconContainer': {
                                                            px: 0,
                                                          },
                                                    }}/>
                                                </Step>
                                            }
                                            )}
                                        </Stepper>
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card >
    )
}

export default TaskProcess