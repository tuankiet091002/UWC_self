import React, { useEffect } from 'react'

import { useEmpContext } from '../hooks/Emps/useEmpContext'
import { useGetEmps } from '../hooks/Emps/useGetEmps'

import { Grid, Container, Button, colors, Box, Typography } from '@mui/material'
import EmployeeSearch from '../components/Employee/EmployeeSearch.js'
import EmployeeCard from '../components/Employee/EmployeeCard.js'

const Employee = () => {
    const { emps } = useEmpContext()
    const { getEmps, isLoading, error } = useGetEmps()

    useEffect(() => {
        getEmps()
    }, [])


    return (
        <Container maxWidth={false} sx={{ mx:0, overflow: 'hidden'}}>
            <Grid container spacing={3} sx={{ my: 2, height: '100%' }}>
                <Grid item xs={3} columnSpacing={2} >
                    <Typography textAlign="center" variant="h4">Nhân viên</Typography>
                    <EmployeeSearch />
                </Grid>
                <Grid item xs={9}  sx={{ maxHeight: '74vh', overflow: 'auto' }}>
                    <Grid container spacing={3}>
                    {emps.map(emp => (
                        <Grid item xs={12} sm={6} md={3} key={emp.id}>
                            <EmployeeCard emp={emp} />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>)
}

export default Employee