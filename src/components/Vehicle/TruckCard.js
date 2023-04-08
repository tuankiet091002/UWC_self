import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, ButtonGroup } from "@mui/material";

import { useDeleteTruck } from "../../hooks/Trucks/useDeleteTruck";
import TruckForm from "./TruckForm";

const someImg = [
    "https://ftl-media.imgix.net/truck/refuse/refuse-white-green-640x427.jpg",
    "https://www.wjtv.com/wp-content/uploads/sites/72/2020/11/trash.jpg?w=1920&h=1080&crop=1",
    "https://ftl-media.imgix.net/truck/refuse/refuse-white-green-640x427.jpg",
    "https://www.seattle.gov/images/Departments/SPU/Services/Truck_WM_Front_Load.jpg",
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/31WKuEaerxL.jpg",
    "https://5.imimg.com/data5/MQ/GN/OA/SELLER-52779073/garbage-trolley-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2022/3/TB/HM/WU/918674/garbage-dump-trolley-1-500x500.jpg",
    "https://img3.exportersindia.com/product_images/bc-full/2021/4/6816978/4-wheel-garbage-trolley-1618487080-5791696.jpeg",
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
                <Typography variant="body2" align="center" color={!truck.driver ? "success.main" : "error.main"}>
                    {truck.driver ? `Lái bởi ${truck.driver.name}` : "Có thể sử dụng"}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent:"end"}}>
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