import React from 'react'

import { Card, CardHeader, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const JanitorPicker = ({ janitors, janitorChecked, setJanitorChecked }) => {
    const handleToggle = (value) => () => {
        const currentIndex = janitorChecked.indexOf(value);
        const newChecked = [...janitorChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setJanitorChecked(newChecked);
    };

    const numberOfChecked = () => janitorChecked.length

    const handleToggleAll = () => () => {
        if (numberOfChecked() === janitors.length) {
            setJanitorChecked([]);
        } else {
            setJanitorChecked(janitors);
        }
    };


    return (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll()}
                        checked={numberOfChecked() === janitors.length && janitors.length !== 0}
                        indeterminate={
                            numberOfChecked() !== janitors.length && numberOfChecked() !== 0
                        }
                        disabled={janitors.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title="Janitor"
                subheader={`${numberOfChecked()}/${janitors.length} selected`}
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
                {janitors.map((janitor) => {
                    return (
                        <ListItem
                            key={janitor}
                            role="listitem"
                            onClick={handleToggle(janitor)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={janitorChecked.indexOf(janitor) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Janitor số ${janitor}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>

    )
};


export default JanitorPicker