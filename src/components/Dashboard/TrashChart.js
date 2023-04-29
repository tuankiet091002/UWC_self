import React from 'react'
import { Card, CardContent, TableContainer, Typography, Box, Stack } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);



const options = {
    plugins: {
        legend: {
            position: 'top',
            align: 'center'
        }
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
  
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
        
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const data = {
    labels,
    datasets: [
        {
            label: 'Janitor',
            data: labels.map(() => Math.floor(Math.random() * 10)),
            backgroundColor: '#0F88F9',
            stack: 'Stack 0',
            barThickness:  16,
        },
        {
            label: 'Collector',
            data: labels.map(() => Math.floor(Math.random() * 10)),
            backgroundColor: '#10D5F8',
            stack: 'Stack 1',
            barThickness:  16,
        },
    ],
};

function TrashChart() {


    return (
        <Card sx={{ height: "100%" }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="text.secondary"> Biểu đồ thu nhập </Typography>
                </Stack>
                <TableContainer>
                    <Box>
                        <Bar options={options} data={data} width={'750px'} height={'250px'}/>
                    </Box>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default TrashChart