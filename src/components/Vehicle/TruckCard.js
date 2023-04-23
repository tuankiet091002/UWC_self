import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, ButtonGroup, Stack } from "@mui/material";

import { useDeleteTruck } from "../../hooks/Trucks/useDeleteTruck";
import TruckForm from "./TruckForm";

const someImg = [
    "https://ftl-media.imgix.net/truck/refuse/refuse-white-green-640x427.jpg",
    "https://www.wjtv.com/wp-content/uploads/sites/72/2020/11/trash.jpg?w=1920&h=1080&crop=1",
    "https://ftl-media.imgix.net/truck/refuse/refuse-white-green-640x427.jpg",
    "https://www.seattle.gov/images/Departments/SPU/Services/Truck_WM_Front_Load.jpg",
]

function TruckCard({ truck }) {
    const [open, setOpen] = useState(false);

    const { deleteTruck } = useDeleteTruck();
    return (
        <Card>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={someImg[truck._id % someImg.length]}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center">
                    Xe số {truck._id}
                </Typography>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant="body2" align="center" color={!truck.driver ? "success.main" : "error.main"}>
                        {truck.driver ? `Lái bởi ${truck.driver.name}` : "Có thể sử dụng"}
                    </Typography>
                    <Typography variant="body2" align="center">
                        {truck.load.$numberDecimal}/{truck.cap}
                    </Typography>

                </Stack>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: "end" }}>
                <ButtonGroup variant="contained" size="small">
                    <Button onClick={() => setOpen(true)}>Sửa</Button>
                    <Button color="error" onClick={() => deleteTruck(truck._id)}>Xóa</Button>
                </ButtonGroup>
                <TruckForm currTruck={truck} open={open} onClose={() => setOpen(false)} />
            </CardActions>
        </Card>
    )
}
export default TruckCard;