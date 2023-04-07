import React, { useEffect } from 'react'

import { Grid, Container, Stack, Typography } from '@mui/material'

import { useTruckContext } from '../hooks/Trucks/useTruckContext'
import { useGetTrucks } from '../hooks/Trucks/useGetTrucks'
import TruckForm from '../components/Vehicle/TruckForm'
import TruckCard from '../components/Vehicle/TruckCard'



const Truck = () => {
    const { trucks } = useTruckContext()
    const { getTrucks, isLoading, error } = useGetTrucks()

    useEffect(() => {
        getTrucks()
    }, [])

    return (
        <Container maxWidth={false} sx={{ py: 3, mx: 0, maxHeight: '100%', width: '100%' }}>
            <Stack spacing={3} direction="row">
                <Stack spacing={3} alignItems="center" sx={{flexGrow: 0}}>
                    <Typography textAlign="center" variant="h4">Danh sách phương tiện</Typography>
                    <TruckForm />
                </Stack>
                <Grid container item spacing={2} sx={{width: "100%"}}>
                    {trucks.map(truck => (
                        <Grid item xs={12} sm={6} md={3} key={truck._id}>
                            <TruckCard truck={truck} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>)
}

export default Truck