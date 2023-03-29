import React from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import ProgressBar from "@ramonak/react-progress-bar";


function OverviewTask() {
    return (
        <Card sx={{height:'100%'}}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                    noWrap

                >
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                        >
                            Nhiệm vụ
                        </Typography>
                        <Typography variant="h5">
                            3/7 task
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
                <Box sx={{mt: 3}}>
                    <ProgressBar completed={60} bgColor="blue"/>
                </Box>
            </CardContent>
        </Card>
    );
};

export default OverviewTask