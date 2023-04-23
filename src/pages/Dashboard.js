import React from 'react'
import { Grid, Container } from '@mui/material';

import OverviewTask from '../components/Dashboard/OverviewTask';
import OverviewTruck from '../components/Dashboard/OverviewTruck';
import OverviewEmployee from '../components/Dashboard/OverviewEmployee.js';
import OverviewMCP from '../components/Dashboard/OverviewMCP';
import TrashChart from '../components/Dashboard/TrashChart';
import TaskProcess from '../components/Dashboard/TaskProcess';

const Dashboard = () => {
    return (

        <Container maxWidth={false} sx={{ py: 3 }} >
            <Grid container spacing={3} sx={{ width: '100%' }}  >
                <Grid item lg={3} md={4} sm={12} xs={12} sx={{ minHeight: "200px" }}>
                    <OverviewTask />
                </Grid>
                <Grid item lg={3} md={4} sm={12} xs={12} sx={{ minHeight: "200px" }}>
                    <OverviewEmployee />
                </Grid>
                <Grid item lg={3} md={4} sm={12} xs={12} sx={{ minHeight: "200px" }}>
                    <OverviewTruck />
                </Grid>
                <Grid item lg={3} md={4} sm={12} xs={12} sx={{ minHeight: "200px" }}>
                    <OverviewMCP />
                </Grid>
                <Grid item lg={4} md={8} sm={12} xs={12} sx={{ minHeight: "350px" }}>
                    <TaskProcess />
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12} sx={{ minHeight: "350px" }}>
                    <TrashChart />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard