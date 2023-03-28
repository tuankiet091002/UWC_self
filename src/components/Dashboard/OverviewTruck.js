import React from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function OverviewTruck() {
    return (
        <Card>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    noWrap

                >
                    <Stack >
                        <Typography
                            color="text.secondary"
                        >
                            Phương tiện
                        </Typography>
                        <Typography variant="h3">
                            10
                        </Typography>
                        <Typography fontSize={9}>
                            Phương tiện sử dụng
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
                    <Typography fontSize={15}>7 trên đường</Typography>
                    <Typography fontSize={15}>2 đã về</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default OverviewTruck