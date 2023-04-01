import React from 'react'

import { Card, CardHeader, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Button } from '@mui/material'

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

const PairPicker = ({ mcp, janitors, setJanitors, janitorChecked, setJanitorChecked, workers, setWorkers }) => {
    const [workerChecked, setWorkerChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = workerChecked.indexOf(value);
        const newChecked = [...workerChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setWorkerChecked(newChecked);
    };

    const numberOfChecked = () => workerChecked.length

    const handleToggleAll = () => () => {
        if (numberOfChecked() === workers[mcp].length) {
            setWorkerChecked([]);
        } else {
            setWorkerChecked(workers[mcp]);
        }
    };

    const handleGetWorker = () => {
        setWorkers(workers.map((worker, index) => index === mcp ? worker.concat(janitorChecked) : worker));
        setJanitors(not(janitors, janitorChecked));
        setJanitorChecked([]);
    };

    const handleReturnWorker = () => {
        setWorkers(workers.map((worker, index) => index === mcp ? not(worker, workerChecked) : worker))
        setWorkerChecked([]);
        setJanitors(janitors.concat(workerChecked));
    };


    return (<Stack direction="row" alignItems="center" spacing={1}>
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll()}
                        checked={numberOfChecked() === workers[mcp].length && workers[mcp].length !== 0}
                        indeterminate={
                            numberOfChecked() !== workers[mcp].length && numberOfChecked() !== 0
                        }
                        disabled={workers[mcp].length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={`MCP ${mcp}`}
                subheader={`${numberOfChecked()}/${workers[mcp].length} selected`}
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
                {workers[mcp].map((worker) => {
                    return (
                        <ListItem
                            key={mcp}
                            role="listitem"
                            onClick={handleToggle(worker)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={workerChecked.indexOf(worker) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Janitor số ${worker}`} />
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
                onClick={handleGetWorker}
                disabled={janitorChecked.length === 0}
            >
                &lt;
            </Button>
            <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleReturnWorker}
                disabled={workerChecked.length === 0}
            >
                &gt;
            </Button>
        </Stack>
    </Stack>)
};


export default PairPicker