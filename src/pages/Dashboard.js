import React from 'react'
import { Grid, Container } from '@mui/material';

import OverviewTask from '../components/Dashboard/OverviewTask';
import OverviewTruck from '../components/Dashboard/OverviewTruck';
import OverviewEmployee from '../components/Dashboard/OverviewEmployee.js';
import OverviewMCP from '../components/Dashboard/OverviewMCP';
import TrashChart from '../components/Dashboard/TrashChart';
import TaskProcess from '../components/Dashboard/TaskProcess';

const Dashboard = () => {
    return (<Container sx={{ py: 3, mx: 0}}>
        <Grid container spacing={3} sx={{width: "1300px"}} >
            <Grid item xs={3} sx={{height: "200px"}}>
                <OverviewTask />
            </Grid>
            <Grid item xs={3} sx={{height: "200px"}}>
                <OverviewEmployee />
            </Grid>
            <Grid item xs={3} sx={{height: "200px"}}>
                <OverviewTruck />
            </Grid>
            <Grid item xs={3} sx={{height: "200px"}}>
                <OverviewMCP />
            </Grid>
            <Grid item xs={4} sx={{height: "350px"}}>
                <TaskProcess/>
            </Grid>
            <Grid item xs={8} sx={{height: "350px"}}>
                <TrashChart />
            </Grid>
        </Grid>
    </Container>
    )
}

export default Dashboard