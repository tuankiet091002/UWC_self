import React from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import MapIcon from '@mui/icons-material/Map';
import ProgressBar from "@ramonak/react-progress-bar";

function OverviewMCP() {
    return (
        <Card>
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
                            MCP
                        </Typography >
                        <Typography sx={{ fontSize: 16 }}>
                            2 MCP quá tải
                        </Typography>
                        <Typography sx={{ fontSize: 16 }}>
                            3 MCP sắp đầy
                        </Typography>
                        <Typography sx={{ fontSize: 16 }}>
                            5 MCP trống
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
                        <MapIcon sx={{ color: "blue", fontSize: 80 }} />
                    </Box>
                </Stack>
            </CardContent>
        </Card >
    )
}

export default OverviewMCP