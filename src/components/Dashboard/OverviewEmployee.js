import React from 'react'

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import { PieChart } from 'react-minimal-pie-chart';


function OverviewEmployee() {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack >
                        <Typography color="text.secondary">
                            Nhân viên
                        </Typography>
                        <PersonIcon sx={{ color: "blue", fontSize: 80 }} />
                    </Stack>
                    <Box sx={{ width: '100px', height: "100px" }}>
                        <PieChart
                            data={[
                                { title: '1', value: 10, color: 'red' },
                                { title: '2', value: 15, color: 'blue' },
                                { title: '3', value: 20, color: 'yellow' },
                            ]}
                            label={x => x.dataEntry.title}
                        />
                    </Box>

                </Stack>
                <Typography>25/40 nhân viên làm việc </Typography>
            </CardContent>
        </Card>
    );
};

export default OverviewEmployee