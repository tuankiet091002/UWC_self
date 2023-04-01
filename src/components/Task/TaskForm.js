import React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    FormControl, InputLabel, Select, MenuItem, Stack,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DateField } from '@mui/x-date-pickers/DateField';

import MCPPicker from './MCPPicker';
import JanitorPicker from './JanitorPicker';
import PairPicker from './PairPicker';

const TaskForm = ({ open, handleClose }) => {
    const [shift, setShift] = React.useState(0);
    const [collector, setCollector] = React.useState(null);
    const [truck, setTruck] = React.useState(null);

    const [mcps, setMCPs] = React.useState([0, 1, 2, 3]);
    const [mcpChecked, setMCPChecked] = React.useState([]);

    const [janitors, setJanitors] = React.useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [janitorChecked, setJanitorChecked] = React.useState([]);

    const [workers, setWorkers] = React.useState(new Array(mcps.length).fill([]));
    function unCheckMCP(mcp){
        if(mcp === -1){
            setJanitors([...janitors, ...workers.flat()])
        }else
            setJanitors([...janitors, ...workers[mcp]])
        setWorkers(workers.map((worker, index) => index === mcp ? [] : worker))
    }

    return (<LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose} maxWidth="xl" >
            <DialogTitle align="center" variant="h4">Task Form</DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={2}>
                    <Stack spacing={2}>
                        <DateField label="Ngày làm việc *" sx={{ mt: 1 }} />
                        <FormControl required sx={{ minWidth: 200 }}>
                            <InputLabel id="shift">Ca làm </InputLabel>
                            <Select
                                labelId="shift"
                                value={shift}
                                label="Ca làm"
                                onChange={(e) => { setShift(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>6-9h</MenuItem>
                                <MenuItem value={1}>9-12h</MenuItem>
                                <MenuItem value={2}>12-15h</MenuItem>
                                <MenuItem value={3}>15-18h</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ minWidth: 200 }}>
                            <InputLabel id="collector">Collector</InputLabel>
                            <Select
                                labelId="collector"
                                value={collector}
                                label="Collector"
                                onChange={(e) => { setCollector(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>Kiệt</MenuItem>
                                <MenuItem value={1}>Kiệt</MenuItem>
                                <MenuItem value={2}>Kiệt</MenuItem>
                                <MenuItem value={3}>Kiệt</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ minWidth: 200 }}>
                            <InputLabel id="truck">Phương tiện</InputLabel>
                            <Select
                                labelId="truck"
                                value={truck}
                                label="Phương tiện"
                                onChange={(e) => { setTruck(e.target.value) }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>1(50kg)</MenuItem>
                                <MenuItem value={1}>2(100kg)</MenuItem>
                                <MenuItem value={2}>3(70kg)</MenuItem>
                                <MenuItem value={3}>4(90kg)</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" alignItems='center' justifyContent='start' spacing={3}>
                        <MCPPicker
                            mcps={mcps}
                            mcpChecked={mcpChecked}
                            setMCPChecked={setMCPChecked}
                            unCheckMCP={unCheckMCP}
                        />
                        <ArrowForwardIcon />
                        <Stack alignItems='center' justifyContent='center' spacing={1}>
                            {
                                mcpChecked.map((mcp) => <PairPicker
                                    key={mcp}
                                    mcp={mcp}
                                    janitors={janitors}
                                    setJanitors={setJanitors}
                                    janitorChecked={janitorChecked}
                                    setJanitorChecked={setJanitorChecked}
                                    workers={workers}
                                    setWorkers={setWorkers}
                                />)}
                        </Stack>
                        <JanitorPicker
                            janitors={janitors}
                            janitorChecked={janitorChecked}
                            setJanitorChecked={setJanitorChecked}
                        />
                    </Stack>
                </Stack>
            </DialogContent >
            <DialogActions>
                <Button onClick={handleClose}>Xác nhận</Button>
                <Button onClick={handleClose} color="error">Hủy</Button>
            </DialogActions>
        </Dialog >
    </LocalizationProvider>)
}

export default TaskForm