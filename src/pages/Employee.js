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
                <Grid item xl={3} lg={3} md={4} sm={12} xs={12} columnSpacing={2} >
                    <Typography textAlign="center" variant="h4">Nhân viên</Typography>
                    <EmployeeSearch />
                </Grid>
                <Grid item xl={9} lg={9}  md={8} sm={12} xs={12}    sx={{ maxHeight: '74vh', overflow: 'auto' }}>
                    <Grid container spacing={3}>
                    {emps.map(emp => (
                        <Grid item xl={3} lg={4} sm={6} xs={12} key={emp.id}>
                            <EmployeeCard emp={emp} />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>)
}

export default Employee