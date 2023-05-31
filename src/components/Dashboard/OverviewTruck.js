import React, { useEffect } from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { useGetTrucks } from '../../hooks/Trucks/useGetTrucks';
import { useTruckContext } from '../../hooks/Trucks/useTruckContext'
import { useTaskContext } from '../../hooks/Tasks/useTaskContext';

function OverviewTruck() {
    const { trucks } = useTruckContext();
    const { tasks } = useTaskContext()
    const { getTrucks } = useGetTrucks();

    useEffect(() => {
        getTrucks()
    }, [])

    const dailyTask = tasks.filter(task => new Date().getDate() == new Date(task.date).getDate())
    const usedTruck = (new Set(dailyTask.map(task => task.truck._id))).size

    const otwTruck = trucks.filter(truck => truck.driver != null).length;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack >
                        <Typography
                            color="text.secondary"
                        >
                            Phương tiện
                        </Typography>
                        <Typography variant="h3">
                            {usedTruck}/{trucks.length}
                        </Typography>
                        <Typography fontSize={9}>
                            Phương tiện được sử dụng trong ngày
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
                        <LocalShippingIcon sx={{ color: "blue", fontSize: 80 }} />
                    </Box>

                </Stack>
                <Stack direction="row" justifyContent="space-around">
                    <Typography fontSize={15}>{otwTruck} trên đường</Typography>
                    <Typography fontSize={15}>{usedTruck - otwTruck} đã về</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default OverviewTruck