import React from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    FormControl, InputLabel, Select, MenuItem, Stack, Grid,
    Card, CardHeader, Divider, List, ListItem, ListItemIcon, ListItemText, Checkbox
} from '@mui/material'

import { DateField } from '@mui/x-date-pickers/DateField';


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}




const TaskForm = ({ open, handleClose }) => {
    const [shift, setShift] = React.useState(0);
    const [collector, setCollector] = React.useState(null);
    const [truck, setTruck] = React.useState(null);

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${value + 1}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );


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
                        {customList('MCP', left)}
                        <Stack alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Stack>
                        {customList('Pair', right)}
                        <Stack alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                        </Stack>
                        {customList('Janitor', right)}
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