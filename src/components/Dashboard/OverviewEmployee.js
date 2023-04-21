import React, { useEffect } from 'react'

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import { PieChart } from 'react-minimal-pie-chart';

import { useGetEmps } from '../../hooks/Emps/useGetEmps';
import { useEmpContext } from '../../hooks/Emps/useEmpContext';
import DoughnutChart from '../ui/charts/DoughNutChart'

function OverviewEmployee() {
    const { emps } = useEmpContext();
    const { getEmps } = useGetEmps();

    useEffect(() => {
        getEmps()
    }, [])

    const workerEmps = emps.filter(emp => emp.role !== 'backofficer').length;
    const workingJan = emps.filter(emp => emp.role === 'janitor' && !emp.available).length;
    const workingCol = emps.filter(emp => emp.role === 'collector' && !emp.available).length;

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
                                { title: 'Else', value: workerEmps, color: 'red' },
                                { title: 'Col', value: workingCol, color: 'blue' },
                                { title: 'Jan', value: workingJan, color: 'yellow' },
                            ]}
                            label={x => x.dataEntry.title}
                        />
                         
                    </Box>
                    {/* <DoughnutChart dataInput={[ workingCol, workingJan, workerEmps]} size={120} /> */}
                </Stack>
                <Typography>{workingJan + workingCol}/{workerEmps} nhân viên làm việc </Typography>
            </CardContent>
        </Card>
    );
};

export default OverviewEmployee