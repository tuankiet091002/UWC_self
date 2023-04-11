import React, {useEffect} from 'react'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import MapIcon from '@mui/icons-material/Map';

import { useGetMCPs } from '../../hooks/MCPs/useGetMCPs';
import { useMCPContext } from '../../hooks/MCPs/useMCPContext'

function OverviewMCP() {
    const { mcps } = useMCPContext();
    const { getMCPs } = useGetMCPs();

    useEffect(() => {
        getMCPs();
    }, [])

    const overloadedMCP = mcps.filter(mcp => mcp.load.$numberDecimal/mcp.cap > 0.8).length
    const fullMCP = mcps.filter(mcp => mcp.load.$numberDecimal/mcp.cap <= 0.8 && mcp.load.$numberDecimal/mcp.cap > 0.3 ).length
    const emptyMCP = mcps.filter(mcp => mcp.load.$numberDecimal/mcp.cap < 0.3).length

    return (
        <Card sx={{height:'100%'}}>
            <CardContent>
                <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack spacing={1}>
                        <Typography
                            color="text.secondary"
                        >
                            MCP
                        </Typography >
                        <Typography sx={{ fontSize: 16 }}>
                            {overloadedMCP} MCP quá tải
                        </Typography>
                        <Typography sx={{ fontSize: 16 }}>
                            {fullMCP} MCP sắp đầy
                        </Typography>
                        <Typography sx={{ fontSize: 16 }}>
                            {emptyMCP} MCP trống
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