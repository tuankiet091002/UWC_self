import React from 'react'

import { Card, CardHeader, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Button } from '@mui/material'


function indexOf(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i]._id === b._id) {
            return i;
        }
    }
    return -1;
}

function not(a, b) {
    return a.filter((value) => indexOf(b, value) === -1);
}

const PairPicker = ({ mcp, janitors, setJanitors, janitorChecked, setJanitorChecked, workers, setWorkers }) => {
    const [workerChecked, setWorkerChecked] = React.useState([]);

    function handleToggle(value) {
        const currentIndex = workerChecked.indexOf(value);
        const newChecked = [...workerChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
            setWorkerChecked(newChecked);
        } else {
            newChecked.splice(currentIndex, 1);
            setWorkerChecked(newChecked);
        }
    };

    const numberOfChecked = () => workerChecked.length

    function handleToggleAll() {
        if (numberOfChecked() === workers[mcp._id].length) {
            setWorkerChecked([]);
        } else {
            setWorkerChecked(workers[mcp._id]);
        }
    };

    const handleGetWorker = () => {
        setWorkers(workers.map((worker, index) => index === mcp._id ? worker.concat(janitorChecked) : worker));
        setJanitors(not(janitors, janitorChecked));
        setJanitorChecked([]);
    };

    const handleReturnWorker = () => {
        setWorkers(workers.map((worker, index) => index === mcp._id ? not(worker, workerChecked) : worker))
        setWorkerChecked([]);
        setJanitors(janitors.concat(workerChecked));
    };

    return (<Stack direction="row" alignItems="center" spacing={1}>
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={() => handleToggleAll()}
                        checked={numberOfChecked() === workers[mcp._id].length && workers[mcp._id].length !== 0}
                        indeterminate={
                            numberOfChecked() !== workers[mcp._id].length && numberOfChecked() !== 0
                        }
                        disabled={workers[mcp._id].length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={`MCP ${mcp._id}`}
                subheader={`${numberOfChecked()}/${workers[mcp._id].length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    maxHeight: 180,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {workers[mcp._id]?.map((worker) => {
                    return (
                        <ListItem
                            key={worker._id}
                            role="listitem"
                            onClick={() => handleToggle(worker)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={indexOf(workerChecked, worker) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`${worker.name}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>
        <Stack>
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={() => handleGetWorker()}
                disabled={janitorChecked.length === 0}
            >
                &lt;
            </Button>
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={() => handleReturnWorker()}
                disabled={workerChecked.length === 0}
            >
                &gt;
            </Button>
        </Stack>
    </Stack>)
};


export default PairPicker