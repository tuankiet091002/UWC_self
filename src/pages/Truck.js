import React, { useEffect, useState } from 'react'

import { Grid, Container, Typography, Button } from '@mui/material'

import { useTruckContext } from '../hooks/Trucks/useTruckContext'
import { useGetTrucks } from '../hooks/Trucks/useGetTrucks'
import TruckSearch from '../components/Vehicle/TruckSearch'
import TruckCard from '../components/Vehicle/TruckCard'
import TruckForm from '../components/Vehicle/TruckForm'



const Truck = () => {
    const { trucks } = useTruckContext()
    const { getTrucks } = useGetTrucks()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        getTrucks()
    }, [])

    return (
        <Container maxWidth={false} sx={{ mx: 0, overflow: 'hidden' }}>
            <Grid container spacing={3} sx={{ my: 2, height: '100%' }}>
                <Grid item xl={3} lg={3} md={4} sm={12} xs={12} columnSpacing={2} >
                    <Typography textAlign="center" variant="h4">Phương tiện</Typography>
                    <TruckSearch />
                    <Button  onClick={() => setOpen(true)}>Thêm mới</Button>
                    <TruckForm open={open} onClose={() => setOpen(false)} />
                </Grid>
                <Grid item xl={9} lg={9}  md={8} sm={12} xs={12}  sx={{ maxHeight: '74vh', overflow: 'auto' }}>
                    <Grid container spacing={3}>
                        {trucks.map(truck => (
                            <Grid item xl={3} lg={4} sm={6} xs={12} key={truck._id}>
                                <TruckCard truck={truck} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>)
}

export default Truck