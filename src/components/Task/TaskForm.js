import React, { useState, useEffect } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    FormControl, InputLabel, Select, MenuItem, Stack, Typography,
    Snackbar

} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMCPContext } from '../../hooks/MCPs/useMCPContext';
import { useGetMCPs } from '../../hooks/MCPs/useGetMCPs';
import { useEmpContext } from '../../hooks/Emps/useEmpContext';
import { useGetEmps } from '../../hooks/Emps/useGetEmps';
import { useTruckContext } from '../../hooks/Trucks/useTruckContext';
import { useGetTrucks } from '../../hooks/Trucks/useGetTrucks';
import { useCreateTask } from '../../hooks/Tasks/useCreateTask'

import MCPPicker from './MCPPicker';
import JanitorPicker from './JanitorPicker';
import PairPicker from './PairPicker';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TaskForm = ({ open, handleClose }) => {
    const { mcps } = useMCPContext()
    const { emps } = useEmpContext()
    const { trucks } = useTruckContext()
    const { getMCPs } = useGetMCPs()
    const { getEmps } = useGetEmps()
    const { getTrucks } = useGetTrucks()
    const { createTask, isLoading, error } = useCreateTask()
    const initialState = { date: null, shift: '', collector: '', truck: '' }
    const [form, setForm] = useState(initialState)

    const [mcpChecked, setMCPChecked] = useState([]);
    const collectors = emps.filter(emp => emp.role === 'collector');
    const [janitors, setJanitors] = useState([]);
    const [janitorChecked, setJanitorChecked] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [isOpenSnack, setIsOpenSnack] = useState(false)
    useEffect(() => {
        getMCPs();
        getEmps();
        getTrucks();
    }, [])

    useEffect(() => {
        setJanitors(emps.filter(emp => emp.role === 'janitor'))
    }, [emps])

    useEffect(() => {
        if (mcps.length > 0)
            setWorkers(new Array(Math.max(...mcps.map(mcp => mcp._id)) + 1).fill([]))
    }, [mcps])


    function unCheckMCP(value) {
        if (value === -1) {
            setJanitors([...janitors, ...workers.flat()])
        } else
            setJanitors([...janitors, ...workers[value]])
        setWorkers(workers.map((worker, index) => index === value ? [] : worker))
    }

    const handleSubmit = () => {
        let path = [];
        for (let i = 0; i < mcpChecked.length; i++) {
            path[i] = { mcp: mcpChecked[i]._id, janitor: workers[mcpChecked[i]._id].map(x => x._id) }
        }
        createTask({ ...form, path, date: form.date.$d })
        if (!error) {
            handleSnackbarOpen()
            handleClose()
        }

    }

    const handleSnackbarOpen = () => {
        setIsOpenSnack(true)
    }
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpenSnack(false);
    }

    return (<LocalizationProvider dateAdapter={AdapterDayjs}>


        <Snackbar open={isOpenSnack} autoHideDuration={1000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                Create Task Successfully!!
            </Alert>
        </Snackbar>
        {/* <Alert severity="success">This is a success message!</Alert> */}
        <Dialog open={open} onClose={handleClose} maxWidth="xl" >
            <DialogTitle align="center" variant="h4">Task Form</DialogTitle>
            <DialogContent>
                <Stack direction="row" spacing={2}>
                    <Stack spacing={2}>
                        <DatePicker label="Ngày làm việc *" sx={{ mt: 1 }}
                            format="DD/MM/YYYY"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e })} />
                        <FormControl required sx={{ minWidth: 200 }}>
                            <InputLabel id="shift">Ca làm </InputLabel>
                            <Select
                                labelId="shift"
                                value={form.shift}
                                label="Ca làm"
                                onChange={(e) => { setForm({ ...form, shift: e.target.value }) }}
                            >
                                <MenuItem value={1}>6-9h</MenuItem>
                                <MenuItem value={2}>9-12h</MenuItem>
                                <MenuItem value={3}>12-15h</MenuItem>
                                <MenuItem value={4}>15-18h</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ minWidth: 200 }}>
                            <InputLabel id="collector">Collector</InputLabel>
                            <Select
                                labelId="collector"
                                value={form.collector}
                                label="Collector"
                                onChange={(e) => { setForm({ ...form, collector: e.target.value }) }}
                            >
                                {collectors.map((collector) =>
                                    <MenuItem key={collector._id} value={collector._id}>{collector.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl required sx={{ minWidth: 200 }}>
                            <InputLabel id="truck">Phương tiện</InputLabel>
                            <Select
                                labelId="truck"
                                value={form.truck}
                                label="Phương tiện"
                                onChange={(e) => { setForm({ ...form, truck: e.target.value }) }}
                            >
                                {trucks.map((truck) =>
                                    <MenuItem key={truck._id} value={truck._id}>{truck._id} ({truck.cap})</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" alignItems='center' justifyContent='start' spacing={3}>
                        <MCPPicker
                            mcps={mcps}
                            mcpChecked={mcpChecked}
                            setMCPChecked={(e) => setMCPChecked(e)}
                            unCheckMCP={(e) => unCheckMCP(e)}
                        />
                        <ArrowForwardIcon />
                        <Stack alignItems='center' justifyContent='center' spacing={1}>
                            {
                                mcpChecked.map((mcp) => <PairPicker
                                    key={mcp._id}
                                    mcp={mcp}
                                    janitors={janitors}
                                    setJanitors={(e) => setJanitors(e)}
                                    janitorChecked={janitorChecked}
                                    setJanitorChecked={(e) => setJanitorChecked(e)}
                                    workers={workers}
                                    setWorkers={(e) => setWorkers(e)}
                                />)
                            }
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
                <Typography color="error">{error}</Typography>
                <Button onClick={() => handleSubmit()} disabled={isLoading}>Xác nhận</Button>
                <Button onClick={() => handleClose()} color="error">Hủy</Button>
            </DialogActions>
        </Dialog >
    </LocalizationProvider>)
}

export default TaskForm