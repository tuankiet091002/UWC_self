import React from 'react'
import { Grid, Container } from '@mui/material';

import OverviewTask from '../components/Dashboard/OverviewTask';
import OverviewTruck from '../components/Dashboard/OverviewTruck';
import OverviewEmployee from '../components/Dashboard/OverviewEmployee';
import OverviewMCP from '../components/Dashboard/OverviewMCP';
import TrashChart from '../components/Dashboard/TrashChart';
import TaskProcess from '../components/Dashboard/TaskProcess';

const Dashboard = () => {
    return (<Container sx={{ padding: 3 }}>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <OverviewTask />
            </Grid>
            <Grid item xs={3}>
                <OverviewEmployee />
            </Grid>
            <Grid item xs={3}>
                <OverviewTruck />
            </Grid>
            <Grid item xs={3}>
                <OverviewMCP />
            </Grid>
            <Grid item xs={3}>
                <TaskProcess />
            </Grid>
            <Grid item xs={9}>
                <TrashChart />
            </Grid>
        </Grid>
    </Container>
    )
}

export default Dashboard