import React, { useEffect } from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import ProgressBar from "@ramonak/react-progress-bar";

import { useGetTasks } from '../../hooks/Tasks/useGetTasks';
import { useTaskContext } from '../../hooks/Tasks/useTaskContext'

function OverviewTask() {
    const { tasks } = useTaskContext();
    const { getTasks } = useGetTasks();

    useEffect(() => {
        getTasks();
    }, [])

    const dailyTask = tasks.filter(task => new Date().getDate() == new Date(task.date).getDate())
    const finishedTask = dailyTask.filter(task => task.status === "done" || task.state==="fail").length;
    const totalTask = dailyTask.length;
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                        >
                            Nhiệm vụ ngày
                        </Typography>
                        <Typography variant="h6">
                            {finishedTask}/{totalTask} task hoàn thành
                        </Typography>
                    </Stack>
                    <Box sx={{
                        alignItems: "center",
                        borderRadius: '5px',
                        display: "flex",
                        justifyContent: "center",
                        width: "90px",
                        height: "90px",
                    }}>
                        <PendingActionsIcon sx={{ color: "blue", fontSize: 80 }} />
                    </Box>

                </Stack>
                <Box sx={{ mt: 1 }}>
                    <ProgressBar completed={finishedTask/totalTask} bgColor="blue"/>
                </Box>
            </CardContent>
        </Card>
    );
};

export default OverviewTask