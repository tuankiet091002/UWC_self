import React from "react";

import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";

import logo from "../../assets/logo.jpg";

function EmployeeCard({ emp }) {

    return (
        <Card sx={{ minWidth: 120 }}>
            <CardMedia
                component="img"
                sx={{ height: 160 }}
                src={emp.avatar ? emp.avatar : logo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                    {emp.name}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                        {emp.role === "backofficer" ? "Back Officer" : emp.role === "janitor" ? "Janitor" : "Collector"}
                    </Typography>
                    <Typography variant="body2" color={emp.available ? "success.main" : "error.main"}>
                        {emp.available ? "Rảnh" : "Bận"}
                    </Typography>    
                </Stack>
            </CardContent>
        </Card>
    )
}
export default EmployeeCard;